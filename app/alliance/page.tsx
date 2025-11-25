import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Target, Award, ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function AlliancePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-primary/5 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="border-primary text-primary bg-primary/5">
                Notre Histoire
              </Badge>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-balance">
                L'Alliance des Médias de Provence-Alpes-Côte d'Azur
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed">
                Une initiative unique rassemblant les forces vives du journalisme local pour une information plus riche, plus proche et plus impactante.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-ochre/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </section>

        {/* Mission & Values */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Notre Mission
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Fondée en 2024, l'Alliance des Médias est née d'un constat simple : face à la complexité du monde actuel, l'information locale est plus que jamais essentielle pour comprendre notre environnement immédiat.
                  </p>
                  <p>
                    Notre mission est de fédérer les rédactions indépendantes de la région PACA pour mutualiser nos forces tout en préservant nos identités singulières. Ensemble, nous couvrons l'ensemble du territoire, des Alpes à la Méditerranée.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Indépendance éditoriale",
                    "Pluralisme de l'information",
                    "Ancrage territorial fort",
                    "Innovation numérique"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-ochre/20 rounded-2xl transform rotate-3" />
                <img 
                  src="/journalists-meeting-collaboration.jpg" 
                  alt="Réunion de rédaction collaborative" 
                  className="relative rounded-2xl shadow-xl w-full object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Notre Ancrage Territorial
              </h2>
              <p className="text-lg text-muted-foreground">
                Une présence sur l'ensemble des 6 départements de la région PACA
              </p>
            </div>

            <div className="relative bg-background rounded-3xl shadow-lg p-8 md:p-12 overflow-hidden border border-border">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 min-h-[400px] bg-muted/50 rounded-xl flex items-center justify-center relative">
                  {/* Placeholder for interactive map */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src="/map-of-provence-alpes-cote-d-azur-region.jpg" 
                      alt="Carte de la région PACA" 
                      className="w-full h-full object-contain opacity-80"
                    />
                    {/* Map markers would go here */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg text-center">
                      <p className="font-bold text-primary">6 Médias</p>
                      <p className="text-sm text-muted-foreground">Couvrant toute la région</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="font-heading text-xl font-bold">Zones de couverture</h3>
                  <div className="space-y-4">
                    {[
                      { area: "Bouches-du-Rhône", media: "Marseille Direct, Provence Éco" },
                      { area: "Alpes-Maritimes", media: "Azur Culture, Riviera Radio" },
                      { area: "Var", media: "Azur Culture, PACA TV" },
                      { area: "Vaucluse", media: "Provence Éco, PACA TV" },
                      { area: "Hautes-Alpes", media: "Alpes Nature" },
                      { area: "Alpes-de-Haute-Provence", media: "Alpes Nature" },
                    ].map((item) => (
                      <div key={item.area} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="font-bold text-foreground">{item.area}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.media}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Le Comité de Direction
              </h2>
              <p className="text-lg text-muted-foreground">
                Les représentants de chaque média qui pilotent l'Alliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Sophie Martin", role: "Présidente", media: "Provence Éco", image: "/professional-woman-portrait.png" },
                { name: "Jean-Pierre Dubois", role: "Vice-Président", media: "Marseille Direct", image: "/professional-man-portrait.png" },
                { name: "Marie Lecomte", role: "Secrétaire Générale", media: "Azur Culture", image: "/professional-woman-portrait-2.png" },
              ].map((member) => (
                <Card key={member.name} className="overflow-hidden group hover:shadow-lg transition-all">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img 
                      src={member.image || "/placeholder.svg"} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-heading text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-1">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.media}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Vous souhaitez rejoindre l'Alliance ?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Nous sommes toujours ouverts aux nouveaux partenariats avec des médias locaux partageant nos valeurs.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Contactez-nous
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
