import { MetadataRoute } from 'next'
import { municipios } from '@/lib/municipios'
import { barrios } from '@/lib/barrios'
import { distritos } from '@/lib/distritos'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://proindiviso-madrid.es'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/municipios-madrid`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
  ]

  const municipioPages: MetadataRoute.Sitemap = municipios.map(m => ({
    url: `${base}/proindiviso-${m.slug}-madrid`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const barrioPages: MetadataRoute.Sitemap = barrios.map(b => ({
    url: `${base}/proindiviso-${b.slug}-madrid-capital`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const distritoPages: MetadataRoute.Sitemap = distritos.map(d => ({
    url: `${base}/proindiviso-distrito-${d.slug}-madrid`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...municipioPages, ...barrioPages, ...distritoPages]
}
