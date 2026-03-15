import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'FindMyDog — Ayuda a las mascotas a volver a casa',
  description: 'Página de identificación de mascotas. Escanea el QR del collar para ver los datos de contacto.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={nunito.variable}>
      <body className="antialiased font-body bg-amber-50 text-amber-900 scroll-smooth">
        {children}
      </body>
    </html>
  )
}
