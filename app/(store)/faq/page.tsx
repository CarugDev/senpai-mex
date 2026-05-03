import AnimateIn from '@/components/ui/AnimateIn'
import Link from 'next/link'

export const revalidate = 60

export const metadata = { title: 'Preguntas frecuentes', description: 'Resolvemos tus dudas sobre Senpai Mex.' }

export default function FaqPage() {
  const faqs = [
    {
      category: 'Productos',
      items: [
        { q: '¿Los productos son originales de Japón?', a: 'Sí, todos nuestros productos son importados directamente desde Japón. Garantizamos su autenticidad.' },
        { q: '¿Tienen fecha de caducidad los productos de belleza?', a: 'Sí, todos los productos de belleza y skincare que vendemos están dentro de su fecha de vigencia. Siempre verificamos esto antes de enviarlos.' },
        { q: '¿Puedo solicitar algún producto específico de Japón?', a: 'Sí, contáctanos por WhatsApp o correo y con gusto te ayudamos a encontrar lo que buscas.' },
      ]
    },
    {
      category: 'Pedidos y pagos',
      items: [
        { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express, así como pagos en OXXO.' },
        { q: '¿Es seguro pagar en su sitio?', a: 'Sí, todos los pagos se procesan a través de Stripe, una plataforma de pagos certificada y segura.' },
        { q: '¿Puedo cancelar mi pedido?', a: 'Puedes cancelar tu pedido dentro de las primeras 2 horas después de realizarlo. Contáctanos de inmediato por WhatsApp.' },
      ]
    },
    {
      category: 'Envíos',
      items: [
        { q: '¿Cuánto tarda en llegar mi pedido?', a: 'Los pedidos se procesan en 24 horas y la entrega toma entre 3 y 7 días hábiles dependiendo de tu ubicación.' },
        { q: '¿Envían a toda la República Mexicana?', a: 'Sí, hacemos envíos a todo México incluyendo zonas rurales.' },
        { q: '¿El envío es gratis?', a: 'El envío es gratuito en pedidos mayores a $800 MXN. En pedidos menores el costo es de $150 MXN.' },
      ]
    },
  ]

  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp">
        <AnimateIn>
          <p className="label-sm mb-4">Ayuda</p>
          <h1 className="font-display text-6xl text-ink leading-tight mb-8">Preguntas<br />frecuentes</h1>
          <p className="font-body text-ink/60 text-lg max-w-xl leading-relaxed mb-16">
            Resolvemos tus dudas más comunes. Si no encuentras lo que buscas, contáctanos.
          </p>
        </AnimateIn>

        <div className="space-y-16">
          {faqs.map(section => (
            <AnimateIn key={section.category}>
              <h2 className="font-display text-3xl text-ink mb-8">{section.category}</h2>
              <div className="space-y-4">
                {section.items.map(item => (
                  <div key={item.q} className="bg-snow p-8">
                    <h3 className="font-display text-lg text-ink mb-3">{item.q}</h3>
                    <p className="font-body text-sm text-stone leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="mt-16 text-center">
            <p className="font-body text-sm text-stone mb-4">¿No encontraste lo que buscabas?</p>
            <Link href="/contacto" className="font-body text-sm tracking-widest bg-torii text-snow px-10 py-4 hover:bg-torii-dark transition-colors duration-300 inline-block">
              CONTÁCTANOS
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  )
}
