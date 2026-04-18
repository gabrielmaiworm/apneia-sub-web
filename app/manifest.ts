import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Apneia & Pesca Sub',
    short_name: 'ApneiaSub',
    description: 'Plataforma PWA para apneia, pesca sub e dive logs offline.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08121F',
    theme_color: '#08121F',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
