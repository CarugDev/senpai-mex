import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ink text-snow/50 pt-24 pb-12">
      <div className="container-jp">
        <div className="text-center mb-20">
          <Image src="/logo.png" alt="Senpai Mex" width={160} height={54} className="object-contain brightness-0 invert mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {[
            { title: 'Tienda', links: [['Todos los productos', '/productos'], ['Belleza', '/productos?category=belleza'], ['Ropa', '/productos?category=ropa'], ['Bags', '/productos?category=bags'], ['Tés', '/productos?category=tes'], ['Varios', '/productos?category=varios']] },
            { title: 'Nosotros', links: [['Nuestra historia', '/nosotros'], ['De Japón a México', '/origen'], ['Contacto', '/contacto']] },
            { title: 'Ayuda', links: [['Guía de envíos', '/envios'], ['Devoluciones', '/devoluciones'], ['Preguntas frecuentes', '/faq']] },
            { title: 'Legal', links: [['Privacidad', '/privacidad'], ['Términos de uso', '/terminos']] },
          ].map(col => (
            <div key={col.title}>
              <p className="label-sm text-snow/30 mb-6">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="font-body text-sm text-snow/50 hover:text-snow/90 transition-colors duration-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-snow/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-snow/30">© 2025 Senpai Mex. Todos los derechos reservados.</p>
          <p className="font-body text-xs text-snow/20 tracking-widest">MÉXICO · JAPÓN</p>
        </div>
      </div>
    </footer>
  )
}
