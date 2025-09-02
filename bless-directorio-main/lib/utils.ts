// Archivo de compatibilidad para utilidades de UI
import { classNames, extractHHmm, formatHHmmTo12h } from "@/shared/utils"

// Re-exportar cn como classNames para compatibilidad con shadcn/ui
export const cn = classNames

// Otras utilidades que podrían ser necesarias para componentes UI
export { classNames, extractHHmm, formatHHmmTo12h } from "@/shared/utils"
