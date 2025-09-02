// Exportación centralizada de servicios core
export * from './http.client'
export * from './cache.service'
export * from './error.handler'

// Exportaciones específicas para fácil acceso
export { 
  HttpClient, 
  httpClient, 
  authHttpClient 
} from './http.client'

export { 
  CacheService, 
  cacheService 
} from './cache.service'

export { 
  ErrorHandler,
  type AppError 
} from './error.handler'
