import AnimateIn from '@/components/ui/AnimateIn'

export const metadata = { title: 'Política de privacidad', description: 'Política de privacidad de Senpai Mex.' }

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp max-w-3xl">
        <AnimateIn>
          <p className="label-sm mb-4">Legal</p>
          <h1 className="font-display text-6xl text-ink leading-tight mb-8">Política de<br />privacidad</h1>
          <p className="font-body text-stone text-sm mb-16">Última actualización: Abril 2026</p>
        </AnimateIn>

        <div className="space-y-12">
          {[
            { title: '1. Información que recopilamos', content: 'Recopilamos información que nos proporcionas directamente al crear una cuenta, realizar una compra o contactarnos. Esto incluye nombre, correo electrónico, dirección de envío y número de teléfono.' },
            { title: '2. Uso de la información', content: 'Utilizamos tu información para procesar pedidos, enviar confirmaciones de compra, gestionar entregas y mejorar nuestros servicios. No vendemos ni compartimos tu información personal con terceros.' },
            { title: '3. Seguridad de pagos', content: 'Todos los pagos son procesados de forma segura a través de Stripe. No almacenamos datos de tarjetas de crédito o débito en nuestros servidores.' },
            { title: '4. Cookies', content: 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio, recordar tu carrito de compras y analizar el tráfico. Puedes desactivar las cookies en la configuración de tu navegador.' },
            { title: '5. Tus derechos', content: 'Tienes derecho a acceder, corregir o eliminar tu información personal. Para ejercer estos derechos contáctanos a través de nuestro formulario de contacto.' },
            { title: '6. Cambios a esta política', content: 'Podemos actualizar esta política ocasionalmente. Te notificaremos por correo electrónico sobre cambios significativos.' },
            { title: '7. Contacto', content: 'Si tienes preguntas sobre nuestra política de privacidad, contáctanos en hectorheca9@hotmail.com' },
          ].map(item => (
            <AnimateIn key={item.title}>
              <div>
                <h2 className="font-display text-2xl text-ink mb-4">{item.title}</h2>
                <p className="font-body text-sm text-stone leading-relaxed">{item.content}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  )
}
