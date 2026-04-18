export type PrivacyLevel = 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
export type BottomType = 'PEDRA' | 'AREIA' | 'NAUFRAGIO';
export type GearType = 'ARBALETE' | 'NADADEIRA' | 'COMPUTADOR' | 'ROUPA';
export type GearStatus = 'OK' | 'ATTENTION' | 'OVERDUE';
export type SafetyStatus = 'ACTIVE' | 'SAFE' | 'OVERDUE';

export interface UserSummary {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string | null;
  level: number;
  privacy: PrivacyLevel;
}

export interface OverviewResponse {
  name: string;
  version: string;
  status: string;
  modules: string[];
  stats: {
    users: number;
    diveLogs: number;
    spots: number;
    gearItems: number;
    species: number;
  };
}

export interface SpotSummary {
  id: string;
  name: string;
  region: string;
  bottomType: BottomType;
  description: string;
  difficulty: 'INICIANTE' | 'INTERMEDIARIO' | 'AVANCADO';
  depthMinMeters: number;
  depthMaxMeters: number;
  visibilityLabel: string;
  protectedArea: boolean;
  hideCoordinatesByDefault: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
}

export interface FeedItem {
  id: string;
  author: UserSummary;
  caption: string;
  conditionsNote: string;
  createdAt: string;
  speciesHighlights: string[];
  media: {
    id: string;
    kind: 'photo' | 'video';
    title: string;
    url: string;
  }[];
  metrics: {
    maxDepthMeters: number;
    breathHoldSeconds: number;
    waterTemperatureC: number;
    ballastKg: number;
    visibilityMeters: number;
  };
  totalArpaoUps: number;
  totalShares: number;
  totalComments: number;
  viewerLiked: boolean;
  spot: SpotSummary | null;
}

export interface UserProfile extends UserSummary {
  email: string;
  bio: string;
  xp: number;
  locationLabel: string;
  followersCount: number;
  followingCount: number;
  isFriend: boolean;
  specialties: string[];
  personalBest: {
    depthMeters: number;
    breathHoldSeconds: number;
  };
  badges: {
    code: string;
    title: string;
    icon: string;
  }[];
}

export interface PerformanceResponse {
  user: UserProfile;
  summary: {
    totalLogs: number;
    averageDepthMeters: number;
    averageApneaSeconds: number;
    bestDepthMeters: number;
    bestBreathHoldSeconds: number;
  };
  charts: {
    depthSeries: Array<{ date: string; value: number }>;
    apneaSeries: Array<{ date: string; value: number }>;
    heatmap: Array<{ region: string; logs: number }>;
  };
}

export interface GearItemView {
  id: string;
  type: GearType;
  name: string;
  brand: string;
  model: string;
  acquiredAt: string;
  lastMaintenanceAt: string;
  nextMaintenanceAt: string;
  maintenanceCadenceMonths: number;
  status: GearStatus;
  notes: string;
  averageRating: number | null;
  totalReviews: number;
  daysRemaining: number;
  owner: UserSummary;
}

export interface GearAlert {
  gearId: string;
  name: string;
  status: GearStatus;
  nextMaintenanceAt: string;
  daysRemaining: number;
}

export interface MarineCondition {
  id: string;
  region: string;
  tideLabel: string;
  tideHeightMeters: number;
  windKnots: number;
  swellMeters: number;
  waterTemperatureC: number;
  moonPhase: string;
  updatedAt: string;
}

export interface SpeciesEntry {
  id: string;
  commonName: string;
  scientificName: string;
  minimumSizeCm: number;
  maxRecommendedWeightKg: number;
  habitat: string;
  protected: boolean;
  notes: string;
}

export interface ExclusionZone {
  id: string;
  name: string;
  region: string;
  description: string;
  center: {
    latitude: number;
    longitude: number;
  };
  radiusKm: number;
  severity: 'WARNING' | 'BLOCKED';
}

export interface BadgeView {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  earned?: boolean;
  users: UserSummary[];
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  handle: string;
  avatarUrl: string | null;
  level: number;
  privacy: PrivacyLevel;
  metric: number;
  secondaryLabel: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'LIKE' | 'COMMENT' | 'FOLLOW' | 'MAINTENANCE' | 'SAFETY';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface BuddySafetyPlan {
  id: string;
  userId: string;
  contactName: string;
  contactPhone: string;
  expectedReturnAt: string;
  launchSpot: string;
  notes: string;
  status: SafetyStatus;
  overdueMinutes: number;
  owner: UserSummary;
}

export interface LevelProgress {
  user: UserSummary;
  level: number;
  xp: number;
  nextLevelTarget: number;
  remainingXp: number;
  progressPercentage: number;
}

export interface CreateDiveLogPayload {
  authorId: string;
  spotId?: string | null;
  caption: string;
  conditionsNote: string;
  media?: Array<{
    id: string;
    kind: 'photo' | 'video';
    title: string;
    url: string;
  }>;
  metrics: {
    maxDepthMeters: number;
    breathHoldSeconds: number;
    waterTemperatureC: number;
    ballastKg: number;
    visibilityMeters: number;
  };
  speciesHighlights?: string[];
  hideCoordinates?: boolean;
}
