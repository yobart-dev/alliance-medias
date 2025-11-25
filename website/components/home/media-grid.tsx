import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const medias = [
  {
    id: "sport-med",
    name: "Sport MED",
    slug: "sport-med",
    description: "L'actualité du sport régional",
    color: "from-slate-700 to-slate-900",
    bgColor: "bg-slate-800",
    bgImage: "/football-match-stadium.png",
  },
  {
    id: "marcelle",
    name: "Marcelle",
    slug: "marcelle",
    description: "Votre source d'actualité régionale",
    color: "from-purple-400 to-pink-300",
    bgColor: "bg-purple-200",
    bgImage: "/regional-government-meeting.jpg",
  },
  {
    id: "mprovence",
    name: "mprovence",
    slug: "mprovence",
    description: "Engagé naturel de bonnes idées",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-300",
    bgImage: "/nature-reserve-provence-green-forest.jpg",
  },
  {
    id: "lehtm",
    name: "LEHTM",
    slug: "lehtm",
    description: "L'actualité du territoire",
    color: "from-slate-900 to-slate-800",
    bgColor: "bg-slate-700",
    bgImage: "/marseille-neighborhood-community.jpg",
  },
  {
    id: "frequence-mistral",
    name: "Frequence Mistral",
    slug: "frequence-mistral",
    description: "Engagez naturel de bonnes idées",
    color: "from-amber-400 to-yellow-500",
    bgColor: "bg-amber-300",
    bgImage: "/live-music-concert-stage-lights.jpg",
  },
  {
    id: "bleu-tomate",
    name: "bleu tomate",
    slug: "bleu-tomate",
    description: "Engagez naturel de bonnes idées",
    color: "from-green-600 to-green-700",
    bgColor: "bg-green-600",
    bgImage: "/podcast-microphone-studio-recording.jpg",
  },
]

export function MediaGrid() {
  return (
    <section id="medias" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Nos Médias Partenaires</h2>
          <p className="text-lg text-muted-foreground max-w-3xl text-pretty">
            Six rédactions indépendantes avec une vision commune : informer avec qualité et proximité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medias.map((media) => (
            <Link key={media.id} href={`/media/${media.slug}`} className="group">
              <Card className="h-full overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div
                  className="relative h-64 flex flex-col justify-end p-6"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${media.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-bold text-white">{media.name}</h3>
                    <p className="text-sm text-white/90">{media.description}</p>
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
      </div>
    </section>
  )
}
