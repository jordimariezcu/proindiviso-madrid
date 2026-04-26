import { barrios, Barrio } from './barrios'

export interface Distrito {
  nombre: string
  slug: string
  barrios: Barrio[]
  precioMedio: number
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export const distritos: Distrito[] = (() => {
  const names = [...new Set(barrios.map(b => b.distrito))].sort()
  return names.map(nombre => {
    const bs = barrios.filter(b => b.distrito === nombre)
    return {
      nombre,
      slug: slugify(nombre),
      barrios: bs,
      precioMedio: Math.round(bs.reduce((s, b) => s + b.precio_m2, 0) / bs.length),
    }
  })
})()

export function getDistrito(slug: string): Distrito | undefined {
  return distritos.find(d => d.slug === slug)
}

export function getAllDistritoSlugs(): string[] {
  return distritos.map(d => d.slug)
}
