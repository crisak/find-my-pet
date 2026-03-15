import { NextResponse } from 'next/server'
import { getPetById } from '@/lib/mock-data'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const pet = getPetById(id)

  if (!pet) {
    return NextResponse.json(
      { error: 'Perfil de mascota no encontrado', id },
      { status: 404 }
    )
  }

  return NextResponse.json(pet, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
