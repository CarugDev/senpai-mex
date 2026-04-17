import Image from 'next/image'
import Link from 'next/link'
import AnimateIn from '@/components/ui/AnimateIn'

export const metadata = {
  title: 'Nuestra Historia',
  description: 'Conoce la historia detrás de Senpai Mex — de Tokio a México.',
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-mist pt-32">

      {/* HERO */}
      <section className="container-jp pb-24">
        <AnimateIn>
          <p className="label-sm mb-4">Nuestra historia</p>
          <h1 className="font-display text-6xl md:text-8xl text-ink leading-[0.9] mb-8 max-w-3xl">
            De Tokio<br />
            <em className="not-italic text-torii">a México</em>
          </h1>
          <p className="font-body text-ink/50 text-xl max-w-xl leading-relaxed">
            Una historia de amor por la cultura japonesa que cruzó el océano.
          </p>
        </AnimateIn>
      </section>

      {/* FOTO SHIBUYA FULLWIDTH */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="/images/urbe.jpg"
          alt="Ciudad japonesa"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <div className="absolute bottom-12 left-0 right-0 container-jp">
          <AnimateIn>
            <p className="font-display text-3xl text-snow">Tokio, Japón — 2024</p>
          </AnimateIn>
        </div>
      </section>

      {/* HISTORIA PARTE 1 */}
      <section className="section-pad">
        <div className="container-jp">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <AnimateIn direction="right">
              <div className="space-y-6">
                <p className="label-sm">El comienzo</p>
                <h2 className="font-display text-4xl text-ink leading-tight">
                  Todo empezó con un viaje que cambió todo
                </h2>
                <p className="font-body text-ink/60 leading-relaxed">
                  Cuando llegué a Japón por primera vez, no sabía que ese viaje cambiaría mi vida. Las calles de Tokio, los templos de Kioto, los mercados llenos de productos que nunca había visto — todo era diferente, todo era mejor.
                </p>
                <p className="font-body text-ink/60 leading-relaxed">
                  Después de vivir una temporada completa allá, me di cuenta de algo: la gente en México no tiene acceso fácil a todo lo que Japón tiene para ofrecer. No solo el té matcha o los snacks — sino la skincare más avanzada del mundo, la ropa más cuidada, los accesorios más únicos.
                </p>
              </div>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.2}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/templo-noche.jpg"
                  alt="Templo japonés de noche"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* HISTORIA PARTE 2 */}
      <section className="section-pad bg-ink text-snow">
        <div className="container-jp">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <AnimateIn direction="right">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/images/campo-te.jpg"
                  alt="Campos de té en Japón"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimateIn>
            <AnimateIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-torii-light">La misión</p>
                <h2 className="font-display text-4xl text-snow leading-tight">
                  Traer lo mejor de Japón sin que tengas que viajar
                </h2>
                <p className="font-body text-snow/60 leading-relaxed">
                  Senpai Mex nació de una idea simple: si yo pude experimentar todo lo que Japón tiene para dar, ¿por qué no compartirlo con México?
                </p>
                <p className="font-body text-snow/60 leading-relaxed">
                  Cada producto que encuentras aquí fue seleccionado personalmente. No trabajamos con intermediarios — vamos directo a Japón, elegimos lo mejor, y te lo traemos a tu puerta en cualquier parte de la República Mexicana.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* FUJI SECTION */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/urbe-2.jpg"
            alt="Ciudad japonesa"
            fill
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="container-jp relative z-10 text-center">
          <AnimateIn>
            <p className="label-sm text-snow/50 mb-6">Nuestra promesa</p>
            <h2 className="font-display text-5xl md:text-6xl text-snow mb-8 max-w-2xl mx-auto leading-tight">
              Autenticidad en cada producto que enviamos
            </h2>
            <Link href="/productos" className="inline-block font-body text-sm tracking-widest bg-torii text-snow px-10 py-4 hover:bg-torii-dark transition-colors duration-300">
              EXPLORAR TIENDA
            </Link>
          </AnimateIn>
        </div>
      </section>

    </div>
  )
}
