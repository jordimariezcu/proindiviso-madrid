import municipiosData from '@/data/municipios.json'
import { Municipio } from './types'

export const municipios: Municipio[] = municipiosData as Municipio[]

export function getMunicipio(slug: string): Municipio | undefined {
  return municipios.find(m => m.slug === slug)
}

export function getAllSlugs(): string[] {
  return municipios.map(m => m.slug)
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-ES').format(Math.round(n))
}

export function calcularDescuento(ocupacion: string, relacion: string): number {
  let base = 0.30
  if (ocupacion === 'ocupado') base += 0.10
  if (relacion === 'tensa') base += 0.05
  if (relacion === 'ninguna') base += 0.10
  return Math.min(base, 0.50)
}
