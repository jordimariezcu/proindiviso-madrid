import type { Metadata } from 'next'
import './globals.css'
import { TELEFONO_HREF, TELEFONO_DISPLAY } from '@/lib/config'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://proindiviso-madrid.es'),
  title: { default: 'Proindiviso Madrid', template: '%s | Proindiviso Madrid' },
  description: 'Calculadora de proindivisos y abogado especialista en Madrid.',
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold text-gray-900 text-base">
              Proindiviso<span className="text-blue-600">Madrid</span>
            </a>
            <a href={`tel:${TELEFONO_HREF}`} className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Llamada gratuita
            </a>
          </div>
        </header>
        {children}
        <Analytics />
        <footer className="mt-16 border-t border-gray-100 bg-white">
          <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-400">
              <p>© 2026 ProindivisoMadrid.es</p>
              <div className="flex gap-4">
                <a href="/aviso-legal" className="hover:text-gray-600">Aviso legal</a>
                <a href="/privacidad" className="hover:text-gray-600">Privacidad</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
