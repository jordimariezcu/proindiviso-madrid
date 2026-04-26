import { Metadata } from 'next'
import Link from 'next/link'
import { municipios } from '@/lib/municipios'
import { distritos } from '@/lib/distritos'
import Calculadora from '@/components/Calculadora'
import FAQ from '@/components/FAQ'
import { TELEFONO_HREF } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Proindiviso Madrid — Calcula el valor de tu parte y habla con un abogado gratis',
  description: 'Calculadora gratuita de proindivisos en Madrid. Valora tu parte en segundos y conecta con un abogado especialista. Cobertura en todos los municipios de Madrid.',
  keywords: ['proindiviso madrid', 'abogado proindiviso madrid', 'vender proindiviso', 'disolucion condominio madrid'],
}

const topMunicipios = municipios.slice(0, 20)

export default function HomePage() {
  return (
    <main>

      {/* Hero */}
      <section className="bg-cream border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold text-navy uppercase tracking-widest mb-3">
              Especialistas en proindivisos · Madrid
            </span>
            <h1 className="text-4xl font-bold text-navy leading-tight mb-4">
              Calcula el valor de tu parte en un proindiviso
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-6">
              ¿Tienes un piso o local en proindiviso y no sabes qué vale tu parte?
              Calcula en segundos, recibe una valoración real y conecta con un abogado especialista. Sin compromiso.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
                <span className="text-gray-600">Valoración gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
                <span className="text-gray-600">Sin juicio si hay acuerdo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-navy inline-block"></span>
                <span className="text-gray-600">Respuesta en 2 horas</span>
              </div>
            </div>
          </div>
          <div>
            <Calculadora municipio="Madrid" />
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

        {/* Municipios */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-2">Cobertura en todos los municipios de Madrid</h2>
          <p className="text-gray-500 text-sm mb-5">Selecciona tu municipio para ver la calculadora personalizada con el juzgado competente.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {topMunicipios.map(m => (
              <Link
                key={m.slug}
                href={`/proindiviso-${m.slug}-madrid`}
                className="text-sm text-navy hover:text-gold font-medium py-1.5 border-b border-gray-100 hover:border-gold transition-colors"
              >
                {m.nombre}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-4">Y {municipios.length - 20} municipios más en la Comunidad de Madrid.</p>
        </section>

        {/* Madrid capital — distritos */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-2">Proindiviso en Madrid capital</h2>
          <p className="text-gray-500 text-sm mb-5">Selecciona tu distrito para ver la calculadora con el precio real de la zona.</p>
          <div className="flex flex-wrap gap-2">
            {distritos.map(d => (
              <Link
                key={d.slug}
                href={`/proindiviso-distrito-${d.slug}-madrid`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-navy hover:text-navy rounded-full text-sm text-gray-700 transition-all"
              >
                {d.nombre}
                <span className="text-xs text-gray-400">{d.barrios.length > 1 ? `${d.barrios.length} barrios` : '1 barrio'}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Qué es */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-navy mb-4">¿Qué es un proindiviso y cómo se resuelve?</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              Un proindiviso surge cuando dos o más personas son copropietarias de un mismo inmueble,
              habitualmente tras una herencia, un divorcio o una compra conjunta. La situación puede
              volverse conflictiva cuando los copropietarios no se ponen de acuerdo.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              En Madrid existen varias vías de resolución: venta pactada, venta de cuota a tercero especializado
              o acción judicial de extinción de condominio. La estrategia óptima depende de la relación entre
              propietarios, el valor del inmueble y la urgencia de la situación.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { paso: '01', titulo: 'Valoración', desc: 'Calculamos el valor real de tu parte aplicando el descuento de mercado.' },
              { paso: '02', titulo: 'Estrategia', desc: 'El abogado analiza la vía más rápida: acuerdo, venta o juicio.' },
              { paso: '03', titulo: 'Resolución', desc: 'Gestión completa hasta la firma ante notario o sentencia judicial.' },
            ].map(({ paso, titulo, desc }) => (
              <div key={paso} className="flex gap-4 items-start">
                <span className="text-xs font-bold text-navy bg-navy/10 rounded-lg px-2.5 py-1.5 shrink-0">{paso}</span>
                <div>
                  <p className="font-semibold text-navy text-sm mb-0.5">{titulo}</p>
                  <p className="text-gray-500 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FAQ />

        {/* CTA final */}
        <section className="bg-navy rounded-2xl p-8 sm:p-10 text-center">
          <p className="text-xl font-bold text-white mb-2">¿Tienes dudas? Te llamamos</p>
          <p className="text-sm text-white/60 mb-6">Consulta gratuita con nuestro abogado especialista en proindivisos.</p>
          <a
            href={`tel:${TELEFONO_HREF}`}
            className="inline-block bg-gold hover:bg-gold-dark text-white font-semibold px-10 py-3.5 rounded-xl transition-colors shadow-sm"
          >
            Llamar gratis
          </a>
        </section>

      </div>
    </main>
  )
}
