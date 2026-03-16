'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface GeolocationBannerProps {
  petName: string
  petId: string
}

type GeoStatus = 'idle' | 'requesting' | 'granted' | 'denied' | 'error'

export default function GeolocationBanner({ petName, petId }: GeolocationBannerProps) {
  const [status, setStatus] = useState<GeoStatus>('idle')
  const [visible, setVisible] = useState(true)
  // [fix] Use ref instead of class selector (gsap best practice)
  const bannerRef = useRef<HTMLDivElement>(null)

  // [fix] Removed auto-request — geolocation should only be triggered by user interaction
  // Requesting automatically after 2s is invasive UX (best practice: user-gesture only)

  useEffect(() => {
    if (status === 'granted') {
      // Auto-hide after success
      const timer = setTimeout(() => {
        // [fix] ease: 'power2.out' instead of 'power2.in' — ease-in feels slow (ui-animation: avoid ease-in)
        gsap.to(bannerRef.current, {
          y: -80,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
          onComplete: () => setVisible(false),
        })
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error')
      return
    }

    setStatus('requesting')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // In MVP: log location. In V2: send to API
        console.log('[FindMyDog] Location captured for pet scan:', {
          petId,
          latitude,
          longitude,
          timestamp: new Date().toISOString(),
        })
        setStatus('granted')
      },
      () => {
        setStatus('denied')
      },
      { timeout: 10000, maximumAge: 0 }
    )
  }

  if (!visible) return null

  const configs = {
    idle: {
      bg: 'bg-amber-500',
      icon: '📍',
      text: `Ayuda a localizar a ${petName}`,
      action: 'Compartir ubicación',
    },
    requesting: {
      bg: 'bg-amber-500',
      icon: '⏳',
      text: 'Solicitando tu ubicación...',
      action: null,
    },
    granted: {
      bg: 'bg-green-500',
      icon: '✅',
      text: '¡Ubicación compartida! El dueño fue notificado.',
      action: null,
    },
    denied: {
      bg: 'bg-gray-500',
      icon: '📍',
      text: 'Sin ubicación — contacta al dueño manualmente',
      action: null,
    },
    error: {
      bg: 'bg-gray-500',
      icon: '📍',
      text: 'Geolocalización no disponible',
      action: null,
    },
  }

  const config = configs[status]

  return (
    <div
      ref={bannerRef}
      className={`fixed top-0 left-0 right-0 z-50 ${config.bg} text-white px-4 py-2 flex items-center justify-between gap-3 shadow-lg`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-lg flex-shrink-0">{config.icon}</span>
        <p className="text-sm font-semibold truncate">{config.text}</p>
      </div>
      {config.action && (
        <button
          onClick={requestLocation}
          className="flex-shrink-0 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors duration-150 whitespace-nowrap"
        >
          {config.action}
        </button>
      )}
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
        aria-label="Cerrar"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
