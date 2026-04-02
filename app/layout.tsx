import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
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
      <body className={`${playfair.variable} ${inter.variable} font-body bg-sakura-mist text-sakura-ink antialiased`}>
        {children}
      </body>
    </html>
  )
}
