// Constantes relacionadas con APIs y endpoints
export const API_ENDPOINTS = {
  // Información de la API
  INFO: '/',
  HEALTH: '/health',
  
  // Médicos
  DOCTORS: '/api/medicos',
  DOCTORS_SPECIALTIES: '/api/medicos/especialidades',
  DOCTORS_BY_SPECIALTY: (specialtyId: string | number) => `/api/medicos/especialidad/${encodeURIComponent(specialtyId)}`,
  DOCTORS_BY_ID: (id: string | number) => `/api/medicos/item/${encodeURIComponent(id)}`,
  DOCTORS_BY_NAME: (name: string) => `/api/medicos/nombre/${encodeURIComponent(name)}`,
  DOCTORS_STATS: '/api/medicos/estadisticas',
  
  // Agendas
  AGENDAS: '/api/agnd-agenda',
  AGENDAS_BY_ID: (id: number) => `/api/agnd-agenda/${id}`,
  AGENDAS_BY_DOCTOR: (doctorCode: string) => `/api/agnd-agenda?codigo_prestador=${encodeURIComponent(doctorCode)}`,
  AGENDAS_BY_DOCTOR_ALT: (doctorCode: string) => `/api/agnd-agenda?cd_prestador=${encodeURIComponent(doctorCode)}`,
  AGENDAS_STATS: '/api/agnd-agenda/estadisticas',
  
  // Catálogos
  CONSULTORIOS: '/api/catalogos/consultorios',
  DIAS: '/api/catalogos/dias',
  EDIFICIOS: '/api/catalogos/edificios',
  PISOS_BY_BUILDING: (buildingCode: string) => `/api/catalogos/edificios/${encodeURIComponent(buildingCode)}/pisos`,
  
  // Servicios externos
  EXTERNAL_DOCTORS: '/api/external/medicos',
  EXTERNAL_AUTH_STATUS: '/api/external/auth/status',
  EXTERNAL_CONFIG: '/api/external/config',
  
  // Especialidades (endpoint de autenticación)
  SPECIALTIES_AGENDA: '/especialidades/agenda'
} as const

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const

export const CACHE_KEYS = {
  DOCTORS: 'doctors',
  DOCTORS_BY_SPECIALTY: (specialtyId: string | number) => `doctors_specialty_${specialtyId}`,
  SPECIALTIES: 'specialties',
  SPECIALTIES_AGENDA: 'specialties_agenda_cache_v1',
  AGENDAS_BY_DOCTOR: (doctorId: string | number) => `agendas_doctor_${doctorId}`,
  BUILDINGS: 'buildings',
  CONSULTORIOS: 'consultorios',
  DIAS: 'dias'
} as const

export const DEFAULT_TIMEOUTS = {
  DEFAULT: 30000,      // 30 segundos
  SHORT: 10000,        // 10 segundos  
  LONG: 60000,         // 60 segundos
  VERY_LONG: 120000    // 2 minutos
} as const

export const DEFAULT_CACHE_TTL = {
  SHORT: 30000,        // 30 segundos
  MEDIUM: 60000,       // 1 minuto
  LONG: 300000,        // 5 minutos
  VERY_LONG: 900000    // 15 minutos
} as const
