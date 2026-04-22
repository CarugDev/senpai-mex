import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

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
  title: {
    default: 'Senpai Mex | Productos Japoneses Premium en México',
    template: '%s | Senpai Mex'
  },
  description: 'Belleza japonesa, ropa, bolsas, tés y más. Productos auténticos importados directamente de Japón con envío a toda la República Mexicana.',
  keywords: ['productos japoneses', 'belleza japonesa', 'skincare japonés', 'té matcha', 'ropa japonesa', 'México', 'importado de Japón'],
  authors: [{ name: 'Senpai Mex' }],
  creator: 'Senpai Mex',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://senpai-mex.vercel.app',
    siteName: 'Senpai Mex',
    title: 'Senpai Mex | Productos Japoneses Premium en México',
    description: 'Belleza japonesa, ropa, bolsas, tés y más. Productos auténticos importados directamente de Japón.',
    images: [
      {
        url: '/images/shibuya.jpg',
        width: 1200,
        height: 630,
        alt: 'Senpai Mex - Productos Japoneses Premium',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Senpai Mex | Productos Japoneses Premium en México',
    description: 'Belleza japonesa, ropa, bolsas, tés y más. Productos auténticos importados directamente de Japón.',
    images: ['/images/shibuya.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${dmSans.variable} font-body bg-mist text-ink antialiased`}>
        {children}
      </body>
    </html>
  )
}
