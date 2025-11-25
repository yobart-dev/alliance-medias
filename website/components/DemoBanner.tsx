'use client'

import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export function DemoBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Vérifier si WordPress est configuré
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL
    if (!wpUrl || wpUrl === '') {
      setShow(true)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-amber-500 text-white p-4 rounded-lg shadow-lg border border-amber-600 flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-sm mb-1">Mode Aperçu</p>
          <p className="text-xs text-amber-50">
            Le site utilise des données de démonstration. Configurez WordPress pour activer les données réelles.
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="text-white/80 hover:text-white text-lg leading-none"
          aria-label="Fermer"
        >
          ×
        </button>
      </div>
    </div>
  )
}

