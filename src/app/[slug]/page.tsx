import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMunicipio, getAllSlugs } from '@/lib/municipios'
import { getBarrio, getAllBarrioSlugs, getBarriosByDistrito } from '@/lib/barrios'
import { getDistrito, getAllDistritoSlugs } from '@/lib/distritos'
import Calculadora from '@/components/Calculadora'
import FAQ from '@/components/FAQ'
import { TELEFONO_HREF } from '@/lib/config'

interface Props {
  params: Promise<{ slug: string }>
}

function parseBarrioSlug(slug: string): string | null {
  return slug.match(/^proindiviso-(.+)-madrid-capital$/)?.[1] ?? null
}

function parseDistritoSlug(slug: string): string | null {
  return slug.match(/^proindiviso-distrito-(.+)-madrid$/)?.[1] ?? null
}

function parseMunicipioSlug(slug: string): string | null {
  return slug.match(/^proindiviso-(.+)-madrid$/)?.[1] ?? null
}

export async function generateStaticParams() {
  return [
    ...getAllSlugs().map(s => ({ slug: `proindiviso-${s}-madrid` })),
    ...getAllBarrioSlugs().map(s => ({ slug: `proindiviso-${s}-madrid-capital` })),
    ...getAllDistritoSlugs().map(s => ({ slug: `proindiviso-distrito-${s}-madrid` })),
  ]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const barrioSlug = parseBarrioSlug(slug)
  if (barrioSlug) {
    const b = getBarrio(barrioSlug)
    if (!b) return {}
    return {
      title: `Proindiviso en ${b.nombre} (Madrid) — Valoración gratuita`,
      description: `¿Tienes un proindiviso en ${b.nombre}, ${b.distrito}? El precio medio en la zona es ${b.precio_m2.toLocaleString('es-ES')}€/m². Calcula gratis el valor de tu parte y habla con un abogado especialista.`,
      keywords: [`proindiviso ${b.nombre}`, `proindiviso ${b.nombre} madrid`, `abogado proindiviso ${b.nombre}`, `vender proindiviso ${b.nombre}`],
      openGraph: {
        title: `Proindiviso ${b.nombre} Madrid — Calcula el valor de tu parte`,
        description: `Valoración gratuita e inmediata. Precio medio zona: ${b.precio_m2.toLocaleString('es-ES')}€/m².`,
      },
    }
  }

  const distritoSlug = parseDistritoSlug(slug)
  if (distritoSlug) {
    const d = getDistrito(distritoSlug)
    if (!d) return {}
    return {
      title: `Proindiviso en el distrito de ${d.nombre} (Madrid) — Barrios y valoración`,
      description: `Proindivisos en el distrito de ${d.nombre}, Madrid. ${d.barrios.length} barrios cubiertos. Precio medio ${d.precioMedio.toLocaleString('es-ES')}€/m². Calcula gratis el valor de tu parte.`,
      keywords: [`proindiviso ${d.nombre} madrid`, `proindiviso distrito ${d.nombre}`, `abogado proindiviso ${d.nombre}`],
    }
  }

  const municipioSlug = parseMunicipioSlug(slug)
  if (municipioSlug) {
    const m = getMunicipio(municipioSlug)
    if (!m) return {}
    return {
      title: `Proindiviso en ${m.nombre} — Valoración gratuita y abogado especialista`,
      description: `¿Tienes un proindiviso en ${m.nombre}? Calcula gratis el valor de tu parte y contacta con un abogado especialista. Solución en semanas, sin juicio si hay acuerdo.`,
      keywords: [`proindiviso ${m.nombre}`, `abogado proindiviso ${m.nombre}`, `vender proindiviso ${m.nombre}`, `herencia ${m.nombre}`, `disolucion condominio ${m.nombre}`],
      openGraph: {
        title: `Proindiviso ${m.nombre} — Calcula el valor de tu parte`,
        description: `Valoración gratuita e inmediata. Abogado especialista en proindivisos en ${m.nombre}.`,
      },
    }
  }

  return {}
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params

  // Barrio primero (patrón más específico: termina en -madrid-capital)
  const distritoSlug = parseDistritoSlug(slug)
  if (distritoSlug) {
    const d = getDistrito(distritoSlug)
    if (!d) notFound()

    return (
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="mb-2">
          <span className="text-xs text-navy font-semibold uppercase tracking-widest">Madrid capital · Distrito</span>
        </div>
        <h1 className="text-3xl font-bold text-navy mb-3">
          Proindiviso en el distrito de {d.nombre}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-2xl">
          El distrito de {d.nombre} tiene un precio medio de <strong>{d.precioMedio.toLocaleString('es-ES')}€/m²</strong>.
          Selecciona tu barrio para calcular el valor de tu parte con el precio real de la zona.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {d.barrios.map(b => (
            <Link key={b.slug} href={`/proindiviso-${b.slug}-madrid-capital`}
              className="bg-white border border-gray-200 hover:border-navy rounded-xl p-5 transition-all group">
              <p className="font-semibold text-navy group-hover:text-navy-deep">{b.nombre}</p>
              <p className="text-sm text-gray-500 mt-1">{b.precio_m2.toLocaleString('es-ES')} €/m²</p>
              <p className="text-xs text-gold mt-2 font-medium">Ver calculadora →</p>
            </Link>
          ))}
        </div>

        <section className="bg-cream rounded-2xl border border-navy/10 p-8 text-center">
          <p className="text-lg font-bold text-navy mb-2">¿No sabes el valor de tu piso en {d.nombre}?</p>
          <p className="text-sm text-gray-500 mb-5">Nuestro abogado especialista te orienta sin compromiso.</p>
          <a href={`tel:${TELEFONO_HREF}`}
            className="inline-block bg-navy hover:bg-navy-deep text-white font-semibold px-8 py-3 rounded-xl transition-colors">
            Llamar ahora
          </a>
        </section>
      </main>
    )
  }

  const barrioSlug = parseBarrioSlug(slug)
  if (barrioSlug) {
    const b = getBarrio(barrioSlug)
    if (!b) notFound()

    const barriosDistrito = getBarriosByDistrito(b.distrito).filter(x => x.slug !== barrioSlug)

    const schemaLocal = {
      '@context': 'https://schema.org',
      '@type': 'LegalService',
      name: `Abogado Proindiviso ${b.nombre} Madrid`,
      description: `Especialistas en resolución de proindivisos en el barrio de ${b.nombre}, distrito ${b.distrito}, Madrid.`,
      areaServed: [{ '@type': 'Place', name: b.nombre }, { '@type': 'City', name: 'Madrid' }],
      serviceType: 'Derecho de proindivisos y extinción de condominio',
      url: `https://proindiviso-madrid.es/proindiviso-${b.slug}-madrid-capital`,
    }

    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }} />
        <div className="mb-2">
          <span className="text-xs text-navy font-semibold uppercase tracking-widest">{b.distrito} · Madrid capital</span>
        </div>
        <h1 className="text-3xl font-bold text-navy mb-3 leading-tight">
          Proindiviso en {b.nombre}: calcula el valor de tu parte gratis
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          {b.nota} Usa la calculadora para saber cuánto vale tu parte y conecta con un abogado especialista en proindivisos en Madrid capital.
        </p>

        <Calculadora municipio={`${b.nombre} (Madrid)`} precioM2={b.precio_m2} />
        <section className="mt-12 space-y-4 text-gray-600 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-navy">Proindivisos en {b.nombre}: lo que debes saber</h2>
          <p>
            El barrio de {b.nombre}, en el distrito de {b.distrito}, tiene un precio medio
            de <strong>{b.precio_m2.toLocaleString('es-ES')}€/m²</strong>. Esto significa que un piso
            de 80m² en proindiviso en esta zona tiene un valor de mercado aproximado
            de <strong>{(b.precio_m2 * 80).toLocaleString('es-ES')}€</strong>. Una cuota del 50% valdría
            proporcionalmente <strong>{(b.precio_m2 * 80 * 0.5).toLocaleString('es-ES')}€</strong>,
            aunque el descuento por proindiviso reduce ese valor entre un 30% y un 50% dependiendo de la situación.
          </p>
          <p>
            Los proindivisos en {b.nombre} se tramitan ante los Juzgados de Primera Instancia de Madrid capital
            cuando es necesaria la vía judicial. La mayoría de los casos se resuelven antes de llegar a juicio
            mediante acuerdo entre copropietarios o venta a un especialista en proindivisos.
          </p>
          <p>
            En la Comunidad de Madrid, la extinción de condominio tributa al 0,75% en Actos Jurídicos
            Documentados (AJD), lo que la convierte en la vía más eficiente fiscalmente para resolver un proindiviso.
          </p>
        </section>
        {barriosDistrito.length > 0 && (
          <section className="mt-10">
            <h3 className="text-base font-semibold text-navy mb-3">Otros barrios del distrito {b.distrito}</h3>
            <div className="flex flex-wrap gap-2">
              {barriosDistrito.map(bx => (
                <Link key={bx.slug} href={`/proindiviso-${bx.slug}-madrid-capital`}
                  className="text-sm text-navy hover:text-gold transition-colors">{bx.nombre}</Link>
              ))}
            </div>
          </section>
        )}
        <FAQ municipio={b.nombre} />
        <section className="mt-12 bg-cream rounded-2xl border border-gold/20 p-6 text-center">
          <p className="text-lg font-bold text-navy mb-1">¿Prefieres hablar directamente?</p>
          <p className="text-sm text-gray-500 mb-4">Nuestro abogado especialista en {b.nombre} te atiende sin compromiso.</p>
          <a href={`tel:${TELEFONO_HREF}`}
            className="inline-block bg-navy hover:bg-navy-deep text-white font-medium px-8 py-3 rounded-xl transition-colors">
            Llamar ahora
          </a>
        </section>
      </main>
    )
  }

  // Municipio
  const municipioSlug = parseMunicipioSlug(slug)
  if (municipioSlug) {
    const m = getMunicipio(municipioSlug)
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }} />
        <div className="mb-2">
          <span className="text-xs text-navy font-semibold uppercase tracking-widest">{m.nombre} · Madrid</span>
        </div>
        <h1 className="text-3xl font-bold text-navy mb-3 leading-tight">
          Proindiviso en {m.nombre}: calcula el valor de tu parte gratis
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          ¿Tienes un piso o local en proindiviso en {m.nombre} y no sabes qué vale tu parte?
          Usa la calculadora, recibe una valoración real en segundos y conecta con un abogado especialista.
          Sin compromiso, sin esperas.
        </p>
        <Calculadora municipio={m.nombre} />
        <section className="mt-12 space-y-6 text-gray-600 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-navy">Cómo se resuelve un proindiviso en {m.nombre}</h2>
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
        <section className="mt-12 bg-cream rounded-2xl border border-gold/20 p-6 text-center">
          <p className="text-lg font-bold text-navy mb-1">¿Prefieres hablar directamente?</p>
          <p className="text-sm text-gray-500 mb-4">Nuestro abogado especialista en {m.nombre} te atiende sin compromiso.</p>
          <a href={`tel:${TELEFONO_HREF}`}
            className="inline-block bg-navy hover:bg-navy-deep text-white font-medium px-8 py-3 rounded-xl transition-colors">
            Llamar ahora
          </a>
        </section>
      </main>
    )
  }

  notFound()
}
