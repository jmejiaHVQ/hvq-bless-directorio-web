// Archivo de compatibilidad para servicios de API
import { config } from './config'
import { getAccessToken } from './auth'
import axios from 'axios'

// Cliente API básico para compatibilidad
export const apiService = {
  async getDoctores() {
    try {
      const token = await getAccessToken()
      const response = await axios.get(`${config.api.baseUrl}/api/medicos`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return { data: response.data, success: true }
    } catch (error) {
      return { data: [], success: false, message: 'Error obteniendo médicos' }
    }
  },

  async getAgendasDetalladasPorMedico(doctorId: string) {
    try {
      const token = await getAccessToken()
      const response = await axios.get(`${config.api.baseUrl}/api/agnd-agenda?codigo_prestador=${doctorId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      return { data: response.data, success: true }
    } catch (error) {
      return { data: [], success: false, message: 'Error obteniendo agendas' }
    }
  }
}
