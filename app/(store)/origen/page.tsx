import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'

export const revalidate = 60

export const metadata = { title: 'De Japón a México', description: 'Conoce el origen de nuestros productos japoneses.' }

export default function OrigenPage() {
  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <AnimateIn>
          <p className="label-sm mb-4">Origen</p>
          <h1 className="font-display text-6xl text-ink leading-tight mb-8">De Japón<br />a tu puerta</h1>
          <p className="font-body text-ink/60 text-lg max-w-2xl leading-relaxed mb-12">
            Cada producto que vendemos es importado directamente desde Japón. Trabajamos sin intermediarios para garantizarte autenticidad y el mejor precio posible.
          </p>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { step: '01', title: 'Selección en Japón', desc: 'Visitamos tiendas, mercados y proveedores directamente en Japón para elegir los mejores productos.' },
            { step: '02', title: 'Importación directa', desc: 'Traemos los productos personalmente o a través de envíos directos desde Japón a México.' },
            { step: '03', title: 'Entrega a tu puerta', desc: 'Una vez en México, preparamos tu pedido y lo enviamos a cualquier parte de la República.' },
          ].map(item => (
            <AnimateIn key={item.step} direction="up">
              <div className="bg-snow p-8">
                <p className="font-display text-4xl text-torii/20 mb-4">{item.step}</p>
                <h3 className="font-display text-xl text-ink mb-3">{item.title}</h3>
                <p className="font-body text-sm text-stone leading-relaxed">{item.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn>
          <div className="bg-ink text-snow p-12 text-center">
            <p className="font-display text-3xl mb-4">100% auténtico</p>
            <p className="font-body text-snow/60 max-w-xl mx-auto leading-relaxed mb-8">
              Todos nuestros productos tienen origen japonés verificado. Si tienes dudas sobre algún producto específico, contáctanos.
            </p>
            <Link href="/productos" className="inline-block font-body text-sm tracking-widest bg-torii text-snow px-10 py-4 hover:bg-torii-dark transition-colors duration-300">
              VER PRODUCTOS
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
