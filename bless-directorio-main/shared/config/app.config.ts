// Configuración centralizada de la aplicación
import { environment } from './environment'

export const config = {
  // URLs de la API
  api: {
    baseUrl: environment.api.baseUrl,
    authUrl: environment.api.authUrl,
    timeout: environment.api.timeout,
  },
  
  // URLs de imágenes
  images: {
    logo: environment.images.logo,
    aplicativoLogo: environment.images.aplicativoLogo,
    homeline: environment.images.homeline,
    banner: environment.images.banner,
    banner2: environment.images.banner2,
    banner3: environment.images.banner3,
    qrBlessVideo: environment.images.qrBlessVideo,
    hvqLogo: environment.images.hvqLogo,
  },
  
  // Configuración de caché
  cache: {
    specialties: environment.cache.specialties,
    api: environment.cache.api,
    defaultTTL: environment.cache.defaultTTL,
  },
  
  // Configuración de la aplicación
  app: {
    title: environment.app.title,
    description: environment.app.description,
    idleTimeout: environment.app.idleTimeout,
    version: environment.app.version,
  },
  
  // Configuración de desarrollo
  development: {
    debug: environment.development.debug,
    enableLogging: environment.development.enableLogging,
    logLevel: environment.development.logLevel,
  },
  
  // Headers por defecto
  headers: environment.headers
} as const

// Tipos para la configuración
export type Config = typeof config
