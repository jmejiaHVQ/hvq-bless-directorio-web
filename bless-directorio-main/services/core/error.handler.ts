// Manejador de errores centralizado para toda la aplicación
import type { ApiError } from '../../shared/types'
import { HTTP_STATUS, ERROR_MESSAGES } from '../../shared/constants'
import { config } from '../../shared/config'

export interface AppError {
  message: string
  code?: string | number
  details?: unknown
  type: 'network' | 'timeout' | 'auth' | 'validation' | 'server' | 'unknown'
}

export class ErrorHandler {
  /**
   * Maneja cualquier tipo de error y lo normaliza
   */
  static handle(error: unknown): AppError {
    // Error de red/fetch
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return this.createError(
        ERROR_MESSAGES.NETWORK_ERROR,
        'NETWORK_ERROR',
        'network',
        error
      )
    }

    // Error de AbortController (timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      return this.createError(
        ERROR_MESSAGES.TIMEOUT_ERROR,
        'TIMEOUT_ERROR',
        'timeout',
        error
      )
    }

    // Error estándar de JavaScript
    if (error instanceof Error) {
      return this.createError(
        error.message || ERROR_MESSAGES.GENERIC_ERROR,
        'JS_ERROR',
        'unknown',
        error
      )
    }

    // Error de API estructurado
    if (this.isApiError(error)) {
      return this.handleApiError(error)
    }

    // Error desconocido
    return this.createError(
      ERROR_MESSAGES.GENERIC_ERROR,
      'UNKNOWN_ERROR',
      'unknown',
      error
    )
  }

  /**
   * Maneja errores específicos de API
   */
  private static handleApiError(error: ApiError): AppError {
    const status = error.status || 0

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        return this.createError(
          ERROR_MESSAGES.UNAUTHORIZED,
          'UNAUTHORIZED',
          'auth',
          error
        )
      
      case HTTP_STATUS.FORBIDDEN:
        return this.createError(
          ERROR_MESSAGES.UNAUTHORIZED,
          'FORBIDDEN',
          'auth',
          error
        )
      
      case HTTP_STATUS.NOT_FOUND:
        return this.createError(
          ERROR_MESSAGES.NOT_FOUND,
          'NOT_FOUND',
          'server',
          error
        )
      
      case HTTP_STATUS.BAD_REQUEST:
        return this.createError(
          ERROR_MESSAGES.VALIDATION_ERROR,
          'BAD_REQUEST',
          'validation',
          error
        )
      
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return this.createError(
          ERROR_MESSAGES.SERVER_ERROR,
          'SERVER_ERROR',
          'server',
          error
        )
      
      default:
        return this.createError(
          error.message || ERROR_MESSAGES.GENERIC_ERROR,
          String(status),
          'server',
          error
        )
    }
  }

  /**
   * Crea un objeto de error normalizado
   */
  private static createError(
    message: string,
    code: string,
    type: AppError['type'],
    originalError?: unknown
  ): AppError {
    return {
      message,
      code,
      type,
      details: originalError
    }
  }

  /**
   * Verifica si un error es del tipo ApiError
   */
  private static isApiError(error: unknown): error is ApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as any).message === 'string'
    )
  }

  /**
   * Verifica si un error es de red
   */
  static isNetworkError(error: unknown): boolean {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return true
    }
    
    const appError = this.handle(error)
    return appError.type === 'network'
  }

  /**
   * Verifica si un error es de autenticación
   */
  static isAuthError(error: unknown): boolean {
    const appError = this.handle(error)
    return appError.type === 'auth'
  }

  /**
   * Verifica si un error es de timeout
   */
  static isTimeoutError(error: unknown): boolean {
    if (error instanceof Error && error.name === 'AbortError') {
      return true
    }
    
    const appError = this.handle(error)
    return appError.type === 'timeout'
  }

  /**
   * Verifica si un error es de servidor
   */
  static isServerError(error: unknown): boolean {
    const appError = this.handle(error)
    return appError.type === 'server'
  }

  /**
   * Obtiene un mensaje de error user-friendly
   */
  static getUserMessage(error: unknown): string {
    const appError = this.handle(error)
    
    // En desarrollo, mostrar detalles más específicos
    if (config.development.debug) {
      return `${appError.message} (${appError.code})`
    }
    
    // En producción, mensajes más genéricos para ciertos tipos de error
    switch (appError.type) {
      case 'network':
        return ERROR_MESSAGES.NETWORK_ERROR
      case 'timeout':
        return ERROR_MESSAGES.TIMEOUT_ERROR
      case 'server':
        return ERROR_MESSAGES.SERVER_ERROR
      case 'auth':
        return ERROR_MESSAGES.UNAUTHORIZED
      default:
        return appError.message
    }
  }

  /**
   * Registra un error (para monitoreo)
   */
  static log(error: unknown, context?: string): void {
    const appError = this.handle(error)
    
    if (config.development.enableLogging) {
      const logLevel = config.development.logLevel
      const message = `[${appError.type.toUpperCase()}] ${appError.message}`
      const details = {
        code: appError.code,
        context,
        originalError: appError.details
      }

      switch (logLevel) {
        case 'error':
          console.error(message, details)
          break
        case 'warn':
          if (appError.type !== 'unknown') {
            console.warn(message, details)
          }
          break
        case 'info':
        default:
          console.info(message, details)
          break
      }
    }
  }

  /**
   * Función helper para manejar errores en async/await
   */
  static async catch<T>(
    promise: Promise<T>,
    context?: string
  ): Promise<[AppError | null, T | null]> {
    try {
      const result = await promise
      return [null, result]
    } catch (error) {
      const appError = this.handle(error)
      this.log(error, context)
      return [appError, null]
    }
  }
}
