// Exportación centralizada de configuración
export * from './environment'
export * from './app.config'

// Re-exportación para compatibilidad con código existente
export { config } from './app.config'
export { environment } from './environment'

// Tipos
export type { Config } from './app.config'
export type { Environment } from './environment'
