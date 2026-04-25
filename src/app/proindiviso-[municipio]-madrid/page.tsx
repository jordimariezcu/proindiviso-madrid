import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMunicipio, getAllSlugs } from '@/lib/municipios'
import Calculadora from '@/components/Calculadora'
import FAQ from '@/components/FAQ'
import { TELEFONO_HREF } from '@/lib/config'

interface Props {
  params: Promise<{ municipio: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ municipio: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { municipio: slug } = await params
  const m = getMunicipio(slug)
  if (!m) return {}
  return {
    title: `Proindiviso en ${m.nombre} — Valoración gratuita y abogado especialista`,
    description: `¿Tienes un proindiviso en ${m.nombre}? Calcula gratis el valor de tu parte y contacta con un abogado especialista. Solución en semanas, sin juicio si hay acuerdo.`,
    keywords: [`proindiviso ${m.nombre}`, `abogado proindiviso ${m.nombre}`, `vender proindiviso ${m.nombre}`, `herencia ${m.nombre}`, `disolucion condominio ${m.nombre}`],
    openGraph: {
      title: `Proindiviso ${m.nombre} — Calcula el valor de tu parte`,
      description: `Valoración gratuita e inmediata. Abogado especialista en proindivisos en ${m.nombre}.`,
    }
  }
}

export default async function MunicipioPage({ params }: Props) {
  const { municipio: slug } = await params
  const m = getMunicipio(slug)
  if (!m) notFound()

  const schemaLocal = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: `Abogado Proindiviso ${m.nombre}`,
    description: `Especialistas en resolución de proindivisos en ${m.nombre} y municipios cercanos.`,
    areaServed: { '@type': 'City', name: m.nombre },
    serviceType: 'Derecho de proindivisos y extinción de condominio',
    url: `https://proindiviso-madrid.es/proindiviso-${m.slug}-madrid`,
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }}
      />

      <div className="mb-2">
        <span className="text-xs text-blue-600 font-medium uppercase tracking-widest">
          {m.nombre} · Madrid
        </span>
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-3 leading-tight">
        Proindiviso en {m.nombre}:<br />calcula el valor de tu parte gratis
      </h1>
      <p className="text-gray-500 text-base leading-relaxed mb-8">
        ¿Tienes un piso o local en proindiviso en {m.nombre} y no sabes qué vale tu parte?
        Usa la calculadora, recibe una valoración real en segundos y conecta con un abogado especialista.
        Sin compromiso, sin esperas.
      </p>

      <Calculadora municipio={m.nombre} />

      <section className="mt-12 space-y-6 text-gray-600 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-gray-900">
          Cómo se resuelve un proindiviso en {m.nombre}
        </h2>
        <p>
          Los proindivisos en {m.nombre} se tramitan ante el <strong>{m.juzgado}</strong> cuando
          es necesaria la vía judicial. Sin embargo, la mayoría de los casos se resuelven antes de
          llegar a juicio mediante acuerdo entre los copropietarios o venta a un tercero especializado.
        </p>
        <p>
          El proceso comienza con una valoración objetiva de la propiedad y un análisis de la relación
          entre copropietarios. A partir de ahí, el abogado plantea la estrategia más rápida y económica:
          negociación directa, extinción notarial o —en último recurso— acción judicial de división.
        </p>
        <p>
          En {m.nombre}, como en el resto de la Comunidad de Madrid, la extinción de condominio
          tributa al 0,75% en concepto de Actos Jurídicos Documentados, lo que supone una ventaja
          fiscal significativa respecto a una compraventa ordinaria.
        </p>
      </section>

      <FAQ municipio={m.nombre} />

      <section className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-1">
          ¿Prefieres hablar directamente?
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Nuestro abogado especialista en {m.nombre} te atiende sin compromiso.
        </p>
        <a href={`tel:${TELEFONO_HREF}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">
          Llamar ahora
        </a>
      </section>
    </main>
  )
}
