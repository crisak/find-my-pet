import { redirect } from 'next/navigation'
import { DEFAULT_PET_ID } from '@/lib/mock-data'

export default function Home() {
  redirect(`/pet?id=${DEFAULT_PET_ID}`)
}
