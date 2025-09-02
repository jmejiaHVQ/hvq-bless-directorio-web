// Configuración centralizada del proyecto
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
    hvqLogo: environment.images.hvqLogo,
  },
  
  // Configuración de caché
  cache: {
    specialties: environment.cache.specialties,
    api: environment.cache.api,
  },
  
  // Configuración de la aplicación
  app: {
    title: environment.app.title,
    description: environment.app.description,
    idleTimeout: environment.app.idleTimeout,
  },
  
  // Headers por defecto
  headers: environment.headers
} as const

// Tipos para la configuración
export type Config = typeof config
