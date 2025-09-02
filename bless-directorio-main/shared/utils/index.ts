// Exportación centralizada de todas las utilidades
export * from './formatters'
export * from './validators'
export * from './helpers'

// Re-exportaciones específicas para fácil acceso
export {
  formatDayName,
  formatTime,
  extractHHmm,
  formatHHmmTo12h,
  formatAppointmentType,
  formatFloor,
  formatDoctorName,
  formatSpecialtyName,
  formatBuildingName,
  formatConsultorioName,
  truncateText,
  normalizeSearchText
} from './formatters'

export {
  isValidEmail,
  isValidDoctorName,
  isValidSpecialtyName,
  isValidSearchTerm,
  isValidTime,
  isValidId,
  isNonEmptyArray,
  hasRequiredProperties,
  isValidDoctor,
  isValidAgenda,
  isValidSpecialty
} from './validators'

export {
  extractField,
  extractDoctorId,
  extractDoctorName,
  extractBuildingCode,
  extractBuildingName,
  normalizeApiData,
  debounce,
  throttle,
  generateId,
  isClient,
  isServer,
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  safeJsonParse,
  safeJsonStringify,
  sleep,
  classNames
} from './helpers'
