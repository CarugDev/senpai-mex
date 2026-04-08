import Link from 'next/link'
import Image from 'next/image'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-mist flex">
      <aside className="w-64 bg-ink min-h-screen fixed top-0 left-0 flex flex-col">
        <div className="p-8 border-b border-snow/10">
          <Link href="/">
            <Image src="/logo.png" alt="Senpai Mex" width={100} height={34} className="object-contain brightness-0 invert" />
          </Link>
          <p className="font-body text-xs text-snow/30 mt-1 tracking-widest">ADMIN PANEL</p>
        </div>
        <nav className="flex-1 p-6 space-y-1">
          {[
            { label: 'Dashboard', href: '/admin/dashboard' },
            { label: 'Productos', href: '/admin/productos' },
            { label: 'Órdenes', href: '/admin/ordenes' },
            { label: 'Categorías', href: '/admin/categorias' },
            { label: 'Importar CSV', href: '/admin/import' },
          ].map(item => (
            <Link key={item.href} href={item.href} className="block font-body text-sm text-snow/50 hover:text-snow px-4 py-3 hover:bg-snow/5 transition-colors duration-200 tracking-wide">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-snow/10">
          <Link href="/" className="font-body text-xs text-snow/30 hover:text-snow/60 transition-colors tracking-widest">← VER TIENDA</Link>
        </div>
      </aside>
      <main className="ml-64 flex-1 p-10">{children}</main>
    </div>
  )
}
