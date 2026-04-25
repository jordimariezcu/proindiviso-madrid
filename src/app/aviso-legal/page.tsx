import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  robots: { index: false, follow: false },
}

export default function AvisoLegalPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 prose prose-sm text-gray-700">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Aviso Legal</h1>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la
        Información y Comercio Electrónico (LSSI-CE), se facilitan los datos de identificación del
        titular del sitio web:
      </p>
      <ul className="list-none p-0 space-y-1">
        <li><strong>Titular:</strong> [NOMBRE O RAZÓN SOCIAL DEL ABOGADO / DESPACHO]</li>
        <li><strong>NIF/CIF:</strong> [XXXXXXXX-X]</li>
        <li><strong>Domicilio:</strong> [DIRECCIÓN COMPLETA], Madrid</li>
        <li><strong>Email:</strong> [EMAIL DE CONTACTO]</li>
        <li><strong>Colegio profesional:</strong> Ilustre Colegio de Abogados de Madrid (ICAM)</li>
        <li><strong>Nº de colegiado:</strong> [NÚMERO DE COLEGIADO]</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">2. Objeto y ámbito de aplicación</h2>
      <p>
        El presente aviso legal regula el acceso y uso del sitio web proindiviso-madrid.es, cuya
        titularidad corresponde al firmante indicado anteriormente. El acceso y uso del sitio web
        implica la aceptación íntegra de las presentes condiciones.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">3. Propiedad intelectual</h2>
      <p>
        Todos los contenidos del sitio web (textos, imágenes, diseño, código fuente) son propiedad
        del titular o cuenta con las licencias necesarias para su uso. Queda prohibida su reproducción,
        distribución o comunicación pública sin autorización previa.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">4. Exclusión de responsabilidad</h2>
      <p>
        Los contenidos de este sitio web tienen carácter informativo y orientativo. No constituyen
        asesoramiento jurídico vinculante. El titular no se responsabiliza de los daños derivados del
        uso de la información publicada sin consulta profesional previa.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">5. Legislación aplicable</h2>
      <p>
        Las presentes condiciones se rigen por la legislación española. Para cualquier controversia,
        las partes se someten a los juzgados y tribunales de Madrid, con renuncia expresa a cualquier
        otro fuero que pudiera corresponderles.
      </p>

      <p className="text-xs text-gray-400 mt-10">Última actualización: abril 2026</p>
    </main>
  )
}
