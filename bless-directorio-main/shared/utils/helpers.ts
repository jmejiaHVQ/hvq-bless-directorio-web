// Utilidades auxiliares generales
import { FIELD_MAPPINGS } from '../constants'

/**
 * Extrae un valor de un objeto usando múltiples campos candidatos
 */
export const extractField = (
  obj: Record<string, unknown>, 
  fieldMappings: readonly string[]
): unknown => {
  for (const field of fieldMappings) {
    const value = obj[field]
    if (value != null && String(value).trim() !== '') {
      return value
    }
  }
  return undefined
}

/**
 * Extrae ID de médico usando los mappings definidos
 */
export const extractDoctorId = (doctor: Record<string, unknown>): string => {
  const id = extractField(doctor, FIELD_MAPPINGS.DOCTOR_ID)
  return String(id ?? '')
}

/**
 * Extrae nombre de médico usando los mappings definidos
 */
export const extractDoctorName = (doctor: Record<string, unknown>): string => {
  const name = extractField(doctor, FIELD_MAPPINGS.DOCTOR_NAME)
  return String(name ?? '')
}

/**
 * Extrae código de edificio usando los mappings definidos
 */
export const extractBuildingCode = (building: Record<string, unknown>): string => {
  const code = extractField(building, FIELD_MAPPINGS.BUILDING_CODE)
  return String(code ?? '')
}

/**
 * Extrae nombre de edificio usando los mappings definidos
 */
export const extractBuildingName = (building: Record<string, unknown>): string => {
  const name = extractField(building, FIELD_MAPPINGS.BUILDING_NAME)
  return String(name ?? '')
}

/**
 * Extrae código de consultorio usando los mappings definidos
 */
export const extractConsultorioCode = (consultorio: Record<string, unknown>): string => {
  const code = extractField(consultorio, FIELD_MAPPINGS.CONSULTORIO_CODE)
  return String(code ?? '')
}

/**
 * Extrae nombre de consultorio usando los mappings definidos
 */
export const extractConsultorioName = (consultorio: Record<string, unknown>): string => {
  const name = extractField(consultorio, FIELD_MAPPINGS.CONSULTORIO_NAME)
  return String(name ?? '')
}

/**
 * Normaliza una lista de datos desde la respuesta de API
 * Algunos endpoints envuelven los datos en { data: [...] }
 */
export const normalizeApiData = <T>(response: unknown): T[] => {
  if (Array.isArray(response)) {
    return response as T[]
  }
  
  if (response && typeof response === 'object') {
    const obj = response as Record<string, unknown>
    if (Array.isArray(obj.data)) {
      return obj.data as T[]
    }
  }
  
  return []
}

/**
 * Retrasa la ejecución de una función (debounce)
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

/**
 * Limita la frecuencia de ejecución de una función (throttle)
 */
export const throttle = <T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Genera un ID único simple
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * Verifica si el código se está ejecutando en el cliente
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined'
}

/**
 * Verifica si el código se está ejecutando en el servidor
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined'
}

/**
 * Obtiene un valor de sessionStorage de forma segura
 */
export const getSessionStorage = (key: string): string | null => {
  if (!isClient()) return null
  
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Establece un valor en sessionStorage de forma segura
 */
export const setSessionStorage = (key: string, value: string): boolean => {
  if (!isClient()) return false
  
  try {
    sessionStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Remueve un valor de sessionStorage de forma segura
 */
export const removeSessionStorage = (key: string): boolean => {
  if (!isClient()) return false
  
  try {
    sessionStorage.removeItem(key)
    return true
  } catch {
    return false
  }
}

/**
 * Parsea JSON de forma segura
 */
export const safeJsonParse = <T>(json: string): T | null => {
  try {
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

/**
 * Stringify JSON de forma segura
 */
export const safeJsonStringify = (obj: unknown): string | null => {
  try {
    return JSON.stringify(obj)
  } catch {
    return null
  }
}

/**
 * Espera un tiempo determinado (útil para testing y demos)
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Combina clases CSS de forma condicional
 */
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}
