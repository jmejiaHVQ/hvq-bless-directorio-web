// Servicio de caché unificado para toda la aplicación
import type { CacheState } from '../../shared/types'
import { config } from '../../shared/config'
import { DEFAULT_CACHE_TTL } from '../../shared/constants'
import { 
  getSessionStorage, 
  setSessionStorage, 
  removeSessionStorage, 
  safeJsonParse, 
  safeJsonStringify,
  isClient 
} from '../../shared/utils'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

export class CacheService {
  private memoryCache: Map<string, CacheEntry<unknown>>
  private defaultTTL: number

  constructor() {
    this.memoryCache = new Map()
    this.defaultTTL = config.cache.defaultTTL || DEFAULT_CACHE_TTL.MEDIUM
  }

  /**
   * Almacena un valor en caché
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const actualTTL = ttl || this.defaultTTL
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: actualTTL
    }

    // Caché en memoria
    this.memoryCache.set(key, entry)

    // Caché en sessionStorage si está disponible
    if (isClient()) {
      const serialized = safeJsonStringify(entry)
      if (serialized) {
        setSessionStorage(`cache_${key}`, serialized)
      }
    }
  }

  /**
   * Obtiene un valor del caché
   */
  get<T>(key: string): T | null {
    // Intentar obtener de memoria primero
    const memoryEntry = this.memoryCache.get(key) as CacheEntry<T> | undefined
    if (memoryEntry && !this.isEntryExpired(memoryEntry)) {
      return memoryEntry.data
    }

    // Intentar obtener de sessionStorage
    if (isClient()) {
      const serialized = getSessionStorage(`cache_${key}`)
      if (serialized) {
        const entry = safeJsonParse<CacheEntry<T>>(serialized)
        if (entry && !this.isEntryExpired(entry)) {
          // Restaurar en memoria
          this.memoryCache.set(key, entry)
          return entry.data
        } else {
          // Limpiar entrada expirada
          this.remove(key)
        }
      }
    }

    return null
  }

  /**
   * Verifica si una entrada ha expirado
   */
  private isEntryExpired<T>(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp > entry.ttl
  }

  /**
   * Remueve un valor del caché
   */
  remove(key: string): void {
    this.memoryCache.delete(key)
    
    if (isClient()) {
      removeSessionStorage(`cache_${key}`)
    }
  }

  /**
   * Limpia todo el caché
   */
  clear(): void {
    this.memoryCache.clear()
    
    if (isClient()) {
      // Limpiar todas las entradas de caché de sessionStorage
      try {
        for (let i = sessionStorage.length - 1; i >= 0; i--) {
          const key = sessionStorage.key(i)
          if (key?.startsWith('cache_')) {
            sessionStorage.removeItem(key)
          }
        }
      } catch {
        // Ignorar errores de sessionStorage
      }
    }
  }

  /**
   * Limpia entradas expiradas
   */
  clearExpired(): void {
    // Limpiar memoria
    for (const [key, entry] of this.memoryCache.entries()) {
      if (this.isEntryExpired(entry)) {
        this.memoryCache.delete(key)
      }
    }

    // Limpiar sessionStorage
    if (isClient()) {
      try {
        for (let i = sessionStorage.length - 1; i >= 0; i--) {
          const key = sessionStorage.key(i)
          if (key?.startsWith('cache_')) {
            const serialized = sessionStorage.getItem(key)
            if (serialized) {
              const entry = safeJsonParse<CacheEntry<unknown>>(serialized)
              if (entry && this.isEntryExpired(entry)) {
                sessionStorage.removeItem(key)
              }
            }
          }
        }
      } catch {
        // Ignorar errores de sessionStorage
      }
    }
  }

  /**
   * Verifica si una clave existe en caché y no ha expirado
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Verifica si una clave ha expirado
   */
  isExpired(key: string): boolean {
    const memoryEntry = this.memoryCache.get(key)
    if (memoryEntry) {
      return this.isEntryExpired(memoryEntry)
    }

    if (isClient()) {
      const serialized = getSessionStorage(`cache_${key}`)
      if (serialized) {
        const entry = safeJsonParse<CacheEntry<unknown>>(serialized)
        if (entry) {
          return this.isEntryExpired(entry)
        }
      }
    }

    return true
  }

  /**
   * Obtiene el estado del caché para una clave
   */
  getState<T>(key: string): CacheState<T> {
    const data = this.get<T>(key)
    const isValid = data !== null
    const isExpired = !isValid || this.isExpired(key)
    
    return {
      data,
      timestamp: Date.now(),
      isValid,
      isExpired
    }
  }

  /**
   * Obtiene información de debug del caché
   */
  getStats(): {
    memoryEntries: number
    sessionStorageEntries: number
    expiredEntries: number
  } {
    const memoryEntries = this.memoryCache.size
    let sessionStorageEntries = 0
    let expiredEntries = 0

    if (isClient()) {
      try {
        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i)
          if (key?.startsWith('cache_')) {
            sessionStorageEntries++
            const serialized = sessionStorage.getItem(key)
            if (serialized) {
              const entry = safeJsonParse<CacheEntry<unknown>>(serialized)
              if (entry && this.isEntryExpired(entry)) {
                expiredEntries++
              }
            }
          }
        }
      } catch {
        // Ignorar errores
      }
    }

    return {
      memoryEntries,
      sessionStorageEntries,
      expiredEntries
    }
  }

  /**
   * Función helper para obtener o establecer un valor
   */
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    const cached = this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    const data = await fetcher()
    this.set(key, data, ttl)
    return data
  }
}

// Instancia global del servicio de caché
export const cacheService = new CacheService()
