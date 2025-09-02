"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { config } from '@/lib/config'

interface BannerCarouselProps {
  className?: string
}

export function BannerCarousel({ className }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Array de banners - solo incluir los que tienen URLs válidas
  const allBanners = [
    {
      src: config.images.banner,
      alt: "Banner principal - Encuentra a tu especialista en nuestro Directorio Médico"
    },
    {
      src: config.images.banner2,
      alt: "Banner secundario - Servicios médicos especializados"
    },
    {
      src: config.images.banner3,
      alt: "Banner terciario - Atención médica de calidad"
    }
  ]
  
  // Filtrar banners con URLs válidas (no vacías)
  const banners = allBanners.filter(banner => banner.src && banner.src.trim() !== '')

  // Efecto para el carrusel automático
  useEffect(() => {
    if (banners.length <= 1) return // No necesita carrusel si hay 1 o menos banners
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [banners.length])

  // Si no hay banners válidos, no renderizar nada
  if (banners.length === 0) {
    return null
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 ${className}`}>
      {/* Contenedor del carrusel */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          aspectRatio: '2048 / 737'
        }}
      >
        {banners.map((banner, index) => (
          <div 
            key={index}
            className="w-full flex-shrink-0 relative"
            style={{ aspectRatio: '2048 / 737' }}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              className="object-contain"
              priority={index === 0} // Solo el primer banner tiene prioridad
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
        ))}
      </div>

      {/* Indicadores pequeños y discretos (opcional, solo visual) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white shadow-lg' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
