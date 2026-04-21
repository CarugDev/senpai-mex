import AnimateIn from '@/components/ui/AnimateIn'

export const metadata = { title: 'Términos de uso', description: 'Términos y condiciones de uso de Senpai Mex.' }

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-mist pt-32 pb-32">
      <div className="container-jp max-w-3xl">
        <AnimateIn>
          <p className="label-sm mb-4">Legal</p>
          <h1 className="font-display text-6xl text-ink leading-tight mb-8">Términos<br />de uso</h1>
          <p className="font-body text-stone text-sm mb-16">Última actualización: Abril 2026</p>
        </AnimateIn>

        <div className="space-y-12">
          {[
            { title: '1. Aceptación de términos', content: 'Al acceder y usar senpai-mex.vercel.app aceptas estos términos de uso. Si no estás de acuerdo con alguno de estos términos, no uses nuestro sitio.' },
            { title: '2. Uso del sitio', content: 'Este sitio es para uso personal y no comercial. No puedes reproducir, duplicar, copiar o vender ninguna parte del servicio sin nuestro consentimiento expreso por escrito.' },
            { title: '3. Productos y precios', content: 'Nos reservamos el derecho de modificar precios en cualquier momento sin previo aviso. Los precios mostrados incluyen IVA. Nos reservamos el derecho de limitar cantidades por pedido.' },
            { title: '4. Proceso de compra', content: 'Al realizar un pedido, declaras que la información proporcionada es correcta y que estás autorizado para usar el método de pago elegido.' },
            { title: '5. Cancelaciones y devoluciones', content: 'Las cancelaciones se aceptan dentro de las primeras 2 horas después de realizar el pedido. Las devoluciones aplican según nuestra política de devoluciones disponible en el sitio.' },
            { title: '6. Limitación de responsabilidad', content: 'No somos responsables por daños indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar nuestros productos o servicios.' },
            { title: '7. Modificaciones', content: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio después de los cambios constituye aceptación de los nuevos términos.' },
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
