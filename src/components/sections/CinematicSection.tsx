'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetProfile } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

const RemotionPlayer = dynamic(() => import('@/components/remotion/RemotionPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-amber-100">
      <span className="text-4xl animate-bounce">🐾</span>
    </div>
  ),
})

export default function CinematicSection({ pet }: { pet: PetProfile }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, scale: 0.97 },
        {
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          immediateRender: false,
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="px-4 py-6 bg-gradient-to-b from-amber-50 to-amber-100">
      <div
        ref={wrapperRef}
        className="max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl shadow-amber-200/50 ring-2 ring-amber-200/40"
        style={{ aspectRatio: '600/400' }}
      >
        <RemotionPlayer petName={pet.name} petEmoji={pet.emoji} />
      </div>
      <p className="text-center text-amber-500 text-xs font-semibold mt-3 tracking-wide">
        ✨ {pet.name} te necesita
      </p>
    </div>
  )
}
