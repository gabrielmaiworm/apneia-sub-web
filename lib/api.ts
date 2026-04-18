import {
  badgesFallback,
  buddySafetyFallback,
  exclusionZonesFallback,
  feedFallback,
  gearAlertsFallback,
  gearFallback,
  leaderboardFallback,
  levelProgressFallback,
  marineConditionsFallback,
  nearbyPartnersFallback,
  nearbySpotsFallback,
  notificationsFallback,
  overviewFallback,
  performanceFallback,
  profileFallback,
  speciesFallback,
  spotsFallback,
} from '@/lib/fallback-data';
import type {
  BadgeView,
  BuddySafetyPlan,
  CreateDiveLogPayload,
  ExclusionZone,
  FeedItem,
  GearAlert,
  GearItemView,
  LeaderboardEntry,
  LevelProgress,
  MarineCondition,
  NotificationItem,
  OverviewResponse,
  PerformanceResponse,
  SpeciesEntry,
  SpotSummary,
  UserProfile,
} from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

async function fetchWithFallback<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export function getOverview() {
  return fetchWithFallback<OverviewResponse>('/', overviewFallback);
}

export function getFeed() {
  return fetchWithFallback<FeedItem[]>(
    '/dive-logs?mode=relevance&viewerId=user-1&followingOnly=true',
    feedFallback,
  );
}

export function getProfile() {
  return fetchWithFallback<UserProfile>('/users/user-1?viewerId=user-1', profileFallback);
}

export function getPerformance() {
  return fetchWithFallback<PerformanceResponse>(
    '/users/user-1/performance',
    performanceFallback,
  );
}

export function getSpots() {
  return fetchWithFallback<SpotSummary[]>('/spots', spotsFallback);
}

export function getNearbySpots() {
  return fetchWithFallback<Array<SpotSummary & { distanceKm: number }>>(
    '/spots/nearby?lat=-23.433&lng=-45.086&radiusKm=60',
    nearbySpotsFallback,
  );
}

export function getNearbyPartners() {
  return fetchWithFallback<Array<{ id: string; name: string; handle: string; avatarUrl: string | null; level: number; privacy: 'PUBLIC' | 'PRIVATE' | 'FRIENDS'; locationLabel: string; distanceKm: number }>>(
    '/spots/partners/nearby?lat=-23.433&lng=-45.086&radiusKm=60',
    nearbyPartnersFallback,
  );
}

export function getGear() {
  return fetchWithFallback<GearItemView[]>('/gear?userId=user-1', gearFallback);
}

export function getMaintenanceAlerts() {
  return fetchWithFallback<GearAlert[]>(
    '/gear/maintenance/upcoming?userId=user-1',
    gearAlertsFallback,
  );
}

export function getConditions() {
  return fetchWithFallback<MarineCondition[]>(
    '/environment/conditions',
    marineConditionsFallback,
  );
}

export function getSpecies() {
  return fetchWithFallback<SpeciesEntry[]>(
    '/environment/species',
    speciesFallback,
  );
}

export function getExclusionZones() {
  return fetchWithFallback<ExclusionZone[]>(
    '/environment/exclusion-zones',
    exclusionZonesFallback,
  );
}

export function getBadges() {
  return fetchWithFallback<BadgeView[]>(
    '/gamification/badges?userId=user-1',
    badgesFallback,
  );
}

export function getLeaderboards() {
  return fetchWithFallback<LeaderboardEntry[]>(
    '/gamification/leaderboards?metric=depth&scope=global&viewerId=user-1',
    leaderboardFallback,
  );
}

export function getNotifications() {
  return fetchWithFallback<NotificationItem[]>(
    '/social/notifications?userId=user-1',
    notificationsFallback,
  );
}

export function getBuddySafety() {
  return fetchWithFallback<BuddySafetyPlan[]>(
    '/social/buddy-safety?userId=user-1',
    buddySafetyFallback,
  );
}

export function getLevelProgress() {
  return fetchWithFallback<LevelProgress>(
    '/gamification/levels/user-1',
    levelProgressFallback,
  );
}

export async function createDiveLog(payload: CreateDiveLogPayload) {
  const response = await fetch(`${API_URL}/dive-logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Nao foi possivel publicar o log de mergulho.');
  }

  return response.json();
}
