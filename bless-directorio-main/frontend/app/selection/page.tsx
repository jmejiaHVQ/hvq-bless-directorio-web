import Link from "next/link"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import "@/styles/pages.css"
import { DirectorioLayout } from "@/components/directorio-layout"
import { StethoscopeIcon, UserSearchIcon } from 'lucide-react'
import { config } from "@/lib/config"

export default function SelectionPage() {
  return (
    <DirectorioLayout>
      <div style={{ paddingTop: '20px' }}>
        {/* Contenedor principal con fondo marrón oscuro */}
        <div className="selection-main-container" style={{ borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem' }}>
          <h1 className="selection-title text-6xl mb-16">¿Cómo deseas buscar?</h1>
          
          {/* Layout horizontal para las dos opciones */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-7xl mx-auto px-8 pb-16">
            
            {/* Opción 1: Buscar por Especialidad */}
            <div className="w-full lg:w-1/2 max-w-lg">
              <Link href="/specialties" passHref>
                <Card className="selection-card hover:scale-105 transition-transform duration-300 cursor-pointer shadow-2xl" 
                      style={{ height: '32rem', border: '3px solid #8B5A3C' }}>
                  <CardContent className="selection-card-content flex flex-col items-center justify-center text-center" 
                               style={{ height: '100%', padding: '4rem' }}>
                    <StethoscopeIcon className="selection-card-icon mb-8 text-primary" 
                                     style={{ width: '12rem', height: '12rem' }} />
                    <CardTitle className="selection-card-title text-4xl leading-tight">
                      Buscar por Especialidad
                    </CardTitle>
                    <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
                      Encuentra médicos por su área de especialización
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Opción 2: Buscar por Médico */}
            <div className="w-full lg:w-1/2 max-w-lg">
              <Link href="/doctors/search" passHref>
                <Card className="selection-card hover:scale-105 transition-transform duration-300 cursor-pointer shadow-2xl" 
                      style={{ height: '32rem', border: '3px solid #8B5A3C' }}>
                  <CardContent className="selection-card-content flex flex-col items-center justify-center text-center" 
                               style={{ height: '100%', padding: '4rem' }}>
                    <UserSearchIcon className="selection-card-icon mb-8 text-primary" 
                                    style={{ width: '12rem', height: '12rem' }} />
                    <CardTitle className="selection-card-title text-4xl leading-tight">
                      Buscar por Médico
                    </CardTitle>
                    <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
                      Busca directamente por nombre del médico
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>

          </div>
        </div>
        
        {/* Video QR Bless animado como footer */}
        <div className="mt-20 md:mt-24 w-full px-4">
          <div className="mx-auto w-full max-w-6xl">
            <div className="relative w-full rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden" style={{ aspectRatio: '2048 / 737' }}>
              <video
                src={config.images.qrBlessVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain"
                style={{ aspectRatio: '2048 / 737' }}
              />
            </div>
          </div>
        </div>
      </div>
    </DirectorioLayout>
  )
}
