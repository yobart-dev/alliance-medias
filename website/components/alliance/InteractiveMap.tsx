'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { mockMediaPartners } from '@/lib/mock-data'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Coordonnées des principales villes PACA
const locations = [
  { name: 'Marseille', coords: [43.2965, 5.3698] as [number, number], medias: ['Marcelle', 'LEHTV', 'bleu tomate'] },
  { name: 'Nice', coords: [43.7102, 7.2620] as [number, number], medias: ['mprovence'] },
  { name: 'Toulon', coords: [43.1242, 5.9280] as [number, number], medias: ['Sport MED'] },
  { name: 'Aix-en-Provence', coords: [43.5297, 5.4474] as [number, number], medias: ['Frequence Mistral'] },
  { name: 'Gap', coords: [44.5597, 6.0785] as [number, number], medias: ['Frequence Mistral'] },
]

// Couleurs par média
const mediaColors: { [key: string]: string } = {
  'Sport MED': '#E74C3C',
  'Marcelle': '#98D8C8',
  'mprovence': '#9B59B6',
  'LEHTV': '#F7CAC9',
  'Frequence Mistral': '#FFB347',
  'bleu tomate': '#4169E1',
}

// Custom marker icon creator
function createCustomIcon(color: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${color};
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

// Composant pour ajuster la vue de la carte
function MapBounds() {
  const map = useMap()
  
  useEffect(() => {
    // Centre sur la région PACA
    const bounds = L.latLngBounds(locations.map(loc => loc.coords))
    map.fitBounds(bounds, { padding: [50, 50] })
  }, [map])
  
  return null
}

export function InteractiveMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[600px] lg:h-[700px] bg-gray-50 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
        <div className="text-center p-16">
          <h3 className="text-3xl font-bold text-primary mb-5">
            Chargement de la carte...
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
      <MapContainer
        center={[43.9, 6.0]}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapBounds />
        
        {locations.map((location, index) => {
          const mainMedia = location.medias[0]
          const color = mediaColors[mainMedia] || '#0052CC'
          
          return (
            <Marker
              key={index}
              position={location.coords}
              icon={createCustomIcon(color)}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-lg mb-2">{location.name}</h4>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-700">Médias présents :</p>
                    {location.medias.map((media, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: mediaColors[media] }}
                        />
                        <span className="text-sm">{media}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

