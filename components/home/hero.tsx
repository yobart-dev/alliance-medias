import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden h-screen md:h-[600px] lg:h-[700px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.jpg?height=800&width=1200&query=Marseille Vieux Port Mediterranean sea city waterfront sunset')`,
        }}
      />

      {/* Sky gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400/40 via-transparent to-sky-200/30" />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />

      {/* Sea-inspired wave accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/20 via-primary/5 to-transparent" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/20 backdrop-blur-sm border border-sky-300/30 text-sky-100 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-sky-300 animate-pulse" />
                Provence-Alpes-Côte d'Azur
              </span>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg">
              L'information <span className="text-sky-300">locale, unie</span> et{" "}
              <span className="text-amber-300">plurielle</span>
            </h1>

            <p className="text-lg md:text-xl text-sky-50 max-w-2xl text-pretty leading-relaxed drop-shadow-md">
              Découvrez l'actualité de votre région à travers six médias locaux spécialisés. Une alliance pour une
              information de proximité, diversifiée et de qualité.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="gap-2 group bg-sky-500 hover:bg-sky-600 text-white shadow-lg" asChild>
                <Link href="#medias">
                  Découvrir nos médias
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
                asChild
              >
                <Link href="/actualites">Voir les actualités</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
