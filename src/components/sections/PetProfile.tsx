'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetProfile } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

interface PetProfileProps {
  pet: PetProfile
}

const INFO_ITEMS = [
  { icon: '🐾', label: 'Nombre', key: 'name' },
  { icon: '🦴', label: 'Raza', key: 'breed' },
  { icon: '🎂', label: 'Edad', key: 'age' },
  { icon: '🎨', label: 'Color', key: 'color' },
  { icon: '⚖️', label: 'Peso', key: 'weight' },
  { icon: '📅', label: 'Nacimiento', key: 'birthDate' },
] as const

export default function PetProfile({ pet }: PetProfileProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Set final state immediately when reduced motion is preferred
    if (prefersReducedMotion) {
      gsap.set(['.profile-title', '.info-card', '.characteristics-card'], { opacity: 1, x: 0, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.profile-title',
        { x: -28, opacity: 0 },
        {
          scrollTrigger: { trigger: '.profile-title', start: 'top 90%', toggleActions: 'play none none none' },
          x: 0,
          opacity: 1,
          // [fix] Reduced from 700ms to 500ms
          duration: 0.5,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          immediateRender: false,
        }
      )

      const cards = document.querySelectorAll('.info-card')
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: i % 2 === 0 ? -20 : 20, opacity: 0 },
          {
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
            x: 0,
            opacity: 1,
            // [fix] Reduced from 550ms to 350ms; stagger delay reduced
            duration: 0.35,
            delay: i * 0.04,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
            immediateRender: false,
          }
        )
      })

      gsap.fromTo(
        '.characteristics-card',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: { trigger: '.characteristics-card', start: 'top 92%', toggleActions: 'play none none none' },
          y: 0,
          opacity: 1,
          // [fix] Reduced from 700ms to 450ms
          duration: 0.45,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          immediateRender: false,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-12 px-4 bg-gradient-to-b from-orange-50 to-amber-50 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute top-10 right-0 w-48 h-48 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-xl mx-auto">
        {/* Section title */}
        <div className="profile-title mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900">
                Mi Perfil
              </h2>
              <p className="text-amber-600 font-medium text-sm mt-0.5">
                Información para identificarme
              </p>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {INFO_ITEMS.map((item) => (
            <div
              key={item.key}
              className="info-card bg-white rounded-2xl p-4 shadow-sm border border-amber-100/80 hover:shadow-md hover:border-amber-200 transition-shadow duration-200"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-amber-500 font-semibold uppercase tracking-wide mb-0.5">
                {item.label}
              </div>
              <div className="text-amber-900 font-bold text-base">
                {item.key === 'birthDate'
                  ? new Date(pet.birthDate + 'T12:00:00').toLocaleDateString('es-CO', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : (pet[item.key as keyof PetProfile] as string)}
              </div>
            </div>
          ))}
        </div>

        {/* Characteristics */}
        <div className="characteristics-card bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-200/60 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✨</span>
            <span className="text-sm font-bold text-amber-700 uppercase tracking-wide">
              Características
            </span>
          </div>
          <p className="text-amber-900 leading-relaxed text-base font-medium">
            {pet.characteristics}
          </p>
        </div>

        {/* Emotional callout */}
        <div className="mt-5 bg-amber-400/10 rounded-2xl p-4 border-l-4 border-amber-400">
          <p className="text-amber-800 text-sm font-semibold text-center">
            🏠 Mi familia me extraña mucho y me está buscando.
            <br />
            <span className="font-normal text-amber-700">
              Si me encuentras, por favor contáctalos.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
