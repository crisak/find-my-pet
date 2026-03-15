'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PetPageClient() {
  useEffect(() => {
    // Smooth scroll behavior
    ScrollTrigger.refresh()
    window.scrollTo({ top: 0 })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return null
}
