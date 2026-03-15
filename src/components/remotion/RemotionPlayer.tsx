'use client'

import { Player } from '@remotion/player'
import PetIntroComposition from './PetIntroComposition'

interface RemotionPlayerProps {
  petName: string
  petEmoji: string
}

export default function RemotionPlayer({ petName, petEmoji }: RemotionPlayerProps) {
  return (
    <Player
      component={PetIntroComposition}
      inputProps={{ petName, petEmoji }}
      durationInFrames={150}
      compositionWidth={600}
      compositionHeight={400}
      fps={30}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
      acknowledgeRemotionLicense
    />
  )
}
