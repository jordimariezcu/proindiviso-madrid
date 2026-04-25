import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBarrio, getAllBarrioSlugs, getBarriosByDistrito } from '@/lib/barrios'
import Calculadora from '@/components/Calculadora'
import FAQ from '@/components/FAQ'
import Link from 'next/link'
import { TELEFONO_HREF } from '@/lib/config'

interface Props {
  params: Promise<{ barrio: string }>
}

export async function generateStaticParams() {
  return getAllBarrioSlugs().map(slug => ({ barrio: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { barrio: slug } = await params
  const b = getBarrio(slug)
  if (!b) return {}

  return {
    title: `Proindiviso en ${b.nombre} (Madrid) — Valoración gratuita`,
    description: `¿Tienes un proindiviso en ${b.nombre}, ${b.distrito}? El precio medio en la zona es ${b.precio_m2.toLocaleString('es-ES')}€/m². Calcula gratis el valor de tu parte y habla con un abogado especialista.`,
    keywords: [
      `proindiviso ${b.nombre}`,
      `proindiviso ${b.nombre} madrid`,
      `abogado proindiviso ${b.nombre}`,
      `vender proindiviso ${b.nombre}`,
      `herencia ${b.nombre} madrid`,
      `proindiviso barrio ${b.nombre}`,
    ],
    openGraph: {
      title: `Proindiviso ${b.nombre} Madrid — Calcula el valor de tu parte`,
      description: `Valoración gratuita e inmediata. Precio medio zona: ${b.precio_m2.toLocaleString('es-ES')}€/m².`,
    }
  }
}

export default async function BarrioPage({ params }: Props) {
  const { barrio: slug } = await params
  const b = getBarrio(slug)
  if (!b) notFound()

  const barriosDistrito = getBarriosByDistrito(b.distrito).filter(x => x.slug !== slug)

  const schemaLocal = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Abogado Proindiviso ${b.nombre} Madrid`,
    description: `Especialistas en resolución de proindivisos en el barrio de ${b.nombre}, distrito ${b.distrito}, Madrid.`,
    areaServed: [
      { '@type': 'Place', name: b.nombre },
      { '@type': 'City', name: 'Madrid' },
    ],
    serviceType: 'Derecho de proindivisos y extinción de condominio',
    url: `https://proindiviso-madrid.es/proindiviso-${b.slug}-madrid-capital`,
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }}
      />

      <div className="mb-2 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-blue-600 font-medium uppercase tracking-widest">
          {b.distrito} · Madrid capital
        </span>
        <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-medium">
          Precio medio zona: {b.precio_m2.toLocaleString('es-ES')}€/m²
        </span>
      </div>

      <h1 className="text-3xl font-semibold text-gray-900 mb-3 leading-tight">
        Proindiviso en {b.nombre}:<br />calcula el valor de tu parte gratis
      </h1>
      <p className="text-gray-500 text-base leading-relaxed mb-8">
        {b.nota} Usa la calculadora para saber cuánto vale tu parte y conecta
        con un abogado especialista en proindivisos en Madrid capital.
      </p>

      <Calculadora municipio={`${b.nombre} (Madrid)`} />

      <section className="mt-12 space-y-4 text-gray-600 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-gray-900">
          Proindivisos en {b.nombre}: lo que debes saber
        </h2>
        <p>
          El barrio de {b.nombre}, en el distrito de {b.distrito}, tiene un precio medio
          de <strong>{b.precio_m2.toLocaleString('es-ES')}€/m²</strong>. Esto significa que un piso
          de 80m² en proindiviso en esta zona tiene un valor de mercado aproximado
          de <strong>{(b.precio_m2 * 80).toLocaleString('es-ES')}€</strong>. Una cuota del 50% valdría
          proporcionalmente <strong>{(b.precio_m2 * 80 * 0.5).toLocaleString('es-ES')}€</strong>,
          aunque el descuento por proindiviso reduce ese valor entre un 30% y un 50%
          dependiendo de la situación.
        </p>
        <p>
          Los proindivisos en {b.nombre} se tramitan ante los Juzgados de Primera Instancia
          de Madrid capital cuando es necesaria la vía judicial. La mayoría de los casos
          se resuelven antes de llegar a juicio mediante acuerdo entre copropietarios o
          venta a un especialista en proindivisos.
        </p>
        <p>
          En la Comunidad de Madrid, la extinción de condominio tributa al 0,75% en
          Actos Jurídicos Documentados (AJD), lo que la convierte en la vía más eficiente
          fiscalmente para resolver un proindiviso.
        </p>
      </section>

      {barriosDistrito.length > 0 && (
        <section className="mt-10">
          <h3 className="text-base font-medium text-gray-900 mb-3">
            Otros barrios del distrito {b.distrito}
          </h3>
          <div className="flex flex-wrap gap-2">
            {barriosDistrito.map(bx => (
              <Link key={bx.slug}
                href={`/proindiviso-${bx.slug}-madrid-capital`}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                {bx.nombre}
              </Link>
            ))}
          </div>
        </section>
      )}

      <FAQ municipio={b.nombre} />

      <section className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-1">
          ¿Prefieres hablar directamente?
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Nuestro abogado especialista en {b.nombre} te atiende sin compromiso.
        </p>
        <a href={`tel:${TELEFONO_HREF}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">
          Llamar ahora
        </a>
      </section>
    </main>
  )
}
