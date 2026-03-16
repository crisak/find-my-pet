'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetProfile, PetPhoto } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

interface PhotoGalleryProps {
  pet: PetProfile
}

function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: PetPhoto[]
  initialIndex: number
  onClose: () => void
}) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const prefersReducedMotion = useRef(false)

  const photo = photos[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < photos.length - 1

  const animateSlide = useCallback((direction: 'prev' | 'next') => {
    if (prefersReducedMotion.current || !contentRef.current) return
    const xOut = direction === 'next' ? -30 : 30
    const xIn = direction === 'next' ? 30 : -30
    gsap.fromTo(contentRef.current,
      { opacity: 1, x: 0 },
      { opacity: 0, x: xOut, duration: 0.15, ease: 'power2.in', onComplete: () => {
        gsap.fromTo(contentRef.current, { opacity: 0, x: xIn }, { opacity: 1, x: 0, duration: 0.2, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' })
      }}
    )
  }, [])

  const goTo = useCallback((index: number) => {
    const direction = index > currentIndex ? 'next' : 'prev'
    animateSlide(direction)
    setCurrentIndex(index)
  }, [currentIndex, animateSlide])

  const goPrev = useCallback(() => { if (hasPrev) goTo(currentIndex - 1) }, [hasPrev, currentIndex, goTo])
  const goNext = useCallback(() => { if (hasNext) goTo(currentIndex + 1) }, [hasNext, currentIndex, goTo])

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    if (!prefersReducedMotion.current) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' })
      gsap.fromTo(contentRef.current, { opacity: 0, scale: 0.95, y: 12 }, {
        opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      })
    }

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goPrev, goNext])

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-150 text-xl z-10"
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tabular-nums">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-3 md:left-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-150 z-10"
          aria-label="Foto anterior"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-3 md:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-150 z-10"
          aria-label="Foto siguiente"
        >
          ›
        </button>
      )}

      {/* Image */}
      <div
        ref={contentRef}
        className="relative max-w-lg w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const delta = touchStartX.current - e.changedTouches[0].clientX
          if (Math.abs(delta) > 40) {
            if (delta > 0) goNext()
            else goPrev()
          }
          touchStartX.current = null
        }}
      >
        <Image
          src={photo.url}
          alt={photo.alt}
          width={600}
          height={600}
          className="object-contain w-full h-auto max-h-[85vh]"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-sm font-semibold">{photo.alt}</p>
        </div>
      </div>
    </div>
  )
}

export default function PhotoGallery({ pet }: PhotoGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const handleClose = useCallback(() => setSelectedIndex(null), [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Set final state immediately when reduced motion is preferred
    if (prefersReducedMotion) {
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, y: 0 })
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.photo-card')
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 })
      }
      return
    }

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 24,
        opacity: 0,
        // [fix] Reduced from 700ms to 500ms
        duration: 0.5,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
              // [fix] Stagger reduced from 80ms to 40ms (ui-animation: stagger <= 50ms)
              stagger: 0.04,
              // [fix] Duration reduced from 650ms to 400ms
              duration: 0.4,
              ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
    <>
      {selectedIndex !== null && <Lightbox photos={pet.photos} initialIndex={selectedIndex} onClose={handleClose} />}
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
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="w-full relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-zoom-in group bg-amber-100 block"
                aria-label={`Ver ${photo.alt} en tamaño completo`}
              >
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
                {/* Zoom icon */}
                <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                  </svg>
                </div>
              </button>
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
    </>
  )
}
