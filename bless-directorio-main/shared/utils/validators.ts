// Utilidades para validación de datos
import { VALIDATION_RULES } from '../constants'

/**
 * Valida si un string es un email válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida si un string es un nombre de médico válido
 */
export const isValidDoctorName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false
  
  const trimmed = name.trim()
  return (
    trimmed.length >= VALIDATION_RULES.DOCTOR_NAME.MIN_LENGTH &&
    trimmed.length <= VALIDATION_RULES.DOCTOR_NAME.MAX_LENGTH &&
    VALIDATION_RULES.DOCTOR_NAME.PATTERN.test(trimmed)
  )
}

/**
 * Valida si un string es un nombre de especialidad válido
 */
export const isValidSpecialtyName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false
  
  const trimmed = name.trim()
  return (
    trimmed.length >= VALIDATION_RULES.SPECIALTY_NAME.MIN_LENGTH &&
    trimmed.length <= VALIDATION_RULES.SPECIALTY_NAME.MAX_LENGTH
  )
}

/**
 * Valida si un string es un término de búsqueda válido
 */
export const isValidSearchTerm = (term: string): boolean => {
  if (!term || typeof term !== 'string') return false
  
  const trimmed = term.trim()
  return (
    trimmed.length >= VALIDATION_RULES.SEARCH_TERM.MIN_LENGTH &&
    trimmed.length <= VALIDATION_RULES.SEARCH_TERM.MAX_LENGTH
  )
}

/**
 * Valida si un string es una hora válida (HH:mm)
 */
export const isValidTime = (time: string): boolean => {
  if (!time || typeof time !== 'string') return false
  
  return VALIDATION_RULES.TIME.PATTERN.test(time.trim())
}

/**
 * Valida si un string es un formato de hora numérico válido (830, 1330)
 */
export const isValidNumericTime = (time: string): boolean => {
  if (!time || typeof time !== 'string') return false
  
  return VALIDATION_RULES.TIME.NUMERIC_PATTERN.test(time.trim())
}

/**
 * Valida si un valor puede ser un ID válido
 */
export const isValidId = (id: unknown): boolean => {
  if (id == null) return false
  
  const str = String(id).trim()
  if (!str) return false
  
  // Puede ser numérico o string no vacío
  return !isNaN(Number(str)) || str.length > 0
}

/**
 * Valida si un array no está vacío
 */
export const isNonEmptyArray = (arr: unknown): arr is unknown[] => {
  return Array.isArray(arr) && arr.length > 0
}

/**
 * Valida si un objeto tiene las propiedades requeridas
 */
export const hasRequiredProperties = (
  obj: unknown, 
  properties: string[]
): obj is Record<string, unknown> => {
  if (!obj || typeof obj !== 'object') return false
  
  const record = obj as Record<string, unknown>
  return properties.every(prop => prop in record && record[prop] != null)
}

/**
 * Valida estructura básica de Doctor
 */
export const isValidDoctor = (doctor: unknown): boolean => {
  if (!doctor || typeof doctor !== 'object') return false
  
  const doc = doctor as Record<string, unknown>
  
  // Debe tener al menos un campo de ID y opcionalmente nombres
  const hasId = [
    'id', 'codigo', 'codigoPrestador', 'codigo_prestador', 
    'cd_prestador', 'prestadorId', 'medicoId'
  ].some(field => isValidId(doc[field]))
  
  return hasId
}

/**
 * Valida estructura básica de Agenda
 */
export const isValidAgenda = (agenda: unknown): boolean => {
  if (!agenda || typeof agenda !== 'object') return false
  
  const ag = agenda as Record<string, unknown>
  
  // Debe tener al menos código de prestador
  const hasDoctorId = [
    'codigo_prestador', 'codigoPrestador', 'cd_prestador', 
    'prestadorId', 'medicoId'
  ].some(field => isValidId(ag[field]))
  
  return hasDoctorId
}

/**
 * Valida estructura básica de Especialidad
 */
export const isValidSpecialty = (specialty: unknown): boolean => {
  if (!specialty || typeof specialty !== 'object') return false
  
  const spec = specialty as Record<string, unknown>
  
  return (
    isValidId(spec.especialidadId) &&
    typeof spec.descripcion === 'string'
  )
}

/**
 * Valida que un valor esté dentro de un rango numérico
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return typeof value === 'number' && 
         !isNaN(value) && 
         value >= min && 
         value <= max
}

/**
 * Valida formato de URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
