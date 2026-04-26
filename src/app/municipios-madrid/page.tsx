import { Metadata } from 'next'
import Link from 'next/link'
import { municipios } from '@/lib/municipios'
import { TELEFONO_HREF } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Proindiviso en municipios de Madrid — Todos los ayuntamientos',
  description: `Especialistas en proindivisos en los ${municipios.length} municipios de la Comunidad de Madrid. Selecciona tu municipio para ver la calculadora con el juzgado competente y resolver tu situación.`,
  keywords: ['proindiviso madrid municipios', 'abogado proindiviso comunidad madrid', 'proindiviso pueblo madrid', 'extincion condominio madrid'],
}

const letras = [...new Set(
  municipios
    .slice()
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
    .map(m => m.nombre[0].toUpperCase())
)]

const municipiosOrdenados = municipios.slice().sort((a, b) =>
  a.nombre.localeCompare(b.nombre, 'es')
)

export default function MunicipiosMadridPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-navy transition-colors">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-navy font-medium">Municipios de Madrid</span>
      </nav>

      <div className="mb-2">
        <span className="text-xs text-navy font-semibold uppercase tracking-widest">Comunidad de Madrid</span>
      </div>
      <h1 className="text-3xl font-bold text-navy mb-4 leading-tight">
        Proindiviso en los {municipios.length} municipios de Madrid
      </h1>
      <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-2xl">
        ¿Tienes un proindiviso en un municipio de la Comunidad de Madrid? Selecciona tu localidad
        para ver la calculadora personalizada con el juzgado competente y la información específica de tu zona.
        Cubrimos todos los partidos judiciales de la Comunidad de Madrid.
      </p>

      {/* Índice alfabético */}
      <div className="flex flex-wrap gap-2 mb-8">
        {letras.map(l => (
          <a
            key={l}
            href={`#letra-${l}`}
            className="w-8 h-8 flex items-center justify-center bg-navy/10 hover:bg-navy hover:text-white text-navy text-sm font-semibold rounded-lg transition-all"
          >
            {l}
          </a>
        ))}
      </div>

      {/* Lista por letra */}
      <div className="space-y-8">
        {letras.map(l => {
          const grupo = municipiosOrdenados.filter(m => m.nombre[0].toUpperCase() === l)
          return (
            <section key={l} id={`letra-${l}`}>
              <h2 className="text-lg font-bold text-navy border-b border-navy/20 pb-2 mb-4">{l}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {grupo.map(m => (
                  <Link
                    key={m.slug}
                    href={`/proindiviso-${m.slug}-madrid`}
                    className="text-sm text-gray-700 hover:text-navy py-1.5 border-b border-gray-100 hover:border-navy/30 transition-colors"
                  >
                    {m.nombre}
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Info partidos judiciales */}
      <section className="mt-14 bg-cream rounded-2xl border border-navy/10 p-8">
        <h2 className="text-xl font-bold text-navy mb-4">Partidos judiciales en la Comunidad de Madrid</h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          En la Comunidad de Madrid existen 16 partidos judiciales. Cada municipio tiene asignado
          un Juzgado de Primera Instancia competente para tramitar los procedimientos de extinción
          de condominio cuando no hay acuerdo entre copropietarios.
        </p>
        <p className="text-gray-500 text-sm leading-relaxed">
          Al seleccionar tu municipio, te indicamos el juzgado concreto que tramitaría tu caso,
          los plazos habituales y la estrategia más rápida para resolver el proindiviso —
          con o sin acuerdo entre las partes.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-10 bg-navy rounded-2xl p-8 text-center">
        <p className="text-xl font-bold text-white mb-2">¿No encuentras tu municipio?</p>
        <p className="text-sm text-white/60 mb-6">Llámanos y te orientamos sin compromiso, sea cual sea tu localidad en Madrid.</p>
        <a
          href={`tel:${TELEFONO_HREF}`}
          className="inline-block bg-gold hover:bg-gold-dark text-navy-deep font-semibold px-10 py-3.5 rounded-xl transition-colors shadow-sm"
        >
          Llamar gratis
        </a>
      </section>
    </main>
  )
}
