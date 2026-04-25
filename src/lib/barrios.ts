import barriosData from '@/data/barrios-madrid.json'

export interface Barrio {
  slug: string
  nombre: string
  distrito: string
  precio_m2: number
  nota: string
}

export const barrios: Barrio[] = barriosData as Barrio[]

export function getBarrio(slug: string): Barrio | undefined {
  return barrios.find(b => b.slug === slug)
}

export function getAllBarrioSlugs(): string[] {
  return barrios.map(b => b.slug)
}

export function getBarriosByDistrito(distrito: string): Barrio[] {
  return barrios.filter(b => b.distrito === distrito)
}

export function getBarriosOrdenados(): Barrio[] {
  return [...barrios].sort((a, b) => b.precio_m2 - a.precio_m2)
}
