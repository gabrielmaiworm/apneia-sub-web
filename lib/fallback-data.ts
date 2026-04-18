import type {
  BadgeView,
  BuddySafetyPlan,
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
  UserSummary,
} from '@/types/api';

const userGabriel: UserSummary = {
  id: 'user-1',
  name: 'Gabriel Costa',
  handle: 'gabriel.costa',
  avatarUrl: null,
  level: 14,
  privacy: 'PUBLIC',
};

const userMarina: UserSummary = {
  id: 'user-2',
  name: 'Marina Alves',
  handle: 'marina.azul',
  avatarUrl: null,
  level: 17,
  privacy: 'FRIENDS',
};

const userRafael: UserSummary = {
  id: 'user-3',
  name: 'Rafael Nunes',
  handle: 'rafa.nunes',
  avatarUrl: null,
  level: 12,
  privacy: 'PUBLIC',
};

export const overviewFallback: OverviewResponse = {
  name: 'Apneia & Pesca Sub Platform API',
  version: '0.1.0',
  status: 'offline-fallback',
  modules: [
    'auth',
    'users',
    'dive-logs',
    'spots',
    'gear',
    'environment',
    'gamification',
    'social',
  ],
  stats: {
    users: 3,
    diveLogs: 3,
    spots: 3,
    gearItems: 3,
    species: 3,
  },
};

const fallbackSpots: SpotSummary[] = [
  {
    id: 'spot-1',
    name: 'Laje do Sul',
    region: 'Ubatuba',
    bottomType: 'PEDRA',
    description: 'Laje com boa leitura de borda e janela curta de visibilidade.',
    difficulty: 'INTERMEDIARIO',
    depthMinMeters: 8,
    depthMaxMeters: 26,
    visibilityLabel: 'boa',
    protectedArea: false,
    hideCoordinatesByDefault: false,
    coordinates: { latitude: -23.514, longitude: -45.041 },
  },
  {
    id: 'spot-2',
    name: 'Parcel do Farol',
    region: 'Arraial do Cabo',
    bottomType: 'PEDRA',
    description: 'Ponto tecnico com agua azul e corrente lateral moderada.',
    difficulty: 'AVANCADO',
    depthMinMeters: 14,
    depthMaxMeters: 34,
    visibilityLabel: 'excelente',
    protectedArea: false,
    hideCoordinatesByDefault: true,
    coordinates: null,
  },
  {
    id: 'spot-3',
    name: 'Naufragio Meia Lua',
    region: 'Ilhabela',
    bottomType: 'NAUFRAGIO',
    description: 'Boa estrutura para foto sub e reconhecimento de ferragem.',
    difficulty: 'INTERMEDIARIO',
    depthMinMeters: 10,
    depthMaxMeters: 22,
    visibilityLabel: 'media',
    protectedArea: false,
    hideCoordinatesByDefault: false,
    coordinates: { latitude: -23.797, longitude: -45.347 },
  },
];

export const feedFallback: FeedItem[] = [
  {
    id: 'log-1',
    author: userGabriel,
    caption:
      'Treino curto na primeira hora da manha. Equalizacao redonda e descida limpa ate os 24 m.',
    conditionsNote: 'Corrente fraca e agua encaixada na borda da laje.',
    createdAt: '2026-04-17T11:40:00.000Z',
    speciesHighlights: ['olho-de-cao'],
    media: [{ id: 'media-1', kind: 'photo', title: 'Saida da laje', url: '' }],
    metrics: {
      maxDepthMeters: 24,
      breathHoldSeconds: 115,
      waterTemperatureC: 24,
      ballastKg: 4,
      visibilityMeters: 13,
    },
    totalArpaoUps: 2,
    totalShares: 1,
    totalComments: 2,
    viewerLiked: false,
    spot: fallbackSpots[0],
  },
  {
    id: 'log-2',
    author: userMarina,
    caption:
      'Janela curta de agua azul. Mantive o ponto discreto porque a passagem estava sensivel.',
    conditionsNote: 'Termoclina leve aos 18 m e vento sul segurando a embarcacao.',
    createdAt: '2026-04-16T15:05:00.000Z',
    speciesHighlights: ['olho-de-boi', 'xareu'],
    media: [{ id: 'media-2', kind: 'video', title: 'Descida no parcel', url: '' }],
    metrics: {
      maxDepthMeters: 31,
      breathHoldSeconds: 132,
      waterTemperatureC: 22,
      ballastKg: 3.5,
      visibilityMeters: 18,
    },
    totalArpaoUps: 2,
    totalShares: 2,
    totalComments: 1,
    viewerLiked: true,
    spot: fallbackSpots[1],
  },
];

export const profileFallback: UserProfile = {
  ...userGabriel,
  email: 'gabriel@apneiasub.dev',
  bio: 'Apneista de litoral norte, focado em seguranca e constancia de treino.',
  xp: 3420,
  locationLabel: 'Ubatuba, SP',
  followersCount: 1,
  followingCount: 2,
  isFriend: false,
  specialties: ['raso tecnico', 'agachao', 'treino em dupla'],
  personalBest: {
    depthMeters: 32,
    breathHoldSeconds: 196,
  },
  badges: [
    {
      code: 'MERGULHADOR_NOTURNO',
      title: 'Mergulhador Noturno',
      icon: 'moon',
    },
  ],
};

export const performanceFallback: PerformanceResponse = {
  user: profileFallback,
  summary: {
    totalLogs: 9,
    averageDepthMeters: 23.4,
    averageApneaSeconds: 118.3,
    bestDepthMeters: 32,
    bestBreathHoldSeconds: 196,
  },
  charts: {
    depthSeries: [
      { date: '2026-04-02T10:00:00.000Z', value: 18 },
      { date: '2026-04-08T10:00:00.000Z', value: 22 },
      { date: '2026-04-13T10:00:00.000Z', value: 29 },
      { date: '2026-04-17T11:40:00.000Z', value: 24 },
    ],
    apneaSeries: [
      { date: '2026-04-02T10:00:00.000Z', value: 88 },
      { date: '2026-04-08T10:00:00.000Z', value: 102 },
      { date: '2026-04-13T10:00:00.000Z', value: 121 },
      { date: '2026-04-17T11:40:00.000Z', value: 115 },
    ],
    heatmap: [
      { region: 'Ubatuba', logs: 5 },
      { region: 'Ilhabela', logs: 2 },
      { region: 'Arraial do Cabo', logs: 2 },
    ],
  },
};

export const gearFallback: GearItemView[] = [
  {
    id: 'gear-1',
    type: 'ARBALETE',
    name: 'Arbalete principal',
    brand: 'Pathos',
    model: 'Laser Open 90',
    acquiredAt: '2025-05-02T10:00:00.000Z',
    lastMaintenanceAt: '2025-11-01T10:00:00.000Z',
    nextMaintenanceAt: '2026-05-01T10:00:00.000Z',
    maintenanceCadenceMonths: 6,
    status: 'ATTENTION',
    notes: 'Troca programada de elastico e revisao do cabo.',
    averageRating: 5,
    totalReviews: 1,
    daysRemaining: 13,
    owner: userGabriel,
  },
  {
    id: 'gear-2',
    type: 'COMPUTADOR',
    name: 'Computador de mergulho',
    brand: 'Garmin',
    model: 'Descent G1',
    acquiredAt: '2025-08-15T10:00:00.000Z',
    lastMaintenanceAt: '2026-03-20T10:00:00.000Z',
    nextMaintenanceAt: '2026-10-20T10:00:00.000Z',
    maintenanceCadenceMonths: 7,
    status: 'OK',
    notes: 'Sensor sem alertas.',
    averageRating: null,
    totalReviews: 0,
    daysRemaining: 185,
    owner: userGabriel,
  },
];

export const gearAlertsFallback: GearAlert[] = [
  {
    gearId: 'gear-1',
    name: 'Arbalete principal',
    status: 'ATTENTION',
    nextMaintenanceAt: '2026-05-01T10:00:00.000Z',
    daysRemaining: 13,
  },
];

export const marineConditionsFallback: MarineCondition[] = [
  {
    id: 'conditions-1',
    region: 'Ubatuba',
    tideLabel: 'enchente',
    tideHeightMeters: 1.2,
    windKnots: 8,
    swellMeters: 0.7,
    waterTemperatureC: 24,
    moonPhase: 'minguante',
    updatedAt: '2026-04-18T07:00:00.000Z',
  },
  {
    id: 'conditions-2',
    region: 'Arraial do Cabo',
    tideLabel: 'vazante',
    tideHeightMeters: 0.8,
    windKnots: 11,
    swellMeters: 1,
    waterTemperatureC: 22,
    moonPhase: 'minguante',
    updatedAt: '2026-04-18T07:00:00.000Z',
  },
];

export const speciesFallback: SpeciesEntry[] = [
  {
    id: 'species-1',
    commonName: 'Robalo',
    scientificName: 'Centropomus parallelus',
    minimumSizeCm: 35,
    maxRecommendedWeightKg: 4,
    habitat: 'costao e encontro de agua',
    protected: false,
    notes: 'Evitar captura em periodo reprodutivo local.',
  },
  {
    id: 'species-2',
    commonName: 'Garoupa',
    scientificName: 'Epinephelus marginatus',
    minimumSizeCm: 47,
    maxRecommendedWeightKg: 8,
    habitat: 'toca e laje funda',
    protected: false,
    notes: 'Confirmar regulacao estadual antes da captura.',
  },
];

export const exclusionZonesFallback: ExclusionZone[] = [
  {
    id: 'zone-1',
    name: 'Parque Estadual da Ilha Anchieta',
    region: 'Ubatuba',
    description: 'Zona com restricao de captura e vigilancia frequente.',
    center: {
      latitude: -23.548,
      longitude: -45.049,
    },
    radiusKm: 3.4,
    severity: 'BLOCKED',
  },
  {
    id: 'zone-2',
    name: 'Entorno do Pontal do Atalaia',
    region: 'Arraial do Cabo',
    description: 'Monitorar regras locais e periodo de restricao operacional.',
    center: {
      latitude: -22.972,
      longitude: -42.014,
    },
    radiusKm: 1.1,
    severity: 'WARNING',
  },
];

export const badgesFallback: BadgeView[] = [
  {
    id: 'badge-1',
    code: 'MERGULHADOR_NOTURNO',
    title: 'Mergulhador Noturno',
    description: 'Realizou logs noturnos com protocolo de seguranca registrado.',
    icon: 'moon',
    earned: true,
    users: [userGabriel, userMarina],
  },
  {
    id: 'badge-2',
    code: 'DEEP_MASTER',
    title: 'Deep Master',
    description: 'Atingiu e registrou profundidade acima de 30 m.',
    icon: 'anchor',
    earned: false,
    users: [userMarina],
  },
];

export const leaderboardFallback: LeaderboardEntry[] = [
  {
    rank: 1,
    ...userMarina,
    metric: 31,
    secondaryLabel: 'Parcel do Farol',
  },
  {
    rank: 2,
    ...userGabriel,
    metric: 24,
    secondaryLabel: 'Laje do Sul',
  },
  {
    rank: 3,
    ...userRafael,
    metric: 18,
    secondaryLabel: 'Naufragio Meia Lua',
  },
];

export const notificationsFallback: NotificationItem[] = [
  {
    id: 'notification-1',
    userId: 'user-1',
    type: 'LIKE',
    title: 'Novo Arpao Up',
    message: 'Marina marcou seu ultimo log com Arpao Up.',
    read: false,
    createdAt: '2026-04-17T12:00:00.000Z',
  },
  {
    id: 'notification-2',
    userId: 'user-1',
    type: 'MAINTENANCE',
    title: 'Revisao proxima',
    message: 'Seu arbalete principal precisa de manutencao em 13 dias.',
    read: false,
    createdAt: '2026-04-18T07:05:00.000Z',
  },
];

export const buddySafetyFallback: BuddySafetyPlan[] = [
  {
    id: 'safety-1',
    userId: 'user-1',
    contactName: 'Camila Costa',
    contactPhone: '+55 11 99999-1010',
    expectedReturnAt: '2026-04-18T16:30:00.000Z',
    launchSpot: 'Laje do Sul',
    notes: 'Se atrasar mais de 40 min, ligar para a embarcacao.',
    status: 'ACTIVE',
    overdueMinutes: 0,
    owner: userGabriel,
  },
];

export const levelProgressFallback: LevelProgress = {
  user: userGabriel,
  level: 14,
  xp: 3420,
  nextLevelTarget: 4200,
  remainingXp: 780,
  progressPercentage: 81.4,
};

export const nearbySpotsFallback = [
  {
    ...fallbackSpots[0],
    distanceKm: 9.8,
  },
  {
    ...fallbackSpots[2],
    distanceKm: 43.6,
  },
];

export const nearbyPartnersFallback = [
  {
    ...userGabriel,
    locationLabel: 'Ubatuba, SP',
    distanceKm: 0,
  },
  {
    ...userRafael,
    locationLabel: 'Ilhabela, SP',
    distanceKm: 41.2,
  },
];

export const spotsFallback = fallbackSpots;
