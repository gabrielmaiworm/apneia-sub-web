export interface ExifSummary {
  capturedAt?: string;
  latitude?: number;
  longitude?: number;
}

interface IfdEntry {
  type: number;
  count: number;
  valueOffset: number;
  entryOffset: number;
}

export async function extractExifSummary(file: File): Promise<ExifSummary | null> {
  if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
    return getFallbackSummary(file);
  }

  const buffer = await file.arrayBuffer();
  const view = new DataView(buffer);

  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) {
    return getFallbackSummary(file);
  }

  let offset = 2;

  while (offset + 4 < view.byteLength) {
    const marker = view.getUint16(offset);
    const segmentLength = view.getUint16(offset + 2);

    if (marker === 0xffe1 && readAscii(view, offset + 4, 4) === 'Exif') {
      return parseExifSegment(view, offset + 10) ?? getFallbackSummary(file);
    }

    offset += 2 + segmentLength;
  }

  return getFallbackSummary(file);
}

function parseExifSegment(view: DataView, tiffStart: number): ExifSummary | null {
  if (tiffStart + 8 >= view.byteLength) {
    return null;
  }

  const byteOrder = readAscii(view, tiffStart, 2);
  const littleEndian = byteOrder === 'II';

  const readUint16 = (position: number) => view.getUint16(position, littleEndian);
  const readUint32 = (position: number) => view.getUint32(position, littleEndian);

  const ifd0Offset = readUint32(tiffStart + 4);
  const ifd0Entries = readIfdEntries(view, tiffStart, tiffStart + ifd0Offset, littleEndian);

  const exifPointer = readOffsetValue(ifd0Entries.get(0x8769));
  const gpsPointer = readOffsetValue(ifd0Entries.get(0x8825));

  let capturedAt: string | undefined;
  let latitude: number | undefined;
  let longitude: number | undefined;

  if (exifPointer !== undefined) {
    const exifEntries = readIfdEntries(
      view,
      tiffStart,
      tiffStart + exifPointer,
      littleEndian,
    );
    const capturedEntry = exifEntries.get(0x9003) ?? exifEntries.get(0x0132);

    if (capturedEntry) {
      capturedAt = normalizeExifDate(
        readAsciiEntry(view, tiffStart, capturedEntry, littleEndian),
      );
    }
  }

  if (gpsPointer !== undefined) {
    const gpsEntries = readIfdEntries(
      view,
      tiffStart,
      tiffStart + gpsPointer,
      littleEndian,
    );
    const latRef = gpsEntries.get(0x0001);
    const latValue = gpsEntries.get(0x0002);
    const lngRef = gpsEntries.get(0x0003);
    const lngValue = gpsEntries.get(0x0004);

    if (latRef && latValue) {
      latitude = toSignedCoordinate(
        readAsciiEntry(view, tiffStart, latRef, littleEndian),
        readRationalEntry(view, tiffStart, latValue, littleEndian),
      );
    }

    if (lngRef && lngValue) {
      longitude = toSignedCoordinate(
        readAsciiEntry(view, tiffStart, lngRef, littleEndian),
        readRationalEntry(view, tiffStart, lngValue, littleEndian),
      );
    }
  }

  return capturedAt || latitude !== undefined || longitude !== undefined
    ? { capturedAt, latitude, longitude }
    : null;
}

function readIfdEntries(
  view: DataView,
  tiffStart: number,
  ifdOffset: number,
  littleEndian: boolean,
) {
  const entries = new Map<number, IfdEntry>();

  if (ifdOffset + 2 > view.byteLength) {
    return entries;
  }

  const totalEntries = view.getUint16(ifdOffset, littleEndian);

  for (let index = 0; index < totalEntries; index += 1) {
    const entryOffset = ifdOffset + 2 + index * 12;

    if (entryOffset + 12 > view.byteLength) {
      break;
    }

    const tag = view.getUint16(entryOffset, littleEndian);
    entries.set(tag, {
      type: view.getUint16(entryOffset + 2, littleEndian),
      count: view.getUint32(entryOffset + 4, littleEndian),
      valueOffset: view.getUint32(entryOffset + 8, littleEndian),
      entryOffset,
    });
  }

  return entries;
}

function readOffsetValue(entry?: IfdEntry) {
  if (!entry) {
    return undefined;
  }

  return entry.valueOffset;
}

function readAsciiEntry(
  view: DataView,
  tiffStart: number,
  entry: IfdEntry,
  littleEndian: boolean,
) {
  const isInline = entry.count <= 4;
  const start = isInline ? entry.entryOffset + 8 : tiffStart + entry.valueOffset;
  const length = Math.max(0, entry.count - 1);

  if (start + length > view.byteLength) {
    return '';
  }

  if (entry.type === 2) {
    return readAscii(view, start, length);
  }

  if (entry.type === 7 && entry.count > 0) {
    const bytes = [];

    for (let index = 0; index < entry.count; index += 1) {
      bytes.push(String.fromCharCode(view.getUint8(start + index)));
    }

    return bytes.join('');
  }

  const value = littleEndian
    ? view.getUint32(entry.entryOffset + 8, true)
    : view.getUint32(entry.entryOffset + 8, false);

  return String.fromCharCode(value & 0xff);
}

function readRationalEntry(
  view: DataView,
  tiffStart: number,
  entry: IfdEntry,
  littleEndian: boolean,
) {
  const start = tiffStart + entry.valueOffset;
  const values: number[] = [];

  for (let index = 0; index < entry.count; index += 1) {
    const numerator = view.getUint32(start + index * 8, littleEndian);
    const denominator = view.getUint32(start + index * 8 + 4, littleEndian);
    values.push(denominator === 0 ? 0 : numerator / denominator);
  }

  return values;
}

function toSignedCoordinate(reference: string, parts: number[]) {
  const [degrees = 0, minutes = 0, seconds = 0] = parts;
  const absolute = degrees + minutes / 60 + seconds / 3600;
  return reference === 'S' || reference === 'W' ? -absolute : absolute;
}

function normalizeExifDate(value: string) {
  if (!value) {
    return undefined;
  }

  const normalized = value.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3');
  return normalized;
}

function readAscii(view: DataView, start: number, length: number) {
  let result = '';

  for (let index = 0; index < length; index += 1) {
    result += String.fromCharCode(view.getUint8(start + index));
  }

  return result.replace(/\0/g, '');
}

function getFallbackSummary(file: File): ExifSummary | null {
  if (!file.lastModified) {
    return null;
  }

  return {
    capturedAt: new Date(file.lastModified).toISOString(),
  };
}
