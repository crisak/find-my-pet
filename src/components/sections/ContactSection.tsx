'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { PetProfile } from '@/lib/mock-data'

gsap.registerPlugin(ScrollTrigger)

interface ContactSectionProps {
  pet: PetProfile
}

// WhatsApp SVG icon
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function ContactSection({ pet }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title — immediateRender:false prevents opacity:0 being set before trigger fires
      gsap.fromTo(
        '.contact-title',
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.contact-title',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          immediateRender: false,
        }
      )

      // Buttons — key fix: immediateRender:false so they stay visible if trigger misses
      gsap.fromTo(
        '.contact-btn',
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.contact-btn-group',
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.55,
          ease: 'power2.out',
          immediateRender: false,
        }
      )

      // Owner card
      gsap.fromTo(
        '.owner-card',
        { y: 16, opacity: 0 },
        {
          scrollTrigger: {
            trigger: '.owner-card',
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
          immediateRender: false,
        }
      )

      // Pulse ring on phone button
      gsap.to('.pulse-ring', {
        scale: 1.5,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.out',
        repeat: -1,
        delay: 1.5,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCall = () => {
    window.location.href = `tel:${pet.owner.phone}`
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola! Encontré a ${pet.name} 🐶. ¿Puedes decirme cómo lo puedo regresar a casa?`
    )
    window.open(`https://wa.me/${pet.owner.whatsapp}?text=${message}`, '_blank')
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`Encontré a ${pet.name}`)
    const body = encodeURIComponent(
      `Hola ${pet.owner.name},\n\nEncontré a ${pet.name} y me gustaría ayudar a que regrese a casa.\n\nPor favor contáctame para coordinar.\n\nGracias.`
    )
    window.location.href = `mailto:${pet.owner.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      {/* ── Main contact section ───────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative py-12 px-4 pb-28 md:pb-16 bg-gradient-to-b from-amber-50 to-amber-100 overflow-hidden"
      >
        {/* Background paws */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none overflow-hidden select-none">
          <div className="absolute text-[160px] top-8 left-[-20px] rotate-[-20deg]">🐾</div>
          <div className="absolute text-[130px] bottom-8 right-[-10px] rotate-[15deg]">🐾</div>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Section title */}
          <div className="contact-title text-center mb-7">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 text-3xl mb-4">
              📞
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-2">
              Contacta a mi familia
            </h2>
            <p className="text-amber-600 font-medium text-base">
              Están esperando noticias. ¡Cualquier ayuda cuenta!
            </p>
            <div className="mt-4 mx-auto w-16 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" />
          </div>

          {/* ── 3 contact buttons ──────────────────────────────────────── */}
          <div className="contact-btn-group flex flex-col gap-4">

            {/* 1. PHONE CALL */}
            <button
              onClick={handleCall}
              className="contact-btn group relative w-full flex items-center gap-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-2xl px-5 py-4 shadow-lg shadow-orange-200 transition-all duration-200 active:scale-[0.98] overflow-hidden"
            >
              {/* Pulse ring */}
              <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center">
                <span className="pulse-ring absolute inline-flex w-12 h-12 rounded-full bg-white/30" />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </span>
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-extrabold text-base leading-tight">Llamar ahora</div>
                <div className="text-orange-100 text-sm mt-0.5 font-mono">{pet.owner.phone}</div>
              </div>
              <div className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>

            {/* 2. WHATSAPP */}
            <button
              onClick={handleWhatsApp}
              className="contact-btn group w-full flex items-center gap-4 bg-[#25D366] hover:bg-[#20ba58] active:bg-[#1aad50] text-white rounded-2xl px-5 py-4 shadow-lg shadow-green-200 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                <WhatsAppIcon />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-extrabold text-base leading-tight">WhatsApp</div>
                <div className="text-green-100 text-sm mt-0.5">Enviar mensaje directo</div>
              </div>
              <div className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>

            {/* 3. EMAIL */}
            <button
              onClick={handleEmail}
              className="contact-btn group w-full flex items-center gap-4 bg-white hover:bg-amber-50 active:bg-amber-100 text-amber-900 border-2 border-amber-200 hover:border-amber-300 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-amber-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-amber-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="font-extrabold text-base leading-tight text-amber-900">Enviar Email</div>
                <div className="text-amber-500 text-sm mt-0.5 truncate">{pet.owner.email}</div>
              </div>
              <div className="text-amber-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform duration-200">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
          </div>

          {/* Owner card */}
          <div className="owner-card mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-amber-100 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              👤
            </div>
            <div className="min-w-0">
              <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-0.5">
                Dueño de {pet.name}
              </div>
              <div className="text-amber-900 font-bold text-sm truncate">{pet.owner.name}</div>
            </div>
          </div>

          {/* Thank you */}
          <div className="mt-6 text-center">
            <p className="text-amber-600 text-sm font-semibold">💛 Muchas gracias por tu ayuda y bondad.</p>
            <p className="text-amber-400 text-xs mt-1">Personas como tú hacen del mundo un lugar mejor 🌟</p>
          </div>
        </div>
      </section>

      {/* ── Sticky floating bar (mobile) ──────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-amber-100 shadow-2xl shadow-amber-200/50 md:hidden">
        <div className="flex gap-2 max-w-sm mx-auto">
          <button
            onClick={handleCall}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2.5 font-bold text-xs active:scale-95 transition-all shadow-md shadow-orange-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Llamar
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20ba58] text-white rounded-xl py-2.5 font-bold text-xs active:scale-95 transition-all shadow-md shadow-green-200"
          >
            <WhatsAppIcon />
            WhatsApp
          </button>
          <button
            onClick={handleEmail}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl py-2.5 font-bold text-xs active:scale-95 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Email
          </button>
        </div>
      </div>
    </>
  )
}
