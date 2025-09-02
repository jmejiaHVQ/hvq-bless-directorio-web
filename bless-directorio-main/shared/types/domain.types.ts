// Tipos de entidades de dominio del negocio
export interface Doctor {
  id?: string | number
  codigo?: string | number
  codigoPrestador?: string | number
  codigo_prestador?: string | number
  cd_prestador?: string | number
  prestadorId?: string | number
  medicoId?: string | number
  nombres?: string
  especialidades?: string[]
  retrato?: string
  [key: string]: unknown
}

export interface Agenda {
  id?: string | number
  codigo_item_agendamiento?: string | number
  codigo_prestador?: string | number
  codigoPrestador?: string | number
  cd_prestador?: string | number
  prestadorId?: string | number
  medicoId?: string | number
  codigo_dia?: string | number
  dia?: string | number
  diaCodigo?: string | number
  hora_inicio?: string | number
  horaInicio?: string | number
  hora?: string | number
  hora_fin?: string | number
  horaFin?: string | number
  horarioFin?: string | number
  tipo?: string
  codigo_consultorio?: string | number
  consultorio?: string | number
  consultorioCodigo?: string | number
  [key: string]: unknown
}

export interface Edificio {
  id?: string | number
  codigo?: string | number
  codigoEdificio?: string | number
  CD_EDIFICIO?: string | number
  edificio_id?: string | number
  descripcion_edificio?: string
  descripcion?: string
  nombre?: string
  DES_EDIFICIO?: string
  edificioNombre?: string
  nombre_edificio?: string
  [key: string]: unknown
}

export interface Especialidad {
  especialidadId: number
  descripcion: string | null
  tipo: string | null
  icono: string | null
}

export interface ConsultorioNormalizado {
  codigo_consultorio: string
  codigo_edificio?: string
  piso?: string | number
  des_piso?: string
  descripcion_consultorio?: string
  __raw?: Record<string, unknown>
}

export interface AgendaDetallada {
  // Origen directo de AGND_AGENDA
  codigo_item_agendamiento?: string | number
  codigo_prestador?: string | number
  codigo_dia?: string | number
  hora_inicio?: string | number
  hora_fin?: string | number
  tipo?: string
  codigo_consultorio?: string | number

  // Derivados / decodificados
  especialidad?: string
  medico?: string
  diaNombre?: string
  horaInicioHHmm?: string
  horaFinHHmm?: string
  consultorioDescripcion?: string
  consultorioCodigo?: string
  edificioDescripcion?: string
  tipoTexto?: string

  // Extras útiles para UI
  piso?: string | number
  pisoDescripcion?: string
  buildingCode?: string
}

export interface DoctorStats {
  total: number
  bySpecialty: Record<string, number>
  withAgendas: number
  withoutAgendas: number
}

export interface AgendaStats {
  total: number
  byType: Record<string, number>
  byDay: Record<string, number>
  byBuilding: Record<string, number>
}
