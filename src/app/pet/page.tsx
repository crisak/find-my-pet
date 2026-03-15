import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPetById, DEFAULT_PET_ID } from '@/lib/mock-data'
import HeroSection from '@/components/sections/HeroSection'
import CinematicSection from '@/components/sections/CinematicSection'
import PhotoGallery from '@/components/sections/PhotoGallery'
import PetProfile from '@/components/sections/PetProfile'
import ContactSection from '@/components/sections/ContactSection'
import GeolocationBanner from '@/components/GeolocationBanner'
import PetPageClient from './PetPageClient'

interface PageProps {
  searchParams: Promise<{ id?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const id = params.id ?? DEFAULT_PET_ID
  const pet = getPetById(id)

  if (!pet) {
    return { title: 'Mascota no encontrada — FindMyDog' }
  }

  return {
    title: `${pet.name} está perdido/a — ¡Ayúdalo a volver a casa!`,
    description: pet.heroMessage,
    openGraph: {
      title: `${pet.name} está perdido/a`,
      description: '¡Por favor ayuda a esta mascota a volver a casa!',
    },
  }
}

export default async function PetPage({ searchParams }: PageProps) {
  const params = await searchParams
  const id = params.id ?? DEFAULT_PET_ID
  const pet = getPetById(id)

  if (!pet) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-amber-50">
      {/* Geolocation banner — client component */}
      <Suspense fallback={null}>
        <GeolocationBanner petName={pet.name} petId={pet.id} />
      </Suspense>

      {/* pt-11 accounts for the geolocation banner height (44px) */}
      <div className="pt-11">
        <HeroSection pet={pet} />
        <CinematicSection pet={pet} />
        <PhotoGallery pet={pet} />
        <PetProfile pet={pet} />
        <ContactSection pet={pet} />
      </div>

      {/* Footer — pb-24 ensures content isn't hidden behind mobile sticky bar */}
      <footer className="bg-amber-900 text-amber-200 text-center py-5 px-4 pb-28 md:pb-5">
        <p className="text-sm font-medium">
          🐾 FindMyDog — Ayudando a mascotas a volver a casa
        </p>
        <p className="text-xs text-amber-400 mt-1">
          ID de perfil: <span className="font-mono text-[10px]">{pet.id}</span>
        </p>
      </footer>

      {/* Client-side scroll restore */}
      <PetPageClient />
    </main>
  )
}
