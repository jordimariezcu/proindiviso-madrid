import { NextRequest, NextResponse } from 'next/server'
import { Lead } from '@/lib/types'

function generateLeadId(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 90000) + 10000
  return `PRO-${year}-${rand}`
}

async function sendEmailToAbogado(lead: Lead, leadId: string) {
  const resendKey = process.env.RESEND_API_KEY
  const abogadoEmail = process.env.ABOGADO_EMAIL

  if (!resendKey || !abogadoEmail) return

  const body = {
    from: 'leads@proindiviso-madrid.es',
    to: abogadoEmail,
    subject: `Nuevo lead ${leadId} — ${lead.municipio}`,
    html: `
      <div style="font-family:monospace;font-size:14px;line-height:1.8;padding:20px;background:#f9f9f9;border-radius:8px">
        <h2 style="font-family:sans-serif;font-size:18px;margin-bottom:16px">Nuevo lead — proindiviso-madrid.es</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="color:#666;padding:4px 0;width:200px">ID Lead</td><td><strong>${leadId}</strong></td></tr>
          <tr><td style="color:#666;padding:4px 0">Nombre</td><td>${lead.nombre}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Teléfono</td><td><strong><a href="tel:${lead.telefono}">${lead.telefono}</a></strong></td></tr>
          <tr><td style="color:#666;padding:4px 0">Email</td><td>${lead.email || '—'}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Municipio</td><td>${lead.municipio}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Valor inmueble</td><td>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(lead.valor_inmueble)}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Su parte</td><td>${lead.porcentaje}%</td></tr>
          <tr><td style="color:#666;padding:4px 0">Descuento aplicado</td><td>${Math.round(lead.descuento * 100)}%</td></tr>
          <tr><td style="color:#666;padding:4px 0">Valor estimado venta</td><td><strong>${new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(lead.valor_estimado)}</strong></td></tr>
          <tr><td style="color:#666;padding:4px 0">Ocupación</td><td>${lead.ocupacion}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Relación propietarios</td><td>${lead.relacion}</td></tr>
          <tr><td style="color:#666;padding:4px 0">Complejidad caso</td><td><strong>${lead.complejidad}</strong></td></tr>
          <tr><td style="color:#666;padding:4px 0">Captado</td><td>${new Date().toLocaleString('es-ES')}</td></tr>
        </table>
        <div style="margin-top:20px;padding:12px;background:#185FA5;border-radius:6px;text-align:center">
          <a href="tel:${lead.telefono}" style="color:white;font-family:sans-serif;font-weight:bold;text-decoration:none;font-size:16px">
            Llamar ahora: ${lead.telefono}
          </a>
        </div>
      </div>
    `
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

async function saveLeadToSupabase(lead: Lead, leadId: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) return

  await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ ...lead, id: leadId })
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const lead: Lead = body

    if (
      typeof lead.nombre !== 'string' || !lead.nombre.trim() ||
      typeof lead.telefono !== 'string' || !lead.telefono.trim() ||
      typeof lead.municipio !== 'string' || !lead.municipio.trim()
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    if (
      typeof lead.valor_inmueble !== 'number' || lead.valor_inmueble <= 0 ||
      typeof lead.porcentaje !== 'number' || lead.porcentaje < 1 || lead.porcentaje > 99 ||
      typeof lead.descuento !== 'number' || lead.descuento < 0 || lead.descuento > 1 ||
      typeof lead.valor_estimado !== 'number' || lead.valor_estimado < 0
    ) {
      return NextResponse.json({ error: 'Datos de valoración inválidos' }, { status: 400 })
    }

    const leadId = generateLeadId()

    await Promise.allSettled([
      sendEmailToAbogado(lead, leadId),
      saveLeadToSupabase(lead, leadId)
    ])

    return NextResponse.json({ success: true, leadId })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
