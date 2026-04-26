'use client'

import { useState } from 'react'
import { calcularDescuento, formatNumber } from '@/lib/municipios'

interface Props {
  municipio: string
  precioM2?: number
}

type Ocupacion = 'vacio' | 'ocupado' | 'alquilado'
type Relacion = 'buena' | 'tensa' | 'ninguna'

const inputCls = 'w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-navy'
const chipBase = 'px-4 py-2 rounded-full text-sm border transition-all'
const chipActive = 'bg-navy text-white border-navy'
const chipInactive = 'bg-white text-gray-700 border-gray-200 hover:border-navy/40'

export default function Calculadora({ municipio, precioM2 }: Props) {
  const [metros, setMetros] = useState('')
  const [valor, setValor] = useState('')
  const [porcentaje, setPorcentaje] = useState(50)
  const [ocupacion, setOcupacion] = useState<Ocupacion>('vacio')
  const [relacion, setRelacion] = useState<Relacion>('buena')
  const [showResult, setShowResult] = useState(false)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [leadId, setLeadId] = useState('')
  const [error, setError] = useState('')
  const [consentido, setConsentido] = useState(false)

  const valorNum = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0
  const descuento = calcularDescuento(ocupacion, relacion)
  const parte = valorNum * (porcentaje / 100)
  const valorVenta = parte * (1 - descuento)

  const complejidad = (() => {
    if (relacion === 'ninguna' && ocupacion === 'ocupado') return 'Alta'
    if (relacion === 'tensa' || ocupacion === 'ocupado') return 'Media'
    return 'Baja'
  })()

  const tiempo = (() => {
    if (complejidad === 'Alta') return '6–24 meses (vía judicial)'
    if (complejidad === 'Media') return '1–6 meses'
    return '2–8 semanas'
  })()

  function handleCalcular() {
    if (!valorNum || valorNum <= 0) {
      setError('Introduce el valor de la propiedad para continuar.')
      return
    }
    setError('')
    setShowResult(true)
  }

  async function handleDesbloquear() {
    if (!nombre.trim() || !telefono.trim()) {
      setError('Introduce tu nombre y teléfono para desbloquear el informe.')
      return
    }
    if (!/^(\+34|0034)?[679]\d{8}$/.test(telefono.replace(/\s/g, ''))) {
      setError('Introduce un teléfono español válido (9 dígitos, empieza por 6, 7 o 9).')
      return
    }
    if (!consentido) {
      setError('Debes aceptar la política de privacidad para continuar.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, telefono, email, municipio,
          valor_inmueble: valorNum, porcentaje, descuento,
          valor_estimado: valorVenta, complejidad, ocupacion, relacion,
        }),
      })
      const data = await res.json()
      if (data.leadId) setLeadId(data.leadId)
      setUnlocked(true)
    } catch {
      setError('Error al enviar. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const ocupacionLabels: Record<Ocupacion, string> = {
    vacio: 'Vacío', ocupado: 'Ocupado por copropietario', alquilado: 'Alquilado',
  }
  const relacionLabels: Record<Relacion, string> = {
    buena: 'Buena', tensa: 'Tensa', ninguna: 'Sin relación',
  }

  return (
    <div className="space-y-3">

      {precioM2 && (
        <div className="bg-navy/5 border border-navy/15 rounded-xl p-5">
          <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-1">Calculador de valor</p>
          <label htmlFor="calc-metros" className="block font-semibold text-navy mb-3">
            ¿Cuántos m² tiene la propiedad?
          </label>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <input
                id="calc-metros"
                type="text" inputMode="numeric" value={metros}
                onChange={e => {
                  const m = e.target.value
                  setMetros(m)
                  const num = parseFloat(m.replace(',', '.'))
                  if (num > 0) setValor(Math.round(num * precioM2).toString())
                  else setValor('')
                }}
                placeholder="80"
                aria-label="Superficie en metros cuadrados"
                className="w-28 pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-navy bg-white"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" aria-hidden="true">m²</span>
            </div>
            <span className="text-sm text-gray-400" aria-hidden="true">×</span>
            <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-center shrink-0">
              <p className="text-sm font-semibold text-navy">{precioM2.toLocaleString('es-ES')} €/m²</p>
              <p className="text-xs text-gray-500">precio medio zona</p>
            </div>
            {metros && parseFloat(metros) > 0 && (
              <>
                <span className="text-sm text-gray-400" aria-hidden="true">=</span>
                <div className="bg-navy text-white rounded-lg px-3 py-2.5 text-sm font-bold shrink-0">
                  {Math.round(parseFloat(metros.replace(',', '.')) * precioM2).toLocaleString('es-ES')} €
                </div>
              </>
            )}
          </div>
          {metros && parseFloat(metros) > 0 && (
            <p className="text-xs text-navy/60 mt-2">✓ Valor aplicado automáticamente al Paso 1</p>
          )}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-1">Paso 1</p>
        <label htmlFor="valor-inmueble" className="block font-semibold text-navy mb-3">
          Valor estimado de mercado
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium" aria-hidden="true">€</span>
          <input
            id="valor-inmueble"
            type="text" inputMode="numeric" value={valor}
            onChange={e => setValor(e.target.value)}
            placeholder="250.000"
            aria-label="Valor estimado del inmueble en euros"
            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-1">Paso 2</p>
        <label htmlFor="porcentaje-propiedad" className="block font-semibold text-navy mb-3">
          Tu porcentaje de propiedad
        </label>
        <div className="flex items-center gap-4">
          <input
            id="porcentaje-propiedad"
            type="range" min="1" max="99" step="1" value={porcentaje}
            onChange={e => setPorcentaje(Number(e.target.value))}
            aria-label={`Porcentaje de propiedad: ${porcentaje}%`}
            className="flex-1 h-2 accent-navy"
          />
          <span className="text-xl font-semibold text-navy w-16 text-right" aria-live="polite">{porcentaje}%</span>
        </div>
      </div>

      <fieldset className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <legend className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-1 float-left w-full">Paso 3</legend>
        <p className="font-semibold text-navy mb-3 mt-5">Estado de ocupación</p>
        <div className="flex flex-wrap gap-2">
          {(['vacio', 'ocupado', 'alquilado'] as Ocupacion[]).map(o => (
            <button key={o} onClick={() => setOcupacion(o)}
              aria-pressed={ocupacion === o}
              className={`${chipBase} ${ocupacion === o ? chipActive : chipInactive}`}>
              {ocupacionLabels[o]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <legend className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-1 float-left w-full">Paso 4</legend>
        <p className="font-semibold text-navy mb-3 mt-5">Relación entre propietarios</p>
        <div className="flex flex-wrap gap-2">
          {(['buena', 'tensa', 'ninguna'] as Relacion[]).map(r => (
            <button key={r} onClick={() => setRelacion(r)}
              aria-pressed={relacion === r}
              className={`${chipBase} ${relacion === r ? chipActive : chipInactive}`}>
              {relacionLabels[r]}
            </button>
          ))}
        </div>
      </fieldset>

      {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}

      {!showResult && (
        <button onClick={handleCalcular}
          className="w-full py-4 bg-navy hover:bg-navy-deep text-white font-semibold rounded-xl text-base transition-colors shadow-sm">
          Calcular valoración gratuita →
        </button>
      )}

      {showResult && (
        <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className={`p-5 space-y-2 ${!unlocked ? 'blur-sm select-none pointer-events-none' : ''}`} aria-hidden={!unlocked}>
            <p className="font-semibold text-navy mb-3">Tu informe de valoración</p>
            {[
              ['Valor total del inmueble', `€${formatNumber(valorNum)}`],
              [`Tu parte proporcional (${porcentaje}%)`, `€${formatNumber(parte)}`],
              ['Descuento por proindiviso', `${Math.round(descuento * 100)}%`],
              ['Valor estimado de venta', `€${formatNumber(valorVenta)}`, true],
              ['Complejidad del caso', complejidad],
              ['Tiempo estimado de resolución', tiempo],
            ].map(([label, value, highlight]) => (
              <div key={label as string} className="flex justify-between items-baseline py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{label as string}</span>
                <span className={`font-semibold ${highlight ? 'text-2xl text-navy' : 'text-base text-gray-900'}`}>
                  {value as string}
                </span>
              </div>
            ))}
          </div>

          {!unlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/85 backdrop-blur-sm p-6">
              <p className="text-lg font-semibold text-navy mb-1 text-center">Tu valoración está lista</p>
              <p className="text-sm text-gray-600 mb-5 text-center">
                Déjanos tu teléfono y te la enviamos ahora mismo.
              </p>
              <div className="w-full max-w-sm space-y-3">
                <div>
                  <label htmlFor="lead-nombre" className="sr-only">Tu nombre</label>
                  <input id="lead-nombre" type="text" placeholder="Tu nombre" value={nombre}
                    onChange={e => setNombre(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="lead-telefono" className="sr-only">Tu teléfono</label>
                  <input id="lead-telefono" type="tel" placeholder="Tu teléfono" value={telefono}
                    onChange={e => setTelefono(e.target.value)} className={inputCls} autoComplete="tel" />
                </div>
                <div>
                  <label htmlFor="lead-email" className="sr-only">Email (opcional)</label>
                  <input id="lead-email" type="email" placeholder="Email (opcional)" value={email}
                    onChange={e => setEmail(e.target.value)} className={inputCls} autoComplete="email" />
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    id="consent-check"
                    type="checkbox"
                    checked={consentido}
                    onChange={e => setConsentido(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-navy cursor-pointer"
                  />
                  <label htmlFor="consent-check" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                    He leído y acepto la{' '}
                    <a href="/privacidad" target="_blank" rel="noopener noreferrer"
                      className="text-navy underline hover:opacity-75">política de privacidad</a>.
                    {' '}Consiento que mis datos sean tratados para contactarme en relación con mi consulta sobre proindivisos.
                  </label>
                </div>
                {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}
                <button
                  onClick={handleDesbloquear}
                  disabled={loading || !consentido}
                  className="w-full py-3 bg-navy hover:bg-navy-deep disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
                >
                  {loading ? 'Enviando...' : 'Desbloquear informe gratuito'}
                </button>
                <p className="text-xs text-gray-500 text-center">Sin spam. Solo te contacta el abogado del caso.</p>
              </div>
            </div>
          )}

          {unlocked && leadId && (
            <div className="mt-4 mx-5 mb-5 bg-green-50 text-green-800 border border-green-200 rounded-lg p-3 text-sm text-center" role="status">
              Perfecto, {nombre}. Te llamamos en menos de 2 horas. Referencia: <strong>{leadId}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
