import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import type { MediaPartner } from "@/lib/transformers"

interface MediaGridProps {
  mediaPartners?: MediaPartner[]
}

export function MediaGrid({ mediaPartners = [] }: MediaGridProps) {
  return (
    <section id="medias" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Les médias de l'alliance</h2>
          <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
            Six rédactions indépendantes avec une vision commune : informer avec qualité et proximité
          </p>
        </div>

        {mediaPartners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun média partenaire disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediaPartners.map((media) => (
              <Link key={media.id} href={`/media/${media.slug}`} className="group">
                <Card className="relative h-72 overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  {/* Image de fond qui couvre tout */}
                  <img 
                    src={media.bgImage || "/placeholder.svg"} 
                    alt={media.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  {/* Contenu texte */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl font-bold text-white">{media.name}</h3>
                      <p className="text-sm text-white/90 line-clamp-2">{media.description || media.tagline}</p>
                      <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors pt-3">
                        <span className="text-xs font-medium">En savoir plus</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
