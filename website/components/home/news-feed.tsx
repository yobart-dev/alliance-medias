"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CTAButton } from "@/components/ui/cta-button"
import { Clock, ArrowRight, Search, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import type { Article } from "@/lib/transformers"

interface NewsFeedProps {
  articles?: Article[]
}

export function NewsFeed({ articles = [] }: NewsFeedProps) {
  const [email, setEmail] = useState("")

  // Séparer les articles pour les différentes sections
  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 4)
  // Tous les articles restants pour le carousel (ou tous si moins de 4)
  const trendingArticles = articles.length > 4 ? articles.slice(4) : articles

  // Carousel Embla
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (articles.length === 0) {
    return (
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Aucun article disponible pour le moment.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 pt-10 pb-10">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Actualités du moment</h2>
        </div>

        {/* Section 1 : Article Principal + Articles Secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16 items-stretch">
          {/* Article Principal (gauche) */}
          {mainArticle && (
            <Link href={`/article/${mainArticle.slug}`} className="lg:col-span-3 group">
              <div className="h-full flex flex-col">
                {/* Image avec overlay */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-2000 ease-out">
                  <img
                    src={mainArticle.image || "/placeholder.svg"}
                    alt={mainArticle.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-2000 ease-out"
                  />
                  {/* Overlay gradient - s'assombrit légèrement au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/70 transition-all duration-2000 ease-out" />
                  
                  {/* Badge catégorie - en bas à gauche */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Badge className="bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm">
                      {mainArticle.category}
                    </Badge>
                    <span className="text-white/80 text-xs flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {mainArticle.readTime}
                    </span>
                  </div>
                </div>
                
                {/* Titre sous l'image */}
                <div className="pt-4">
                  <h2 className="font-heading text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-500 ease-out">
                    {mainArticle.title}
                  </h2>
                </div>
              </div>
            </Link>
          )}

          {/* Articles Secondaires (droite) */}
          <div className="lg:col-span-2 flex flex-col gap-7">
            {sideArticles.map((article, index) => (
              <Link 
                key={article.id} 
                href={`/article/${article.slug}`} 
                className={`group block rounded-xl p-3 -m-3 hover:bg-muted/30 transition-all duration-500 ease-out ${index < sideArticles.length - 1 ? 'pb-3 hover:border-transparent' : ''}`}
              >
                <div className="flex gap-4 group-hover:scale-[1.02] transition-transform duration-500 ease-out origin-left">
                  {/* Image carrée 10em x 10em */}
                  <div className="w-[10em] h-[10em] flex-shrink-0 rounded-xl overflow-hidden bg-muted shadow-sm group-hover:shadow-md transition-shadow duration-2000 ease-out">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover block"
                    />
                  </div>
                  
                  {/* Contenu texte */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-base font-bold leading-snug group-hover:text-primary transition-colors duration-2000 ease-out line-clamp-2 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-200 ease-out line-clamp-3 leading-relaxed mb-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-2000 ease-out">
                      <Clock className="h-3 w-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2 : Trending News - Carousel */}
        <div className="mb-16">
          {/* Header avec titre et navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 pt-10 pb-10">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Trending News</h2>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Boutons de navigation du carousel */}
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors hover:shadow-md"
                aria-label="Article précédent"
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground" />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full border border-border bg-background hover:bg-muted flex items-center justify-center transition-colors hover:shadow-md"
                aria-label="Article suivant"
              >
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {trendingArticles.map((article) => (
                <Link 
                    key={article.id}
                    href={`/article/${article.slug}`} 
                    className="group flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[30%]"
                  >
                    <Card className="h-full overflow-hidden border border-border/50 rounded-2xl shadow-sm transition-all duration-700 ease-in-out hover:shadow-xs hover:bg-slate-50 hover:-translate-y-1">
                      {/* Image */}
                      <div className="relative aspect-[1/1] overflow-hidden bg-muted">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Contenu */}
                      <div className="p-5 space-y-3">
                        <h3 className="font-heading text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-500 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                      </div>
                    </Card>
                  </Link>
              ))}
            </div>
          </div>

          {/* Lien "See More" en dessous */}
          <div className="flex justify-center mt-8">
            <CTAButton asChild className="gap-2 rounded-full px-6">
              <Link href="/actualites">
                Voir toutes les actualités
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CTAButton>
          </div>
        </div>

        {/* Section 3 : Newsletter */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary/30">
          {/* Pattern réseau/constellation inspiré du logo */}
          <div className="absolute inset-0 opacity-30">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 800 400" 
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lignes de connexion */}
              <g stroke="currentColor" strokeWidth="1" className="text-primary/40">
                <line x1="50" y1="80" x2="150" y2="120" />
                <line x1="150" y1="120" x2="200" y2="60" />
                <line x1="150" y1="120" x2="250" y2="180" />
                <line x1="200" y1="60" x2="320" y2="90" />
                <line x1="250" y1="180" x2="320" y2="90" />
                <line x1="320" y1="90" x2="400" y2="150" />
                <line x1="250" y1="180" x2="350" y2="250" />
                <line x1="400" y1="150" x2="500" y2="100" />
                <line x1="400" y1="150" x2="480" y2="220" />
                <line x1="500" y1="100" x2="600" y2="80" />
                <line x1="500" y1="100" x2="550" y2="180" />
                <line x1="480" y1="220" x2="550" y2="180" />
                <line x1="600" y1="80" x2="700" y2="120" />
                <line x1="550" y1="180" x2="650" y2="250" />
                <line x1="700" y1="120" x2="750" y2="200" />
                <line x1="650" y1="250" x2="750" y2="200" />
                <line x1="100" y1="300" x2="200" y2="280" />
                <line x1="200" y1="280" x2="350" y2="250" />
                <line x1="350" y1="250" x2="480" y2="300" />
                <line x1="480" y1="300" x2="650" y2="250" />
                <line x1="650" y1="250" x2="720" y2="320" />
              </g>
              {/* Nœuds/cercles */}
              <g className="fill-primary">
                <circle cx="50" cy="80" r="8" opacity="0.6" />
                <circle cx="150" cy="120" r="12" opacity="0.8" />
                <circle cx="200" cy="60" r="6" opacity="0.5" />
                <circle cx="250" cy="180" r="10" opacity="0.7" />
                <circle cx="320" cy="90" r="14" opacity="0.9" />
                <circle cx="350" cy="250" r="8" opacity="0.6" />
                <circle cx="400" cy="150" r="16" opacity="1" />
                <circle cx="480" cy="220" r="10" opacity="0.7" />
                <circle cx="500" cy="100" r="12" opacity="0.8" />
                <circle cx="550" cy="180" r="8" opacity="0.6" />
                <circle cx="600" cy="80" r="10" opacity="0.7" />
                <circle cx="650" cy="250" r="14" opacity="0.9" />
                <circle cx="700" cy="120" r="8" opacity="0.6" />
                <circle cx="750" cy="200" r="12" opacity="0.8" />
                <circle cx="100" cy="300" r="6" opacity="0.5" />
                <circle cx="200" cy="280" r="10" opacity="0.7" />
                <circle cx="480" cy="300" r="8" opacity="0.6" />
                <circle cx="720" cy="320" r="10" opacity="0.7" />
              </g>
            </svg>
          </div>
          
          {/* Overlay gradient pour lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 max-w-3xl">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
              DERNIÈRES ACTUALITÉS
            </h2>
            <h3 className="font-heading text-3xl md:text-5xl font-bold text-primary leading-tight mb-6">
              ALLIANCE DES MÉDIAS
            </h3>
            <p className="text-slate-400 uppercase tracking-widest text-sm mb-8">
              Recevez l'essentiel de l'actualité régionale directement dans votre boîte mail.
            </p>

            <form 
              onSubmit={(e) => {
                e.preventDefault()
                // Gérer l'inscription newsletter
                console.log("Newsletter signup:", email)
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-lg"
            >
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/80 border-slate-600 text-white placeholder:text-slate-500 rounded-full pl-5 pr-12 py-6 focus:ring-primary focus:border-primary"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <Search className="h-5 w-5 mr-2" />
                S'inscrire
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}