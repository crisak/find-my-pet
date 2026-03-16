'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'
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

// ─── Pause/Play button ────────────────────────────────────────────────────────
function VideoPauseButton({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
      className="absolute bottom-[88px] md:bottom-8 right-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-black/50 transition-colors duration-150"
    >
      {isPlaying ? (
        // Pause icon
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
        </svg>
      ) : (
        // Play icon
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 translate-x-[1px]">
          <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
        </svg>
      )}
    </button>
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

        {/* [change] More blur: backdrop-blur-md → backdrop-blur-xl, bg opacity 15% → 25% */}
        <div
          ref={cardRef}
          className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-2xl"
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
  const [isPlaying, setIsPlaying] = useState(true)
  useVideoAutoPlay(videoRef)

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

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
      {!videoFailed && <VideoPauseButton isPlaying={isPlaying} onToggle={togglePlay} />}
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
  const [isPlaying, setIsPlaying] = useState(true)
  useVideoAutoPlay(backdropRef)
  useVideoAutoPlay(mainVideoRef)

  const video = pet.heroVideo!

  const togglePlay = useCallback(() => {
    const main = mainVideoRef.current
    const backdrop = backdropRef.current
    if (!main) return
    if (main.paused) {
      main.play().catch(() => {})
      backdrop?.play().catch(() => {})
      setIsPlaying(true)
    } else {
      main.pause()
      backdrop?.pause()
      setIsPlaying(false)
    }
  }, [])

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
      {!videoFailed && <VideoPauseButton isPlaying={isPlaying} onToggle={togglePlay} />}
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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Set final state immediately when reduced motion is preferred
    if (prefersReducedMotion) {
      gsap.set([badgeRef.current, mediaRef.current, overlayContentRef.current, cardRef.current, scrollHintRef.current], { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // [fix] Badge from scale(0.95) — never below 0.95 (emilkowal: transform-never-scale-zero)
      gsap.from(badgeRef.current, {
        scale: 0.95, opacity: 0, duration: 0.5, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: 0.3,
      })
      gsap.from(mediaRef.current, {
        scale: 1.04, opacity: 0, duration: 0.6, ease: 'cubic-bezier(0.25, 1, 0.5, 1)', delay: 0.1,
      })
      gsap.from(overlayContentRef.current, {
        y: 24, opacity: 0, duration: 0.5, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: 0.4,
      })
      gsap.from(cardRef.current, {
        y: 28, opacity: 0, duration: 0.45, ease: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: 0.55,
      })
      gsap.from(scrollHintRef.current, { opacity: 0, duration: 0.6, delay: 1.2 })

      // [fix] Pause infinite loop when hero is off-screen (ui-animation: pause looping off-screen)
      let scrollHintTween: gsap.core.Tween | null = null
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          scrollHintTween = gsap.to(scrollHintRef.current, {
            y: 8, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5,
          })
        },
        onLeave: () => scrollHintTween?.pause(),
        onEnterBack: () => scrollHintTween?.resume(),
        onLeaveBack: () => scrollHintTween?.pause(),
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
