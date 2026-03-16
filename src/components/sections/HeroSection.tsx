'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetProfile } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
  pet: PetProfile
}

// ─── Force-play a video element (autoPlay attr isn't always enough) ───────────
function useVideoAutoPlay(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true // must be set before play() for autoplay policy
    video.play().catch(() => {
      // Autoplay was blocked — nothing to do, poster will show
    })
  }, [ref])
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

// ─── Shared overlay content ───────────────────────────────────────────────────
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

      <div className="flex-1" />

      {/* Bottom: name + message card */}
      <div className="relative z-20 px-4 pb-24 md:pb-6 flex flex-col gap-3 max-w-lg mx-auto w-full">
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

        <div ref={scrollHintRef} className="flex flex-col items-center pt-1 text-white/50">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </>
  )
}

// ─── Horizontal video layout ──────────────────────────────────────────────────
function HorizontalVideoHero({
  pet, mediaRef, heroRef, badgeRef, overlayContentRef, cardRef, scrollHintRef,
}: HeroLayoutProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  useVideoAutoPlay(videoRef)

  return (
    <section ref={heroRef} className="relative min-h-[95dvh] flex flex-col overflow-hidden bg-black">
      <div ref={mediaRef} className="absolute inset-0 z-0">
        {!videoFailed ? (
          <video
            ref={videoRef}
            src={pet.heroVideo!.url}
            poster={pet.heroVideo!.poster}
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
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
      <HeroOverlay pet={pet} badgeRef={badgeRef} overlayContentRef={overlayContentRef} cardRef={cardRef} scrollHintRef={scrollHintRef} />
    </section>
  )
}

// ─── Vertical video layout ────────────────────────────────────────────────────
function VerticalVideoHero({
  pet, mediaRef, heroRef, badgeRef, overlayContentRef, cardRef, scrollHintRef,
}: HeroLayoutProps) {
  const backdropRef = useRef<HTMLVideoElement>(null)
  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  useVideoAutoPlay(backdropRef)
  useVideoAutoPlay(mainVideoRef)

  const video = pet.heroVideo!

  return (
    <section ref={heroRef} className="relative min-h-[95dvh] flex flex-col overflow-hidden bg-black">

      {videoFailed ? (
        /* Fallback to hero image if video fails to load */
        <div className="absolute inset-0 z-0">
          <Image src={pet.heroImage.url} alt={pet.heroImage.alt} fill className="object-cover object-center" priority sizes="100vw" />
        </div>
      ) : (
        <>
          {/* Blurred backdrop — fills gaps on wide screens */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={backdropRef}
              src={video.url}
              poster={video.poster}
              muted
              loop
              playsInline
              aria-hidden
              onError={() => setVideoFailed(true)}
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ filter: 'blur(28px) brightness(0.35) saturate(1.4)' }}
            />
          </div>

          {/* Centered portrait video */}
          <div ref={mediaRef} className="absolute inset-0 z-0 flex items-center justify-center">
            <video
              ref={mainVideoRef}
              src={video.url}
              poster={video.poster}
              muted
              loop
              playsInline
              onError={() => setVideoFailed(true)}
              className="h-full w-auto max-w-full object-cover"
              style={{ aspectRatio: '9/16' }}
            />
          </div>

          {/* Side vignette on wide screens */}
          <div
            className="absolute inset-0 z-10 pointer-events-none hidden md:block"
            style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.55) 100%)' }}
          />
        </>
      )}

      <GradientOverlays />
      <HeroOverlay pet={pet} badgeRef={badgeRef} overlayContentRef={overlayContentRef} cardRef={cardRef} scrollHintRef={scrollHintRef} />
    </section>
  )
}

// ─── Image-only layout (no heroVideo defined) ─────────────────────────────────
function ImageHero({
  pet, mediaRef, heroRef, badgeRef, overlayContentRef, cardRef, scrollHintRef,
}: HeroLayoutProps) {
  return (
    <section ref={heroRef} className="relative min-h-[95dvh] flex flex-col overflow-hidden bg-black">
      <div ref={mediaRef} className="absolute inset-0 z-0">
        <Image
          src={pet.heroImage.url}
          alt={pet.heroImage.alt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <GradientOverlays />
      <HeroOverlay pet={pet} badgeRef={badgeRef} overlayContentRef={overlayContentRef} cardRef={cardRef} scrollHintRef={scrollHintRef} />
    </section>
  )
}

// ─── Shared layout prop type ──────────────────────────────────────────────────
interface HeroLayoutProps {
  pet: PetProfile
  mediaRef: React.RefObject<HTMLDivElement | null>
  heroRef: React.RefObject<HTMLDivElement | null>
  badgeRef: React.RefObject<HTMLDivElement | null>
  overlayContentRef: React.RefObject<HTMLDivElement | null>
  cardRef: React.RefObject<HTMLDivElement | null>
  scrollHintRef: React.RefObject<HTMLDivElement | null>
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HeroSection({ pet }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const overlayContentRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  const hasVideo = !!pet.heroVideo
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
      // Parallax only for non-vertical (vertical video stays centered)
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

  const layoutProps: HeroLayoutProps = {
    pet, mediaRef, heroRef, badgeRef, overlayContentRef, cardRef, scrollHintRef,
  }

  // heroVideo always takes priority over heroImage when defined
  if (hasVideo && isVertical) return <VerticalVideoHero {...layoutProps} />
  if (hasVideo) return <HorizontalVideoHero {...layoutProps} />
  return <ImageHero {...layoutProps} />
}
