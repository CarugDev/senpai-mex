import AnimateIn from '@/components/ui/AnimateIn'
import Link from 'next/link'

export const metadata = { title: 'Devoluciones', description: 'Política de devoluciones de Senpai Mex.' }

export default function DevolucionesPage() {
  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <AnimateIn>
          <p className="label-sm mb-4">Devoluciones</p>
          <h1 className="font-display text-6xl text-ink leading-tight mb-8">Política de<br />devoluciones</h1>
          <p className="font-body text-ink/60 text-lg max-w-2xl leading-relaxed mb-16">
            Tu satisfacción es lo más importante. Si algo no está bien con tu pedido, estamos aquí para resolverlo.
          </p>
        </AnimateIn>

        <div className="space-y-6 mb-16">
          {[
            { title: '¿Cuándo aplica una devolución?', desc: 'Aceptamos devoluciones cuando el producto llegó dañado, es diferente al descrito, o tiene un defecto de fábrica. Las devoluciones deben solicitarse dentro de los 7 días posteriores a la recepción del pedido.' },
            { title: '¿Cómo solicito una devolución?', desc: 'Contáctanos por WhatsApp o correo con tu número de pedido y fotos del producto. Te responderemos en menos de 24 horas con los pasos a seguir.' },
            { title: '¿Cuánto tarda el reembolso?', desc: 'Una vez aprobada la devolución, el reembolso se procesa en 5-10 días hábiles dependiendo de tu banco o método de pago.' },
            { title: '¿Qué productos no aplican para devolución?', desc: 'Productos de belleza y skincare abiertos o usados no aplican para devolución por razones de higiene, a menos que presenten un defecto de fábrica.' },
          ].map(item => (
            <AnimateIn key={item.title} direction="up">
              <div className="bg-snow p-8">
                <h3 className="font-display text-xl text-ink mb-3">{item.title}</h3>
                <p className="font-body text-sm text-stone leading-relaxed">{item.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="bg-ink text-snow p-12 text-center">
            <p className="font-display text-3xl mb-4">¿Necesitas ayuda?</p>
            <p className="font-body text-snow/60 max-w-xl mx-auto leading-relaxed mb-8">
              Si tienes algún problema con tu pedido no dudes en contactarnos. Estamos aquí para ayudarte.
            </p>
            <Link href="/contacto" className="inline-block font-body text-sm tracking-widest bg-torii text-snow px-10 py-4 hover:bg-torii-dark transition-colors duration-300">
              CONTACTAR
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
