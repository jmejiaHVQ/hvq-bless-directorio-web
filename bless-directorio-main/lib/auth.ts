// Archivo de compatibilidad para autenticación
import axios from "axios"
import { config } from "./config"

// Variables de estado para los tokens
let accessToken = ''
let refreshToken = ''

// Función para obtener credenciales desde variables de entorno
const getCredentials = (): { username: string; password: string } => {
  const username = process.env.NEXT_PUBLIC_AUTH_USERNAME || 'middleware_dev'
  const password = process.env.NEXT_PUBLIC_AUTH_PASSWORD || 'DevMH@2025!'
  
  if (!username || !password) {
    throw new Error('Credenciales de autenticación no configuradas')
  }
  
  return { username, password }
}

// Función para hacer login
const login = async (): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const { username, password } = getCredentials()
    
    const response = await axios.post(
      `${config.api.authUrl}/Auth/login`,
      new URLSearchParams({ username, password }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: config.api.timeout
      }
    )
    
    const { access_token, refresh_token } = response.data
    
    if (!access_token || !refresh_token) {
      throw new Error('Respuesta de autenticación inválida')
    }
    
    return { accessToken: access_token, refreshToken: refresh_token }
  } catch (error) {
    throw new Error('Error de autenticación')
  }
}

// Función principal para obtener el token de acceso
export const getAccessToken = async (): Promise<string> => {
  if (!accessToken) {
    const tokens = await login()
    accessToken = tokens.accessToken
    refreshToken = tokens.refreshToken
  }
  return accessToken
}

// Función para limpiar los tokens (útil para logout)
export const clearAuthTokens = (): void => {
  accessToken = ''
  refreshToken = ''
}

// Función para verificar si hay un token válido
export const hasValidToken = (): boolean => {
  return Boolean(accessToken)
}
