// Configuración de entorno migrada y mejorada
export const environment = {
  // Configuración de la API Backend
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    authUrl: process.env.NEXT_PUBLIC_AUTH_URL || 'http://10.129.180.161:36560/api3/v1',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'), // 30 segundos
  },
  
  // Configuración de imágenes y recursos
  images: {
    logo: process.env.NEXT_PUBLIC_LOGO_URL || 'http://horizon-html:35480/public/img_directorio/logo.svg',
    aplicativoLogo: process.env.NEXT_PUBLIC_APLICATIVO_LOGO_URL || 'http://horizon-html:35480/public/img_directorio/aplicativo_logo.svg',
    homeline: process.env.NEXT_PUBLIC_HOMELINE_URL || 'http://horizon-html:35480/public/img_directorio/homeline.png',
    banner: process.env.NEXT_PUBLIC_BANNER_URL || 'http://horizon-html:35480/public/img_directorio/banner.png',
    banner2: process.env.NEXT_PUBLIC_BANNER2_URL || 'http://horizon-html:35480/public/img_directorio/banner_2.png',
    banner3: process.env.NEXT_PUBLIC_BANNER3_URL || 'http://horizon-html:35480/public/img_directorio/banner_3.png',
    qrBlessVideo: process.env.NEXT_PUBLIC_QR_BLESS_VIDEO_URL || 'http://horizon-html:35480/public/img_directorio/QR_Bless_Animado.mp4',
    hvqLogo: process.env.NEXT_PUBLIC_HVQ_LOGO_URL || '/assets/images/hvq_2025_1.png',
  },
  
  // Configuración de la aplicación
  app: {
    title: process.env.NEXT_PUBLIC_APP_TITLE || 'hvq-dir',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Directorio Edificio Bless',
    idleTimeout: parseInt(process.env.NEXT_PUBLIC_IDLE_TIMEOUT || '30000'), // 30 segundos
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },
  
  // Configuración de caché
  cache: {
    specialties: parseInt(process.env.NEXT_PUBLIC_CACHE_SPECIALTIES || '60000'), // 60 segundos
    api: parseInt(process.env.NEXT_PUBLIC_CACHE_API || '30000'), // 30 segundos
    defaultTTL: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000'), // 5 minutos
  },
  
  // Configuración de desarrollo
  development: {
    debug: process.env.NEXT_PUBLIC_DEBUG === 'true',
    enableLogging: process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  },
  
  // Headers por defecto
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const

// Tipos para la configuración
export type Environment = typeof environment
