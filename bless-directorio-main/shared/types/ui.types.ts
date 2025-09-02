// Tipos específicos para componentes de UI
import { ReactNode } from 'react'

export interface ComponentProps {
  children?: ReactNode
  className?: string
}

export interface CurrentTimeProps {
  variant?: 'full' | 'compact'
}

export interface DirectorioLayoutProps {
  children: ReactNode
  showBackButton?: boolean
}

export interface VirtualKeyboardProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
  placeholder?: string
  onEnter?: () => void
}

export interface DoctorCardProps {
  doctor: {
    id: string | number
    nombres?: string
    especialidades?: string[]
    [key: string]: unknown
  }
  onClick?: () => void
  className?: string
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
  data?: unknown
}

export interface FormState<T = Record<string, unknown>> {
  values: T
  errors: Record<string, string>
  touched: Record<string, boolean>
  isValid: boolean
  isSubmitting: boolean
}

export interface SearchState {
  term: string
  isSearching: boolean
  results: unknown[]
  hasSearched: boolean
  isEmpty: boolean
}

export interface CacheState<T> {
  data: T | null
  timestamp: number
  isValid: boolean
  isExpired: boolean
}
