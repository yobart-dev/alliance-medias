import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Target, Users, Award, MapPin } from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    icon: Target,
    title: 'Notre Mission',
    description: 'Offrir une information locale de qualité, diversifiée et accessible à tous les habitants de la région PACA.',
  },
  {
    icon: Users,
    title: 'Indépendance',
    description: 'Six rédactions autonomes qui partagent des valeurs communes de rigueur journalistique et d\'éthique.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Un engagement pour un journalisme de proximité exigeant, au service de l\'intérêt général.',
  },
  {
    icon: MapPin,
    title: 'Ancrage Territorial',
    description: 'Une couverture complète de la région Provence-Alpes-Côte d\'Azur par des équipes locales.',
  },
]

export function AboutSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <Card key={value.title} className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                <div className="mx-auto h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </Card>
            )
          })}
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
