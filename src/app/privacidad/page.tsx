import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 prose prose-sm text-gray-700">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Política de Privacidad</h1>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">1. Responsable del tratamiento</h2>
      <ul className="list-none p-0 space-y-1">
        <li><strong>Responsable:</strong> [NOMBRE O RAZÓN SOCIAL DEL ABOGADO / DESPACHO]</li>
        <li><strong>NIF/CIF:</strong> [XXXXXXXX-X]</li>
        <li><strong>Dirección:</strong> [DIRECCIÓN COMPLETA], Madrid</li>
        <li><strong>Email de contacto DPD:</strong> [EMAIL DE CONTACTO]</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">2. Datos que recogemos</h2>
      <p>
        A través del formulario de contacto de este sitio web recogemos: nombre, teléfono, dirección
        de correo electrónico (opcional), municipio y datos de la valoración introducida (valor del
        inmueble, porcentaje de participación, estado de ocupación y relación entre copropietarios).
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">3. Finalidad del tratamiento</h2>
      <p>
        Los datos se tratan para: (a) contactar con el usuario a fin de prestarle el servicio de
        asesoramiento jurídico solicitado; (b) enviarle la valoración estimada de su proindiviso.
        No se utilizarán para envío de comunicaciones comerciales sin consentimiento previo.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">4. Base jurídica</h2>
      <p>
        El tratamiento se basa en el consentimiento del interesado (art. 6.1.a RGPD), otorgado al
        enviar el formulario, así como en la ejecución de las medidas precontractuales solicitadas
        (art. 6.1.b RGPD).
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">5. Destinatarios</h2>
      <p>
        Los datos no se ceden a terceros salvo obligación legal. Se utilizan los siguientes
        encargados de tratamiento para la prestación técnica del servicio:
      </p>
      <ul>
        <li><strong>Supabase Inc.</strong> (almacenamiento de datos) — servidores en la UE</li>
        <li><strong>Resend Inc.</strong> (envío de notificaciones al abogado) — cumple con SCCs</li>
        <li><strong>Vercel Inc.</strong> (alojamiento web) — cumple con SCCs</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">6. Plazo de conservación</h2>
      <p>
        Los datos se conservarán durante el tiempo necesario para atender la consulta y, en su caso,
        durante el plazo de prescripción de las acciones legales aplicables (máximo 3 años desde el
        último contacto), salvo que el usuario solicite su supresión antes.
      </p>

      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-2">7. Derechos del interesado</h2>
      <p>
        Puede ejercitar los derechos de acceso, rectificación, supresión, limitación, portabilidad
        y oposición dirigiendo un escrito a [EMAIL DE CONTACTO], adjuntando copia de su DNI.
        También puede presentar reclamación ante la Agencia Española de Protección de Datos
        (www.aepd.es).
      </p>

      <p className="text-xs text-gray-400 mt-10">Última actualización: abril 2026</p>
    </main>
  )
}
