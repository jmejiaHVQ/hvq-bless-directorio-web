// Constantes relacionadas con la interfaz de usuario
export const UI_TIMEOUTS = {
  IDLE_TIMEOUT: 30000,           // 30 segundos
  SEARCH_DEBOUNCE: 300,          // 300ms
  TOAST_DURATION: 3000,          // 3 segundos
  LOADING_MIN_DISPLAY: 500,      // 500ms mínimo para mostrar loading
  REDIRECT_DELAY: 2000           // 2 segundos antes de redirect
} as const

export const SEARCH_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  MAX_RESULTS: 50,
  DEBOUNCE_MS: 300,
  PLACEHOLDER_DOCTORS: 'Buscar médico...',
  PLACEHOLDER_SPECIALTIES: 'Buscar especialidad...',
  NO_RESULTS_MESSAGE: 'No se encontraron resultados',
  EMPTY_SEARCH_MESSAGE: 'Empieza a escribir para buscar'
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const

export const ROUTES = {
  HOME: '/',
  SPECIALTIES: '/specialties',
  SPECIALTY_DETAIL: (id: string | number) => `/specialties/${id}`,
  DOCTOR_DETAIL: (specialtyId: string | number, doctorId: string | number) => 
    `/specialties/${specialtyId}/${doctorId}`,
  DOCTORS_SEARCH: '/doctors/search',
  SELECTION: '/selection',
  AGENDAS: '/agendas'
} as const

export const STORAGE_KEYS = {
  LAST_SEARCH: 'last_search',
  USER_PREFERENCES: 'user_preferences',
  SELECTED_SPECIALTY: 'selected_specialty',
  SELECTED_DOCTOR: 'selected_doctor'
} as const

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifique su conexión a internet.',
  TIMEOUT_ERROR: 'La operación tardó demasiado. Intente nuevamente.',
  SERVER_ERROR: 'Error del servidor. Intente nuevamente más tarde.',
  NOT_FOUND: 'No se encontró la información solicitada.',
  UNAUTHORIZED: 'No está autorizado para realizar esta acción.',
  GENERIC_ERROR: 'Ocurrió un error inesperado. Intente nuevamente.',
  VALIDATION_ERROR: 'Por favor, verifique los datos ingresados.',
  LOAD_SPECIALTIES_ERROR: 'Error al cargar las especialidades. Intente nuevamente más tarde.',
  LOAD_DOCTORS_ERROR: 'Error al cargar los médicos. Intente nuevamente más tarde.',
  LOAD_AGENDAS_ERROR: 'Error al cargar las agendas. Intente nuevamente más tarde.'
} as const

export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Datos cargados correctamente',
  SEARCH_COMPLETED: 'Búsqueda completada',
  CACHE_UPDATED: 'Información actualizada'
} as const
