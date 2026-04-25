export interface Municipio {
  slug: string
  nombre: string
  provincia: string
  poblacion: number
  juzgado: string
}

export interface Lead {
  id?: string
  nombre: string
  telefono: string
  email?: string
  municipio: string
  valor_inmueble: number
  porcentaje: number
  descuento: number
  valor_estimado: number
  complejidad: string
  ocupacion: string
  relacion: string
  created_at?: string
}
