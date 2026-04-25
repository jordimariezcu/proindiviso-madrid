import { Metadata } from 'next'
import Link from 'next/link'
import { municipios } from '@/lib/municipios'
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
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-2">
        <span className="text-xs text-blue-600 font-medium uppercase tracking-widest">Comunidad de Madrid</span>
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-3 leading-tight">
        Proindiviso en Madrid: calcula el valor de tu parte gratis
      </h1>
      <p className="text-gray-500 text-base leading-relaxed mb-8">
        ¿Tienes un piso o local en proindiviso y no sabes qué vale tu parte?
        Calcula en segundos, recibe una valoración real y conecta con un abogado especialista. Sin compromiso.
      </p>

      <Calculadora municipio="Madrid" />

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cobertura en todos los municipios de Madrid</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {topMunicipios.map(m => (
            <Link key={m.slug} href={`/proindiviso-${m.slug}-madrid`}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline py-1">
              {m.nombre}
            </Link>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-3">Y {municipios.length - 20} municipios más en la Comunidad de Madrid.</p>
      </section>

      <section className="mt-12 space-y-4 text-gray-600 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-gray-900">¿Qué es un proindiviso y cómo se resuelve?</h2>
        <p>
          Un proindiviso surge cuando dos o más personas son copropietarias de un mismo inmueble,
          habitualmente tras una herencia, un divorcio o una compra conjunta. La situación puede
          volverse conflictiva cuando los copropietarios no se ponen de acuerdo sobre qué hacer con el bien.
        </p>
        <p>
          En Madrid existen varias vías de resolución: venta pactada, venta de cuota a tercero especializado
          o acción judicial de extinción de condominio. La estrategia óptima depende de la relación entre
          propietarios, el valor del inmueble y la urgencia de la situación.
        </p>
      </section>

      <FAQ />

      <section className="mt-12 bg-blue-50 rounded-xl p-6 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-1">¿Tienes dudas? Te llamamos</p>
        <p className="text-sm text-gray-500 mb-4">Consulta gratuita con nuestro abogado especialista en proindivisos.</p>
        <a href={`tel:${TELEFONO_HREF}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-colors">
          Llamar gratis
        </a>
      </section>
    </main>
  )
}
