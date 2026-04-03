import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'Black Pines — Caderno do Mestre',
  description: 'Sistema de gestão de campanha RPG — Black Pines',
  icons: { icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕</text></svg>' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full flex" style={{ background: '#0f0f0f' }}>
        <Sidebar />
        <main
          className="flex-1 ml-64 min-h-screen overflow-y-auto"
          style={{ background: '#0f0f0f' }}
        >
          {children}
        </main>
      </body>
    </html>
  )
}
