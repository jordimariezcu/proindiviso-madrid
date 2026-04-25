'use client'

import { useState } from 'react'
import { calcularDescuento, formatNumber } from '@/lib/municipios'

interface Props {
  municipio: string
}

type Ocupacion = 'vacio' | 'ocupado' | 'alquilado'
type Relacion = 'buena' | 'tensa' | 'ninguna'

export default function Calculadora({ municipio }: Props) {
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
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre, telefono, email, municipio,
          valor_inmueble: valorNum,
          porcentaje,
          descuento,
          valor_estimado: valorVenta,
          complejidad,
          ocupacion,
          relacion
        })
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
    vacio: 'Vacío', ocupado: 'Ocupado por copropietario', alquilado: 'Alquilado'
  }
  const relacionLabels: Record<Relacion, string> = {
    buena: 'Buena', tensa: 'Tensa', ninguna: 'Sin relación'
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Paso 1</p>
        <p className="font-medium text-gray-900 mb-3">Valor estimado de mercado de la propiedad</p>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
          <input
            type="number"
            value={valor}
            onChange={e => setValor(e.target.value)}
            placeholder="250000"
            className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Paso 2</p>
        <p className="font-medium text-gray-900 mb-3">Tu porcentaje de propiedad</p>
        <div className="flex items-center gap-4">
          <input
            type="range" min="1" max="99" step="1" value={porcentaje}
            onChange={e => setPorcentaje(Number(e.target.value))}
            className="flex-1 h-2 accent-blue-600"
          />
          <span className="text-xl font-medium text-gray-900 w-16 text-right">{porcentaje}%</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Paso 3</p>
        <p className="font-medium text-gray-900 mb-3">Estado de ocupación</p>
        <div className="flex flex-wrap gap-2">
          {(['vacio', 'ocupado', 'alquilado'] as Ocupacion[]).map(o => (
            <button key={o} onClick={() => setOcupacion(o)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                ocupacion === o
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}>
              {ocupacionLabels[o]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Paso 4</p>
        <p className="font-medium text-gray-900 mb-3">Relación entre propietarios</p>
        <div className="flex flex-wrap gap-2">
          {(['buena', 'tensa', 'ninguna'] as Relacion[]).map(r => (
            <button key={r} onClick={() => setRelacion(r)}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                relacion === r
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}>
              {relacionLabels[r]}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {!showResult && (
        <button onClick={handleCalcular}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl text-base transition-colors">
          Calcular valoración gratuita
        </button>
      )}

      {showResult && (
        <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className={`p-5 space-y-3 ${!unlocked ? 'blur-sm select-none pointer-events-none' : ''}`}>
            <p className="font-medium text-gray-900 mb-4">Tu informe de valoración</p>
            {[
              ['Valor total del inmueble', `€${formatNumber(valorNum)}`],
              ['Tu parte proporcional ('+porcentaje+'%)', `€${formatNumber(parte)}`],
              ['Descuento por proindiviso', `${Math.round(descuento * 100)}%`],
              ['Valor estimado de venta', `€${formatNumber(valorVenta)}`, true],
              ['Complejidad del caso', complejidad],
              ['Tiempo estimado de resolución', tiempo],
            ].map(([label, value, highlight]) => (
              <div key={label as string} className="flex justify-between items-baseline py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500">{label as string}</span>
                <span className={`font-medium ${highlight ? 'text-2xl text-blue-600' : 'text-base text-gray-900'}`}>
                  {value as string}
                </span>
              </div>
            ))}
          </div>

          {!unlocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 p-6">
              <p className="text-lg font-medium text-gray-900 mb-1 text-center">Tu valoración está lista</p>
              <p className="text-sm text-gray-500 mb-5 text-center">
                Déjanos tu teléfono y te la enviamos ahora mismo. Te llamamos sin compromiso.
              </p>
              <div className="w-full max-w-sm space-y-3">
                <input type="text" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="tel" placeholder="Tu teléfono" value={telefono} onChange={e => setTelefono(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="Email (opcional)" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button onClick={handleDesbloquear} disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-xl transition-colors">
                  {loading ? 'Enviando...' : 'Desbloquear informe gratuito'}
                </button>
                <p className="text-xs text-gray-400 text-center">Sin spam. Solo te contacta el abogado del caso.</p>
              </div>
            </div>
          )}

          {unlocked && leadId && (
            <div className="mt-4 mx-5 mb-5 bg-green-50 text-green-800 rounded-lg p-3 text-sm text-center">
              Perfecto, {nombre}. Te llamamos en menos de 2 horas. Referencia: {leadId}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
