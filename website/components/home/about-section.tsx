'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Target, Users, Award, MapPin, Plus, X } from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    icon: Target,
    title: 'Notre Mission',
    subtitle: 'Information locale de qualité',
    description: 'Offrir une information locale de qualité, diversifiée et accessible à tous les habitants de la région PACA. Nous croyons en un journalisme de proximité qui éclaire et connecte les communautés.',
  },
  {
    icon: Users,
    title: 'Indépendance',
    subtitle: 'Liberté éditoriale',
    description: 'Six rédactions autonomes qui partagent des valeurs communes de rigueur journalistique et d\'éthique. Chaque média conserve sa ligne éditoriale unique tout en contribuant à une vision partagée.',
  },
  {
    icon: Award,
    title: 'Excellence',
    subtitle: 'Rigueur et engagement',
    description: 'Un engagement pour un journalisme de proximité exigeant, au service de l\'intérêt général. Nous visons l\'excellence dans chaque article, chaque enquête, chaque reportage.',
  },
  {
    icon: MapPin,
    title: 'Ancrage Territorial',
    subtitle: 'Couverture régionale',
    description: 'Une couverture complète de la région Provence-Alpes-Côte d\'Azur par des équipes locales. Des Alpes à la Méditerranée, nous sommes au cœur de votre territoire.',
  },
]

// Composant SVG pour le pattern réseau
function NetworkPattern({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={className}
      viewBox="0 0 200 200" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lignes de connexion */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.3">
        <line x1="30" y1="40" x2="80" y2="70" />
        <line x1="80" y1="70" x2="120" y2="50" />
        <line x1="80" y1="70" x2="100" y2="120" />
        <line x1="120" y1="50" x2="160" y2="80" />
        <line x1="100" y1="120" x2="150" y2="140" />
        <line x1="160" y1="80" x2="150" y2="140" />
        <line x1="40" y1="150" x2="100" y2="120" />
        <line x1="150" y1="140" x2="170" y2="170" />
      </g>
      {/* Nœuds/cercles */}
      <g fill="currentColor">
        <circle cx="30" cy="40" r="8" opacity="0.5" />
        <circle cx="80" cy="70" r="12" opacity="0.7" />
        <circle cx="120" cy="50" r="6" opacity="0.4" />
        <circle cx="100" cy="120" r="14" opacity="0.8" />
        <circle cx="160" cy="80" r="8" opacity="0.5" />
        <circle cx="150" cy="140" r="10" opacity="0.6" />
        <circle cx="40" cy="150" r="6" opacity="0.4" />
        <circle cx="170" cy="170" r="8" opacity="0.5" />
      </g>
    </svg>
  )
}

interface ValueCardProps {
  value: typeof values[0]
  isExpanded: boolean
  onToggle: () => void
}

function ValueCard({ value, isExpanded, onToggle }: ValueCardProps) {
  const Icon = value.icon
  
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-slate-100 border border-slate-200/50 transition-all duration-500 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Partie gauche - Texte */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-slate-900">
              {value.title}
            </h3>
            <p className="text-slate-600 text-sm md:text-base">
              {value.subtitle}
            </p>
          </div>
          
          {/* Bouton toggle */}
          <button
            onClick={onToggle}
            className="mt-4 md:mt-6 inline-flex items-center gap-2 text-slate-900 hover:text-primary transition-colors group/btn"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Fermer les détails" : "Voir les détails"}
          >
            <span className="h-10 w-10 rounded-full border-2 border-slate-300 group-hover/btn:border-primary flex items-center justify-center transition-all duration-300">
              {isExpanded ? (
                <X className="h-5 w-5 transition-transform duration-300" />
              ) : (
                <Plus className="h-5 w-5 transition-transform duration-300" />
              )}
            </span>
            <span className="text-sm font-medium">
              {isExpanded ? 'Fermer' : 'En savoir plus'}
            </span>
          </button>
        </div>
        
        {/* Séparateur */}
        <div className="hidden md:block w-px bg-slate-200 my-8" />
        <div className="block md:hidden h-px bg-slate-200 mx-6" />
        
        {/* 
          Partie droite/bas - Contenu dynamique
          MOBILE: h-[200px] hauteur fixe (pas de flex-1 car flex-col ne le supporte pas bien)
          DESKTOP: md:flex-1 pour prendre l'espace disponible
        */}
        <div className="relative h-[200px] md:h-auto md:flex-1 md:min-h-[240px]">
          {/* État fermé : Pattern réseau */}
          <div 
            className={`absolute inset-0 flex items-center justify-center p-6 md:p-8 transition-all duration-500 ${
              isExpanded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            <NetworkPattern className="w-full h-full text-primary" />
          </div>
          
          {/* État ouvert : Description détaillée */}
          <div 
            className={`absolute inset-0 p-6 md:p-8 flex items-center transition-all duration-500 ${
              isExpanded ? 'opacity-100 translate-y-0 md:translate-x-0' : 'opacity-0 translate-y-4 md:translate-y-0 md:translate-x-8 pointer-events-none'
            }`}
          >
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              {value.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AboutSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }
 // 2. Tableau simple
 const prenoms = ["Yoann", "Marie", "Paul", "Jacques", "Emma"]

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-balance">
            L'Alliance des Médias PACA
          </h2>
          <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
            Créée en 2024, l'Alliance des Médias rassemble six acteurs majeurs de l'information 
            régionale autour d'une vision commune : valoriser le journalisme local et renforcer 
            le lien entre les médias et les citoyens de Provence-Alpes-Côte d'Azur.
          </p>
        </div>

        {/* Grille 2x2 de cartes interactives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              value={value}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/alliance">
              En savoir plus sur l'Alliance
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}