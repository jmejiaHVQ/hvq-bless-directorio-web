// Tipos para respuestas y comunicación con APIs
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface RequestOptions {
  headers?: Record<string, string>
  timeout?: number
  cache?: boolean
  cacheTTL?: number
}

export interface ApiError {
  message: string
  code?: string | number
  status?: number
  details?: unknown
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

export interface EndpointConfig {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  requiresAuth: boolean
  cache?: boolean
  timeout?: number
}
