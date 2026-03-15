'use client'

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

interface PetIntroProps {
  petName: string
  petEmoji: string
  primaryColor?: string
}

const PAW_POSITIONS = [
  { x: 10, y: 80, delay: 0, rotate: -15 },
  { x: 85, y: 15, delay: 8, rotate: 20 },
  { x: 20, y: 30, delay: 15, rotate: -5 },
  { x: 75, y: 70, delay: 5, rotate: 10 },
  { x: 50, y: 10, delay: 12, rotate: -20 },
  { x: 5, y: 55, delay: 3, rotate: 30 },
  { x: 90, y: 45, delay: 18, rotate: -10 },
  { x: 40, y: 85, delay: 7, rotate: 15 },
]

export default function PetIntroComposition({
  petName,
  petEmoji,
  primaryColor = '#F97316',
}: PetIntroProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Background warm pulse
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' })

  // Main emoji entrance (spring)
  const emojiScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  })
  const emojiY = interpolate(frame, [10, 50], [60, 0], { extrapolateRight: 'clamp' })

  // Name entrance
  const nameOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' })
  const nameScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.6 },
  })

  // Subtitle entrance
  const subtitleOpacity = interpolate(frame, [65, 90], [0, 1], { extrapolateRight: 'clamp' })
  const subtitleY = interpolate(frame, [65, 90], [20, 0], { extrapolateRight: 'clamp' })

  // Heart pulse at end
  const heartScale = interpolate(
    (frame - 90) % 30,
    [0, 10, 20],
    [1, 1.3, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #FFFBF2 0%, #FEF3C7 50%, #FDE68A 100%)`,
        opacity: bgOpacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Floating paw prints */}
      {PAW_POSITIONS.map((paw, i) => {
        const pawOpacity = interpolate(frame, [paw.delay, paw.delay + 20], [0, 0.15], {
          extrapolateRight: 'clamp',
        })
        const pawY = interpolate(frame, [paw.delay, paw.delay + 120], [0, -30], {
          extrapolateRight: 'clamp',
        })
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${paw.x}%`,
              top: `${paw.y}%`,
              opacity: pawOpacity,
              transform: `translateY(${pawY}px) rotate(${paw.rotate}deg)`,
              fontSize: 28,
              pointerEvents: 'none',
            }}
          >
            🐾
          </div>
        )
      })}

      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `${primaryColor}15`,
          top: -80,
          right: -80,
          opacity: bgOpacity,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `${primaryColor}10`,
          bottom: -50,
          left: -50,
          opacity: bgOpacity,
        }}
      />

      {/* Main pet emoji */}
      <div
        style={{
          fontSize: 90,
          transform: `scale(${emojiScale}) translateY(${emojiY}px)`,
          marginBottom: 16,
          filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))',
        }}
      >
        {petEmoji}
      </div>

      {/* Pet name */}
      <div
        style={{
          opacity: nameOpacity,
          transform: `scale(${nameScale})`,
          fontSize: 52,
          fontWeight: 800,
          color: '#1C0A00',
          textAlign: 'center',
          letterSpacing: '-1px',
          textShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        {petName}
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            transform: `scale(${frame > 90 ? heartScale : 1})`,
            fontSize: 22,
            display: 'inline-block',
          }}
        >
          💛
        </span>
        <span
          style={{
            fontSize: 20,
            color: '#92400E',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          Necesito tu ayuda
        </span>
        <span
          style={{
            transform: `scale(${frame > 90 ? heartScale : 1})`,
            fontSize: 22,
            display: 'inline-block',
          }}
        >
          💛
        </span>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${primaryColor}, #FCD34D, ${primaryColor})`,
          opacity: interpolate(frame, [100, 120], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />
    </AbsoluteFill>
  )
}
