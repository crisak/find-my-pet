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

// ─── Shared overlay content (badge, name, message) ───────────────────────────
function HeroOverlay({
  pet,
  badgeRef,
  overlayContentRef,
  cardRef,
  scrollHintRef,
}: {
  pet: PetProfile
  badgeRef: React.RefObject<HTMLDivElement | null>
  overlayContentRef: React.RefObject<HTMLDivElement | null>
  cardRef: React.RefObject<HTMLDivElement | null>
  scrollHintRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <>
      {/* LOST badge — top center */}
      <div className="relative z-20 flex justify-center pt-5 px-4">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 bg-red-500 text-white px-5 py-2.5 rounded-full text-sm font-black tracking-wide shadow-2xl shadow-red-900/40"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          MASCOTA PERDIDA
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom: name + message card */}
      <div className="relative z-20 px-4 pb-6 flex flex-col gap-3 max-w-lg mx-auto w-full">
        {/* Pet name + breed */}
        <div ref={overlayContentRef} className="px-1">
          <p className="text-white/70 text-[11px] font-bold uppercase tracking-[0.18em] mb-1">
            {pet.breed} · {pet.age}
          </p>
          <div className="flex items-end justify-between gap-3">
            <h1 className="text-white text-[2.6rem] font-black leading-none drop-shadow-xl">
              {pet.name}
            </h1>
            <span className="text-4xl drop-shadow-lg flex-shrink-0 pb-1">{pet.emoji}</span>
          </div>
        </div>

        {/* Message card — glassmorphism */}
        <div
          ref={cardRef}
          className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 shadow-2xl"
        >
          <p className="text-white/95 leading-relaxed text-sm font-medium">
            {pet.heroMessage}
          </p>
          <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2">
            <span className="text-base flex-shrink-0">💛</span>
            <p className="text-amber-200 text-xs font-semibold">
              Gracias por ayudarme a volver a casa.
            </p>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          className="flex flex-col items-center pt-1 text-white/50"
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </>
  )
}

// ─── Gradient overlays (shared) ───────────────────────────────────────────────
function GradientOverlays() {
  return (
    <>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-tr from-amber-900/20 via-transparent to-orange-900/10 pointer-events-none" />
    </>
  )
}

// ─── Horizontal video / image layout ─────────────────────────────────────────
// Video fills the full screen (object-cover). Works great for 16:9 landscape.
function HorizontalHero({
  pet,
  mediaRef,
  heroRef,
  badgeRef,
  overlayContentRef,
  cardRef,
  scrollHintRef,
}: {
  pet: PetProfile
  mediaRef: React.RefObject<HTMLDivElement | null>
  heroRef: React.RefObject<HTMLDivElement | null>
  badgeRef: React.RefObject<HTMLDivElement | null>
  overlayContentRef: React.RefObject<HTMLDivElement | null>
  cardRef: React.RefObject<HTMLDivElement | null>
  scrollHintRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <section
      ref={heroRef}
      className="relative min-h-[95dvh] flex flex-col overflow-hidden bg-black"
    >
      {/* Full-bleed media */}
      <div ref={mediaRef} className="absolute inset-0 z-0">
        {pet.heroVideo ? (
          <video
            src={pet.heroVideo.url}
            poster={pet.heroVideo.poster ?? pet.heroImage.url}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <Image
            src={pet.heroImage.url}
            alt={pet.heroImage.alt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        )}
      </div>

      <GradientOverlays />

      <HeroOverlay
        pet={pet}
        badgeRef={badgeRef}
        overlayContentRef={overlayContentRef}
        cardRef={cardRef}
        scrollHintRef={scrollHintRef}
      />
    </section>
  )
}

// ─── Vertical video layout ────────────────────────────────────────────────────
// Blurred video fills the screen → actual video centered at correct 9:16 ratio.
// On mobile (portrait): the centered video fills the entire screen naturally.
// On desktop (landscape): centered portrait strip with cinematic blur on sides.
function VerticalVideoHero({
  pet,
  mediaRef,
  heroRef,
  badgeRef,
  overlayContentRef,
  cardRef,
  scrollHintRef,
}: {
  pet: PetProfile
  mediaRef: React.RefObject<HTMLDivElement | null>
  heroRef: React.RefObject<HTMLDivElement | null>
  badgeRef: React.RefObject<HTMLDivElement | null>
  overlayContentRef: React.RefObject<HTMLDivElement | null>
  cardRef: React.RefObject<HTMLDivElement | null>
  scrollHintRef: React.RefObject<HTMLDivElement | null>
}) {
  const video = pet.heroVideo!
  return (
    <section
      ref={heroRef}
      className="relative min-h-[95dvh] flex flex-col overflow-hidden bg-black"
    >
      {/* ── Blurred backdrop (fills gaps on wide screens) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src={video.url}
          poster={video.poster ?? pet.heroImage.url}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: 'blur(28px) brightness(0.35) saturate(1.4)' }}
        />
      </div>

      {/* ── Centered portrait video ── */}
      <div
        ref={mediaRef}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <video
          src={video.url}
          poster={video.poster ?? pet.heroImage.url}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-auto max-w-full object-cover"
          style={{ aspectRatio: '9/16' }}
        />
      </div>

      {/* Subtle side vignette to blend centered video into backdrop */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <GradientOverlays />

      <HeroOverlay
        pet={pet}
        badgeRef={badgeRef}
        overlayContentRef={overlayContentRef}
        cardRef={cardRef}
        scrollHintRef={scrollHintRef}
      />
    </section>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroSection({ pet }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const overlayContentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  const isVertical = pet.heroVideo?.orientation === 'vertical'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(badgeRef.current, {
        scale: 0.4, opacity: 0, duration: 0.7, ease: 'back.out(2.5)', delay: 0.3,
      })
      gsap.from(mediaRef.current, {
        scale: 1.06, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.1,
      })
      gsap.from(overlayContentRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.55,
      })
      gsap.from(cardRef.current, {
        y: 40, opacity: 0, duration: 0.75, ease: 'power3.out', delay: 0.75,
      })
      gsap.from(scrollHintRef.current, { opacity: 0, duration: 1, delay: 1.5 })
      gsap.to(scrollHintRef.current, {
        y: 8, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.8,
      })
      // Parallax — only for image and horizontal video (vertical uses centered container)
      if (!isVertical) {
        gsap.to(mediaRef.current, {
          y: -60, ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [isVertical])

  const sharedProps = {
    pet,
    mediaRef,
    heroRef,
    badgeRef,
    overlayContentRef,
    cardRef,
    scrollHintRef,
  }

  if (isVertical) {
    return <VerticalVideoHero {...sharedProps} />
  }

  return <HorizontalHero {...sharedProps} />
}
