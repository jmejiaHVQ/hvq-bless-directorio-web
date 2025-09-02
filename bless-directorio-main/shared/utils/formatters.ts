// Utilidades para formateo de datos
import { DAYS_OF_WEEK, APPOINTMENT_TYPES, DEFAULT_VALUES } from '../constants'

/**
 * Convierte códigos de días a nombres legibles
 */
export const formatDayName = (dayCode: unknown): string => {
  const code = String(dayCode ?? '').trim()
  if (!code) return ''
  
  // Buscar en catálogo de códigos numéricos
  if (DAYS_OF_WEEK.CODES[code as keyof typeof DAYS_OF_WEEK.CODES]) {
    return DAYS_OF_WEEK.CODES[code as keyof typeof DAYS_OF_WEEK.CODES]
  }
  
  const upper = code.toUpperCase()
  
  // Buscar en catálogo de letras
  if (DAYS_OF_WEEK.LETTERS[upper as keyof typeof DAYS_OF_WEEK.LETTERS]) {
    return DAYS_OF_WEEK.LETTERS[upper as keyof typeof DAYS_OF_WEEK.LETTERS]
  }
  
  // Buscar en nombres completos
  if (DAYS_OF_WEEK.FULL_NAMES[upper as keyof typeof DAYS_OF_WEEK.FULL_NAMES]) {
    return DAYS_OF_WEEK.FULL_NAMES[upper as keyof typeof DAYS_OF_WEEK.FULL_NAMES]
  }
  
  return code
}

/**
 * Convierte valores de tiempo a formato HH:mm
 */
export const formatTime = (timeValue: unknown): string => {
  if (timeValue == null) return ''
  const str = String(timeValue).trim()
  if (!str) return ''
  
  // Ya está en formato HH:mm
  if (/^\d{2}:\d{2}$/.test(str)) return str
  
  // Formato HH:mm:ss -> HH:mm
  if (/^\d{2}:\d{2}:\d{2}$/.test(str)) return str.slice(0, 5)
  
  // Formato numérico (830 -> 08:30, 1330 -> 13:30)
  if (/^\d{3,4}$/.test(str)) {
    const padded = str.padStart(4, '0')
    return `${padded.slice(0, 2)}:${padded.slice(2)}`
  }
  
  // Fallback: extraer solo dígitos e intentar formatear
  const onlyDigits = str.replace(/[^0-9]/g, '')
  if (onlyDigits.length >= 3 && onlyDigits.length <= 4) {
    const padded = onlyDigits.padStart(4, '0')
    return `${padded.slice(0, 2)}:${padded.slice(2)}`
  }
  
  return str
}

/**
 * Extrae HH:mm de cualquier formato de tiempo
 */
export const extractHHmm = (timeValue: unknown): string => {
  return formatTime(timeValue)
}

/**
 * Convierte HH:mm a formato 12 horas con AM/PM
 */
export const formatHHmmTo12h = (time: string): string => {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return time
  
  const [hours, minutes] = time.split(':')
  const hour24 = parseInt(hours, 10)
  
  if (hour24 === 0) return `12:${minutes} AM`
  if (hour24 < 12) return `${hour24}:${minutes} AM`
  if (hour24 === 12) return `12:${minutes} PM`
  return `${hour24 - 12}:${minutes} PM`
}

/**
 * Convierte códigos de tipo de cita a texto legible
 */
export const formatAppointmentType = (typeCode: unknown): string => {
  const code = String(typeCode ?? '').toUpperCase()
  if (APPOINTMENT_TYPES.CODES[code as keyof typeof APPOINTMENT_TYPES.CODES]) {
    return APPOINTMENT_TYPES.CODES[code as keyof typeof APPOINTMENT_TYPES.CODES]
  }
  return code || ''
}

/**
 * Formatea número de piso
 */
export const formatFloor = (floor: unknown): string => {
  if (floor == null || String(floor).trim() === '') return ''
  
  const floorNum = Number(floor)
  return Number.isFinite(floorNum) ? `Piso ${floorNum}` : String(floor)
}

/**
 * Formatea texto con valor por defecto si está vacío
 */
export const formatWithDefault = (value: unknown, defaultValue: string): string => {
  const str = String(value ?? '').trim()
  return str || defaultValue
}

/**
 * Formatea nombre de médico
 */
export const formatDoctorName = (name: unknown): string => {
  return formatWithDefault(name, DEFAULT_VALUES.UNKNOWN_DOCTOR)
}

/**
 * Formatea nombre de especialidad
 */
export const formatSpecialtyName = (name: unknown): string => {
  return formatWithDefault(name, DEFAULT_VALUES.UNKNOWN_SPECIALTY)
}

/**
 * Formatea descripción de edificio
 */
export const formatBuildingName = (name: unknown): string => {
  return formatWithDefault(name, DEFAULT_VALUES.UNKNOWN_BUILDING)
}

/**
 * Formatea descripción de consultorio
 */
export const formatConsultorioName = (name: unknown): string => {
  return formatWithDefault(name, DEFAULT_VALUES.UNKNOWN_CONSULTORIO)
}

/**
 * Trunca texto a una longitud máxima
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 3) + '...'
}

/**
 * Capitaliza la primera letra de cada palabra
 */
export const toTitleCase = (text: string): string => {
  return text.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Limpia y normaliza texto para búsquedas
 */
export const normalizeSearchText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .trim()
}
