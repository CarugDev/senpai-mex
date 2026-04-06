import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Senpai Mex | Productos Japoneses Premium',
  description: 'Té japonés, snacks y utensilios tradicionales importados directamente de Japón. Envíos a toda la República Mexicana.',
  keywords: ['matcha', 'té japonés', 'productos japoneses', 'snacks japoneses', 'México'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${dmSans.variable} font-body bg-mist text-ink antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
