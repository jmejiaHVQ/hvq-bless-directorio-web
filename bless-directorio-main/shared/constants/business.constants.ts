// Constantes de lógica de negocio específicas del dominio médico
export const DAYS_OF_WEEK = {
  CODES: {
    '1': 'Lunes',
    '2': 'Martes', 
    '3': 'Miércoles',
    '4': 'Jueves',
    '5': 'Viernes',
    '6': 'Sábado',
    '7': 'Domingo'
  },
  LETTERS: {
    'L': 'Lunes',
    'M': 'Martes',
    'X': 'Miércoles', 
    'J': 'Jueves',
    'V': 'Viernes',
    'S': 'Sábado',
    'D': 'Domingo'
  },
  FULL_NAMES: {
    'LUNES': 'Lunes',
    'MARTES': 'Martes',
    'MIERCOLES': 'Miércoles',
    'MIÉRCOLES': 'Miércoles',
    'JUEVES': 'Jueves',
    'VIERNES': 'Viernes',
    'SABADO': 'Sábado',
    'SÁBADO': 'Sábado',
    'DOMINGO': 'Domingo'
  }
} as const

export const APPOINTMENT_TYPES = {
  CODES: {
    'C': 'Consulta',
    'P': 'Procedimiento'
  }
} as const

export const TIME_FORMATS = {
  HOUR_MINUTE: 'HH:mm',
  HOUR_MINUTE_SECOND: 'HH:mm:ss',
  TWELVE_HOUR: 'h:mm a',
  DISPLAY_FORMAT: 'HH:mm'
} as const

export const VALIDATION_RULES = {
  DOCTOR_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
  },
  SPECIALTY_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50
  },
  SEARCH_TERM: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  TIME: {
    PATTERN: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
    NUMERIC_PATTERN: /^\d{3,4}$/
  }
} as const

export const DEFAULT_VALUES = {
  UNKNOWN_DOCTOR: 'Médico sin nombre',
  UNKNOWN_SPECIALTY: 'Especialidad sin nombre',
  UNKNOWN_BUILDING: 'Edificio desconocido',
  UNKNOWN_CONSULTORIO: 'Consultorio desconocido',
  NO_SCHEDULE: 'Sin horario disponible',
  DEFAULT_ICON: '🏥'
} as const

export const FIELD_MAPPINGS = {
  DOCTOR_ID: [
    'id',
    'codigo', 
    'codigoPrestador',
    'codigo_prestador',
    'cd_prestador',
    'prestadorId',
    'medicoId'
  ],
  DOCTOR_NAME: [
    'nombres',
    'nombre',
    'nombreCompleto',
    'fullName'
  ],
  BUILDING_CODE: [
    'codigo',
    'id',
    'codigoEdificio',
    'CD_EDIFICIO',
    'edificio_id'
  ],
  BUILDING_NAME: [
    'descripcion_edificio',
    'descripcion',
    'nombre',
    'DES_EDIFICIO',
    'edificioNombre',
    'nombre_edificio'
  ],
  CONSULTORIO_CODE: [
    'codigo',
    'id',
    'codigo_consultorio',
    'CD_CONSULTORIO',
    'consultorio_id'
  ],
  CONSULTORIO_NAME: [
    'des_consultorio',
    'DES_CONSULTORIO',
    'descripcion_consultorio',
    'DESCRIPCION_CONSULTORIO',
    'descripcion',
    'nombre',
    'consultorio',
    'consultorio_nombre'
  ]
} as const
