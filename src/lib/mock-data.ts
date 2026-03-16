export interface PetOwner {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface PetPhoto {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeroVideo {
  url: string; // Direct video URL (mp4, webm, etc.)
  orientation: "horizontal" | "vertical"; // Horizontal = 16:9 landscape, Vertical = 9:16 portrait
  poster?: string; // Optional thumbnail shown before video loads
}

export interface PetProfile {
  id: string;
  name: string;
  birthDate: string; // ISO date string
  age: string; // human-readable
  breed: string;
  color: string;
  weight: string;
  characteristics: string;
  emoji: string;
  heroMessage: string;
  heroImage: PetPhoto;
  heroVideo?: HeroVideo; // Optional — if present, video is shown in hero instead of image
  photos: PetPhoto[];
  owner: PetOwner;
}

// ---------------------------------------------------------------------------
// Mock pet profiles
// Images: placedog.net (real dog photos — replace with Toby's actual photos)
// ---------------------------------------------------------------------------
const MOCK_PETS: Record<string, PetProfile> = {
  // ── Toby Romero ──────────────────────────────────────────────────────────
  "550e8400-e29b-41d4-a716-446655440000": {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Toby Romero",
    birthDate: "2025-12-02",
    age: "3 meses",
    breed: "Criollo",
    color: "Café / Blaco / Negro",
    weight: "~4 kg (cachorro)",
    characteristics:
      'Soy un cachorro muy curioso y juguetón. Me encanta explorar y hacer nuevos amigos. Soy muy cariñoso y me gustan los mimos. Respondo a mi nombre "Toby" y también al "Tobis". ¡Ah, y tengo un talento especial: me tiro unos pedos épicos después de comer, no sé de dónde salen pero mi familia dice que son de campeonato! 💨😂',
    emoji: "🐶",
    heroMessage:
      "¡Hola! Soy Toby Romero 🐾 Me he perdido y necesito tu ayuda para que mis papás me encuentren. Tengo apenas unos meses de vida y estoy muy asustado. Por favor contáctalos, ellos me están buscando con mucho amor.",
    heroImage: {
      url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-1.png",
      alt: "Toby Romero — foto principal",
      width: 800,
      height: 600,
    },
    heroVideo: {
      url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-2.mp4",
      orientation: "vertical",
      poster:
        "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-1.png",
    },
    photos: [
      {
        url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-1.png",
        alt: "Toby jugando",
        width: 600,
        height: 600,
      },
      {
        url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-2.png",
        alt: "Toby en casa",
        width: 600,
        height: 600,
      },
      {
        url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-3.png",
        alt: "Toby en el parque",
        width: 600,
        height: 600,
      },
      {
        url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-4.png",
        alt: "Toby descansando",
        width: 600,
        height: 600,
      },
      {
        url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-5.png",
        alt: "Toby feliz",
        width: 600,
        height: 600,
      },
      {
        url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-6.png",
        alt: "Toby con su familia",
        width: 600,
        height: 600,
      },
    ],
    owner: {
      name: "Cristian Camilo Romero Piñeros",
      phone: "+573148554726",
      whatsapp: "573148554726",
      email: "cristian.c.romero.p@gmail.com",
    },
  },

  // ── Luna (second demo profile) ───────────────────────────────────────────
  "6ba7b810-9dad-11d1-80b4-00c04fd430c8": {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    name: "Luna",
    birthDate: "2024-03-10",
    age: "1 año",
    breed: "Labrador Negro",
    color: "Negro",
    weight: "22 kg",
    characteristics:
      "Muy juguetona y energética. Le gustan los paseos largos. Es muy obediente y cariñosa con los niños. Tambien me tiro muchos pedos 💨 cuando como mal.",
    emoji: "🐩",
    heroMessage:
      "Hola, soy Luna y me perdí. Por favor ayúdame a volver con mi familia. Ellos me están buscando con mucho amor.",
    heroImage: {
      url: "https://placedog.net/800/600?id=30",
      alt: "Luna — foto principal",
      width: 800,
      height: 600,
    },
    heroVideo: {
      url: "https://find-my-pet-dev.s3.us-east-1.amazonaws.com/550e8400-e29b-41d4-a716-446655440000/toby-2.mp4",
      orientation: "horizontal",
      poster: "Soy Toby ;)",
    },
    photos: [
      {
        url: "https://placedog.net/600/600?id=21",
        alt: "Luna jugando",
        width: 600,
        height: 600,
      },
      {
        url: "https://placedog.net/600/600?id=22",
        alt: "Luna en casa",
        width: 600,
        height: 600,
      },
      {
        url: "https://placedog.net/600/600?id=23",
        alt: "Luna en el parque",
        width: 600,
        height: 600,
      },
      {
        url: "https://placedog.net/600/600?id=24",
        alt: "Luna descansando",
        width: 600,
        height: 600,
      },
      {
        url: "https://placedog.net/600/600?id=25",
        alt: "Luna feliz",
        width: 600,
        height: 600,
      },
      {
        url: "https://placedog.net/600/600?id=26",
        alt: "Luna con familia",
        width: 600,
        height: 600,
      },
    ],
    owner: {
      name: "Cristian Camilo Romero Piñeros",
      phone: "+573148554726",
      whatsapp: "573148554726",
      email: "cristian.c.romero.p@gmail.com",
    },
  },
};

export const DEFAULT_PET_ID = "550e8400-e29b-41d4-a716-446655440000";

export function getPetById(id: string): PetProfile | null {
  return MOCK_PETS[id] ?? null;
}

export function getAllPets(): PetProfile[] {
  return Object.values(MOCK_PETS);
}
