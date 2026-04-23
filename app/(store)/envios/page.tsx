import AnimateIn from '@/components/ui/AnimateIn'
import Link from 'next/link'

export const metadata = { title: 'Envíos y entregas', description: 'Información sobre envíos a toda la República Mexicana.' }

export default function EnviosPage() {
  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <AnimateIn>
          <p className="label-sm mb-4">Envíos</p>
          <h1 className="font-display text-6xl text-ink leading-tight mb-8">Enviamos a toda<br />la República</h1>
          <p className="font-body text-ink/60 text-lg max-w-2xl leading-relaxed mb-16">
            Hacemos envíos a cualquier parte de México con empaque cuidado para que tus productos lleguen en perfectas condiciones.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <AnimateIn direction="up">
            <div className="bg-snow p-10">
              <p className="label-sm mb-4">Envío estándar</p>
              <p className="font-display text-4xl text-ink mb-2">$180 MXN</p>
              <p className="font-body text-sm text-stone mb-6">En pedidos menores a $1,000 MXN</p>
              <ul className="space-y-3">
                {['Entrega en 3-7 días hábiles', 'Número de rastreo incluido', 'Empaque protegido'].map(item => (
                  <li key={item} className="font-body text-sm text-ink flex items-center gap-3">
                    <span className="text-matcha">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.1}>
            <div className="bg-torii text-snow p-10">
              <p className="font-body text-xs uppercase tracking-[0.2em] text-snow/60 mb-4">Envío gratis</p>
              <p className="font-display text-4xl text-snow mb-2">$0 MXN</p>
              <p className="font-body text-sm text-snow/60 mb-6">En pedidos mayores a $1,000 MXN o envíos a Durango</p>
              <ul className="space-y-3">
                {['Entrega en 3-7 días hábiles', 'Número de rastreo incluido', 'Empaque protegido premium', 'Envío siempre gratuito a Durango'].map(item => (
                  <li key={item} className="font-body text-sm text-snow flex items-center gap-3">
                    <span className="text-snow/60">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn>
          <div className="bg-snow p-10 mb-8">
            <h2 className="font-display text-2xl text-ink mb-6">Preguntas frecuentes</h2>
            <div className="space-y-6">
              {[
                { q: '¿Cuánto tarda mi pedido?', a: 'Los pedidos se procesan en 24 horas y la entrega toma entre 3 y 7 días hábiles dependiendo de tu ubicación.' },
                { q: '¿Cómo rastreo mi pedido?', a: 'Una vez enviado tu pedido te notificaremos por correo con el número de rastreo.' },
                { q: '¿Envían a todas las ciudades?', a: 'Sí, enviamos a toda la República Mexicana incluyendo zonas rurales.' },
              ].map(item => (
                <div key={item.q} className="border-b border-ink/8 pb-6 last:border-0">
                  <p className="font-display text-lg text-ink mb-2">{item.q}</p>
                  <p className="font-body text-sm text-stone leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <AnimateIn>
          <div className="text-center">
            <p className="font-body text-sm text-stone mb-4">¿Tienes más preguntas sobre envíos?</p>
            <Link href="/contacto" className="font-body text-sm tracking-widest border-b border-ink/30 pb-1 hover:border-ink transition-colors">
              CONTÁCTANOS
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
