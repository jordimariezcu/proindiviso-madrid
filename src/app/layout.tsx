import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TELEFONO_HREF, TELEFONO_DISPLAY } from '@/lib/config'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://proindiviso-madrid.es'),
  title: { default: 'Proindiviso Madrid', template: '%s | Proindiviso Madrid' },
  description: 'Calculadora de proindivisos y abogado especialista en Madrid.',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.className}>
      <body className="bg-white text-[#1a1a2e] antialiased">

        {/* Barra superior */}
        <div className="bg-navy-deep hidden sm:block">
          <div className="max-w-5xl mx-auto px-4 h-9 flex items-center justify-end gap-6">
            <span className="text-xs text-white/60">Despacho especializado en proindivisos · Madrid</span>
            <a href={`tel:${TELEFONO_HREF}`} className="text-xs text-gold font-medium hover:opacity-80 transition-opacity">
              ☎ {TELEFONO_DISPLAY}
            </a>
          </div>
        </div>

        {/* Header principal */}
        <header className="bg-navy sticky top-0 z-20 shadow-md">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2" aria-label="Proindiviso Madrid — inicio">
              <span className="text-xl font-bold text-white tracking-tight">
                Proindiviso<span className="text-gold">Madrid</span>
              </span>
              <span className="hidden sm:inline-block text-xs text-white/40 ml-1 mt-0.5 font-normal">· Abogados especialistas</span>
            </a>
            <a
              href={`tel:${TELEFONO_HREF}`}
              className="bg-gold hover:bg-gold-dark text-navy-deep text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Consulta gratuita
            </a>
          </div>
        </header>

        {children}

        <Analytics />

        {/* Footer */}
        <footer className="mt-20 bg-navy-deep text-white">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
              <div>
                <p className="text-lg font-bold text-white mb-1">Proindiviso<span className="text-gold">Madrid</span></p>
                <p className="text-sm text-white/50 leading-relaxed">
                  Despacho especializado en resolución de proindivisos y extinción de condominio en la Comunidad de Madrid.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Municipios</p>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li><a href="/proindiviso-madrid-madrid" className="hover:text-gold transition-colors">Proindiviso Madrid capital</a></li>
                  <li><a href="/proindiviso-alcobendas-madrid" className="hover:text-gold transition-colors">Proindiviso Alcobendas</a></li>
                  <li><a href="/proindiviso-mostoles-madrid" className="hover:text-gold transition-colors">Proindiviso Móstoles</a></li>
                  <li><a href="/proindiviso-alcala-de-henares-madrid" className="hover:text-gold transition-colors">Proindiviso Alcalá de Henares</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Contacto</p>
                <ul className="space-y-1.5 text-sm text-white/70">
                  <li><a href={`tel:${TELEFONO_HREF}`} className="hover:text-gold transition-colors">☎ {TELEFONO_DISPLAY}</a></li>
                  <li className="pt-2 text-xs text-white/40">Lun–Vie 9:00 – 19:00</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40">
              <p>© 2026 ProindivisoMadrid.es — Todos los derechos reservados</p>
              <div className="flex gap-5">
                <a href="/aviso-legal" className="hover:text-white/70 transition-colors">Aviso legal</a>
                <a href="/privacidad" className="hover:text-white/70 transition-colors">Privacidad</a>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}
