'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetProfile } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

interface PhotoGalleryProps {
  pet: PetProfile
}

export default function PhotoGallery({ pet }: PhotoGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      // Grid items stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.photo-card')
        ScrollTrigger.batch(cards, {
          onEnter: (elements) => {
            gsap.to(elements, {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.65,
              ease: 'back.out(1.4)',
              overwrite: true,
            })
          },
          start: 'top 88%',
          once: true,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-12 px-4 bg-gradient-to-b from-amber-100 to-orange-50 overflow-hidden"
    >
      {/* Background paws */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
        <div className="absolute text-[200px] top-[-40px] right-[-40px]">🐾</div>
        <div className="absolute text-[160px] bottom-[-30px] left-[-30px]">🐾</div>
      </div>

      <div className="max-w-xl mx-auto">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-7">
          <span className="inline-block text-3xl mb-3">📸</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-2">
            Así soy yo
          </h2>
          <p className="text-amber-600 font-medium text-base">
            ¿Me reconoces? ¡Ayúdame a volver a casa!
          </p>
          <div className="mt-4 mx-auto w-16 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400" />
        </div>

        {/* Photo grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {pet.photos.map((photo, index) => (
            <div
              key={index}
              className="photo-card"
              style={{ opacity: 0, transform: 'translateY(28px) scale(0.95)' }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group bg-amber-100">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay with label */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-semibold">{photo.alt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun fact */}
        <div className="mt-10 bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-amber-100 text-center shadow-sm">
          <p className="text-amber-800 text-sm font-medium">
            🐾 <strong>{pet.name}</strong> nació el{' '}
            {new Date(pet.birthDate + 'T12:00:00').toLocaleDateString('es-CO', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}{' '}
            — tiene {pet.age} y ya robó todos los corazones 💛
          </p>
        </div>
      </div>
    </section>
  )
}
