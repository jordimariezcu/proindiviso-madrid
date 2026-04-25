'use client'
import { useState } from 'react'

const faqs = [
  {
    q: '¿Qué es exactamente un proindiviso?',
    a: 'Un proindiviso es una situación jurídica en la que dos o más personas son titulares de un mismo bien de forma simultánea, sin división física. Es habitual en herencias donde los herederos pasan a ser copropietarios de un piso o local comercial.'
  },
  {
    q: '¿Puedo vender mi parte sin permiso de los demás?',
    a: 'Sí. Puedes vender tu cuota a un tercero, aunque los demás copropietarios tienen derecho de tanteo y retracto. En la práctica, los compradores de proindivisos suelen ser inversores especializados que asumen el riesgo de gestionar la situación.'
  },
  {
    q: '¿Qué es la extinción de condominio?',
    a: 'Es el procedimiento legal —judicial o extrajudicial— que pone fin a la copropiedad. Si hay acuerdo, se firma ante notario. Si no lo hay, cualquier copropietario puede acudir al juzgado para forzar la venta o adjudicación del bien.'
  },
  {
    q: '¿Por qué se aplica un descuento al vender una cuota?',
    a: 'Comprar una cuota implica riesgos: posibles conflictos, necesidad de acudir a juicio, gastos compartidos. El mercado descuenta ese riesgo generalmente entre un 30% y un 50% sobre el valor proporcional. A mayor conflictividad, mayor descuento.'
  },
  {
    q: '¿Cuánto tiempo tarda en resolverse?',
    a: 'Depende de la vía. Un acuerdo entre copropietarios puede cerrarse en semanas. La vía judicial para la extinción de condominio puede tardar entre 1 y 3 años dependiendo del juzgado y la complejidad del caso.'
  },
  {
    q: '¿Qué impuestos se pagan en la Comunidad de Madrid?',
    a: 'La extinción de condominio tributa por Actos Jurídicos Documentados (AJD) al 0,75% en Madrid, mucho más ventajoso que el ITP de una compraventa ordinaria. Si hay ganancia patrimonial, deberás incluirla en el IRPF del ejercicio correspondiente.'
  },
  {
    q: '¿Qué pasa si un heredero no quiere vender?',
    a: 'Ningún copropietario puede ser obligado a permanecer en el proindiviso indefinidamente. El artículo 400 del Código Civil permite a cualquier copropietario exigir la división. Si no hay acuerdo, el juez puede ordenar la subasta pública del bien.'
  }
]

export default function FAQ({ municipio }: { municipio?: string }) {
  const [open, setOpen] = useState<number | null>(null)

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  }

  return (
    <section className="mt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Preguntas frecuentes sobre proindivisos{municipio ? ` en ${municipio}` : ''}
      </h2>
      <p className="text-gray-500 mb-6">Todo lo que necesitas saber antes de tomar una decisión.</p>
      <div className="divide-y divide-gray-100">
        {faqs.map((faq, i) => (
          <div key={i} className="py-4">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center text-left gap-4"
            >
              <span className="font-medium text-gray-900">{faq.q}</span>
              <span className={`text-gray-400 text-xl flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open === i && (
              <p className="mt-3 text-gray-600 leading-relaxed text-sm">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
