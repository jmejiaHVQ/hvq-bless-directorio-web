// Cliente HTTP centralizado para todas las comunicaciones con APIs
import type { ApiResponse, RequestOptions, ApiError } from '../../shared/types'
import { config } from '../../shared/config'
import { HTTP_STATUS, DEFAULT_TIMEOUTS } from '../../shared/constants'
import { ErrorHandler } from './error.handler'

export class HttpClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>
  private defaultTimeout: number

  constructor(baseUrl?: string) {
    this.baseURL = baseUrl || config.api.baseUrl
    this.defaultHeaders = config.headers
    this.defaultTimeout = config.api.timeout || DEFAULT_TIMEOUTS.DEFAULT
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', ...options })
  }

  async post<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    })
  }

  async put<T>(endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options
    })
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options })
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions & { method?: string; body?: string } = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint)
    const timeout = options.timeout || this.defaultTimeout
    
    const requestConfig: RequestInit = {
      method: options.method || 'GET',
      headers: this.buildHeaders(options.headers),
      body: options.body,
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch(url, {
        ...requestConfig,
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      return await this.handleResponse<T>(response)

    } catch (error) {
      return this.handleError<T>(error)
    }
  }

  private buildUrl(endpoint: string): string {
    if (endpoint.startsWith('http')) return endpoint
    const cleanBase = this.baseURL.replace(/\/$/, '')
    const cleanEndpoint = endpoint.replace(/^\//, '')
    return `${cleanBase}/${cleanEndpoint}`
  }

  private buildHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    return { ...this.defaultHeaders, ...customHeaders }
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error = await this.extractErrorFromResponse(response)
      return {
        data: null as any as T,
        success: false,
        message: error.message
      }
    }

    try {
      const data = await response.json()
      return { data: data as T, success: true }
    } catch {
      try {
        const text = await response.text()
        return { data: text as any as T, success: true }
      } catch {
        return { data: null as any as T, success: true }
      }
    }
  }

  private async extractErrorFromResponse(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json()
      return {
        message: errorData.message || `HTTP error ${response.status}`,
        code: errorData.code || response.status,
        status: response.status
      }
    } catch {
      try {
        const text = await response.text()
        return {
          message: text || `HTTP error ${response.status}`,
          status: response.status
        }
      } catch {
        return {
          message: `HTTP error ${response.status}`,
          status: response.status
        }
      }
    }
  }

  private handleError<T>(error: unknown): ApiResponse<T> {
    const appError = ErrorHandler.handle(error)
    return {
      data: null as any as T,
      success: false,
      message: appError.message
    }
  }

  setBaseUrl(baseUrl: string): void {
    this.baseURL = baseUrl
  }

  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers }
  }

  setAuthHeader(token: string): void {
    this.setDefaultHeaders({ 'Authorization': `Bearer ${token}` })
  }

  removeAuthHeader(): void {
    const { Authorization, ...remainingHeaders } = this.defaultHeaders
    this.defaultHeaders = remainingHeaders
  }
}

export const httpClient = new HttpClient()
export const authHttpClient = new HttpClient(config.api.authUrl)
