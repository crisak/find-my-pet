'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetProfile } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  pet: PetProfile
}

export default function HeroSection({ pet }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        scale: 0.5, opacity: 0, duration: 0.6, ease: 'back.out(2)', delay: 0.2,
      })
      gsap.from(photoRef.current, {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.35,
      })
      gsap.from(contentRef.current, {
        y: 25, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.6,
      })
      gsap.from(scrollHintRef.current, { opacity: 0, duration: 1, delay: 1.4 })
      gsap.to(scrollHintRef.current, {
        y: 7, duration: 1.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.7,
      })
      gsap.to(photoRef.current, {
        y: -40, ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 px-4 pt-4 pb-10"
    >
      {/* Ambient blobs */}
      <div className="absolute top-[-60px] right-[-60px] w-72 h-72 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 rounded-full bg-orange-200/35 blur-3xl pointer-events-none" />

      {/* Subtle paw prints */}
      <div className="absolute top-14 left-5 text-2xl opacity-[0.06] -rotate-[20deg] select-none pointer-events-none">🐾</div>
      <div className="absolute top-24 right-6 text-xl opacity-[0.06] rotate-[15deg] select-none pointer-events-none">🐾</div>
      <div className="absolute bottom-28 left-10 text-3xl opacity-[0.06] rotate-[25deg] select-none pointer-events-none">🐾</div>
      <div className="absolute bottom-40 right-5 text-xl opacity-[0.06] -rotate-[10deg] select-none pointer-events-none">🐾</div>

      {/* LOST badge */}
      <div
        ref={badgeRef}
        className="mb-4 relative inline-flex items-center gap-2 bg-red-500 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-red-200/60 z-10"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        MASCOTA PERDIDA
      </div>

      {/* Hero photo card */}
      <div ref={photoRef} className="w-full max-w-sm mx-auto mb-5 relative z-10">
        <div className="relative rounded-[24px] overflow-hidden shadow-2xl shadow-amber-300/40 ring-4 ring-white/70">
          {/* Photo */}
          <div className="relative aspect-[4/3] bg-amber-100">
            <Image
              src={pet.heroImage.url}
              alt={pet.heroImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, 384px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-amber-900/10 to-transparent" />
            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/75 text-[11px] font-bold uppercase tracking-widest mb-1">
                    {pet.breed} · {pet.age}
                  </p>
                  <h1 className="text-white text-[2rem] font-extrabold leading-none drop-shadow-lg">
                    {pet.name}
                  </h1>
                </div>
                <span className="text-3xl drop-shadow-md">{pet.emoji}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Message card */}
      <div
        ref={contentRef}
        className="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-amber-100/50 border border-amber-100/80 z-10"
      >
        <p className="text-center text-amber-900 leading-relaxed text-sm font-medium">
          {pet.heroMessage}
        </p>
        <div className="mt-3 pt-3 border-t border-amber-100 flex items-center justify-center gap-1.5">
          <span className="text-base">💛</span>
          <p className="text-amber-500 text-xs font-semibold">
            Gracias por ayudarme a volver a casa.
          </p>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="mt-6 flex flex-col items-center gap-1 text-amber-400/80 z-10"
      >
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase">Ver más</span>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </div>
    </section>
  )
}
