// Cambia este número antes de desplegar en producción
// O añade NEXT_PUBLIC_TELEFONO en las variables de entorno de Vercel
export const TELEFONO_HREF = process.env.NEXT_PUBLIC_TELEFONO ?? 'XXXXXXXXX'
export const TELEFONO_DISPLAY = TELEFONO_HREF.replace(/^\+34/, '')
