import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DirectorioLayout } from "@/components/directorio-layout"
import { BannerCarousel } from "@/components/banner-carousel"
import { SearchIcon } from 'lucide-react'
import { config } from "@/lib/config"

export default function HomePage() {
  return (
    <DirectorioLayout showBackButton={false}>
      <div className="flex flex-col items-center justify-center h-full w-full text-center">
        {/* Card de bienvenida */}
        <div className="w-full max-w-6xl bg-white/95 border border-gray-200 rounded-3xl shadow-xl px-8 md:px-14 pt-16 md:pt-20 pb-12 md:pb-14 mb-12">
          {/* Logo HTQ en la parte superior */}
          <Image src={config.images.aplicativoLogo} alt="Logo HTQ" width={200} height={200} className="mb-10 mx-auto" />

          {/* Imagen del edificio */}
          <Image
            src={config.images.homeline}
            alt="Edificio Médico"
            width={800}
            height={380}
            className="mb-14 object-contain mx-auto"
          />

          {/* Botón "Encuentra a tu doctor" - ahora lleva a la pantalla de selección */}
          <Link href="/selection" passHref>
            <Button className="bg-primary text-primary-foreground hover:bg-accent1 text-5xl px-24 py-14 rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 inline-flex items-center gap-5">
              <SearchIcon className="w-12 h-12" />
              Encuentra a tu doctor
            </Button>
          </Link>
        </div>
        {/* Carrusel de banners automático */}
        <div className="mt-20 md:mt-24 w-full px-4">
          <div className="mx-auto w-full max-w-6xl">
            <BannerCarousel />
          </div>
        </div>
      </div>
    </DirectorioLayout>
  )
}
