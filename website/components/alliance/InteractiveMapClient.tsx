'use client'

import dynamic from 'next/dynamic'

const InteractiveMap = dynamic(
  () => import('./InteractiveMap').then(mod => mod.InteractiveMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] lg:h-[700px] bg-gray-50 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="text-center p-16">
          <h3 className="text-3xl font-bold text-primary mb-5">
            Chargement de la carte...
          </h3>
        </div>
      </div>
    ),
  }
)

export function InteractiveMapClient() {
  return <InteractiveMap />
}

