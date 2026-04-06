'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import dynamic from 'next/dynamic'

const FBIDocumentPDF = dynamic(() => import('./FBIDocumentPDF'), { ssr: false })

export default function PrintButton() {
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    setLoading(true)
    try {
      const { pdf } = await import('@react-pdf/renderer')
      const { default: Doc } = await import('./FBIDocumentPDF')
      const blob = await pdf(<Doc />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'DPF_SaoFranciscoDePaula_RS_1995.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="no-print flex items-center gap-2 cursor-pointer transition-all duration-200 disabled:opacity-50"
      style={{
        background: 'rgba(139,0,0,0.15)',
        border: '1px solid rgba(139,0,0,0.35)',
        color: '#c8a070',
        fontFamily: "'Special Elite', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        padding: '8px 16px',
        borderRadius: '2px',
      }}
    >
      <Download size={12} />
      {loading ? 'Gerando...' : 'Baixar PDF'}
    </button>
  )
}
