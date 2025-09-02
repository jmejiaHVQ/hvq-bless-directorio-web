// Exportación centralizada de todas las constantes
export * from './api.constants'
export * from './ui.constants'
export * from './business.constants'

// Re-exportaciones específicas para fácil acceso
export {
  API_ENDPOINTS,
  HTTP_METHODS,
  HTTP_STATUS,
  CACHE_KEYS,
  DEFAULT_TIMEOUTS,
  DEFAULT_CACHE_TTL
} from './api.constants'

export {
  UI_TIMEOUTS,
  SEARCH_CONFIG,
  ROUTES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES
} from './ui.constants'

export {
  DAYS_OF_WEEK,
  APPOINTMENT_TYPES,
  TIME_FORMATS,
  DEFAULT_VALUES,
  FIELD_MAPPINGS
} from './business.constants'
