// Exportación centralizada de toda la capa shared
export * from './types'
export * from './constants'
export * from './utils'
export * from './config'

// Exportaciones específicas para facilitar imports
export type {
  // Tipos de dominio principales
  Doctor,
  Agenda,
  AgendaDetallada,
  Especialidad,
  Edificio,
  ConsultorioNormalizado,
  
  // Tipos de API
  ApiResponse,
  RequestOptions,
  ApiError,
  
  // Tipos de autenticación
  AuthTokens,
  AuthResult,
  AuthError,
  
  // Tipos de UI
  DirectorioLayoutProps,
  VirtualKeyboardProps,
  LoadingState,
  SearchState
} from './types'

export {
  // Constantes principales
  API_ENDPOINTS,
  CACHE_KEYS,
  ERROR_MESSAGES,
  ROUTES,
  DAYS_OF_WEEK,
  APPOINTMENT_TYPES
} from './constants'

export {
  // Utilidades principales
  formatDayName,
  formatTime,
  extractHHmm,
  formatHHmmTo12h,
  formatDoctorName,
  normalizeApiData,
  extractDoctorId,
  isValidDoctor,
  debounce
} from './utils'

export {
  // Configuración
  config,
  environment
} from './config'
