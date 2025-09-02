// Tipos relacionados con autenticación
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn?: number
  tokenType?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResult {
  success: boolean
  tokens?: AuthTokens
  user?: AuthUser
  error?: string
}

export interface AuthUser {
  id: string | number
  username: string
  email?: string
  roles?: string[]
  permissions?: string[]
}

export interface AuthError {
  message: string
  code?: string
  status?: number
}

export interface TokenValidationResult {
  isValid: boolean
  isExpired: boolean
  decodedToken?: DecodedToken
  error?: string
}

export interface DecodedToken {
  sub: string
  exp: number
  iat: number
  roles?: string[]
  permissions?: string[]
  [key: string]: unknown
}

export interface AuthState {
  isAuthenticated: boolean
  user: AuthUser | null
  tokens: AuthTokens | null
  isLoading: boolean
  error: string | null
}
