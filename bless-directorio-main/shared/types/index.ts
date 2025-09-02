// Exportación centralizada de todos los tipos
export * from './api.types'
export * from './domain.types'
export * from './ui.types'
export * from './auth.types'

// Re-exportación para compatibilidad con código existente
export type {
  Doctor,
  Agenda,
  Edificio,
  Especialidad,
  ConsultorioNormalizado,
  AgendaDetallada
} from './domain.types'

export type {
  ApiResponse
} from './api.types'

export type {
  AuthTokens,
  AuthError,
  LoginCredentials,
  AuthResult
} from './auth.types'

export type {
  CurrentTimeProps,
  DirectorioLayoutProps,
  VirtualKeyboardProps
} from './ui.types'
