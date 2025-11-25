"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, ArrowRight, Search, TrendingUp } from "lucide-react"
import type { Article } from "@/lib/transformers"
import Image from "next/image"

interface NewsFeedProps {
  articles?: Article[]
}

export function NewsFeed({ articles = [] }: NewsFeedProps) {
  const [email, setEmail] = useState("")

  // Séparer les articles pour les différentes sections
  const mainArticle = articles[0]
  const sideArticles = articles.slice(1, 4)
  const trendingArticles = articles.slice(4, 7)

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
        {/* Section 1 : Article Principal + Articles Secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16 items-stretch">
          {/* Article Principal (gauche) */}
          {mainArticle && (
            <Link href={`/article/${mainArticle.slug}`} className="lg:col-span-3 group">
              <Card className="h-full overflow-hidden border-0 shadow-none bg-transparent flex flex-col">
                <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={mainArticle.image || "/placeholder.svg"}
                    alt={mainArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badge catégorie */}
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
                    {mainArticle.category}
                  </Badge>
                  
                  {/* Temps de lecture */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    <Clock className="h-3 w-3" />
                    {mainArticle.readTime}
                  </div>
                </div>
                
                <div className="pt-5 flex-1">
                  <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {mainArticle.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground text-base leading-relaxed line-clamp-2">
                    {mainArticle.excerpt}
                  </p>
                </div>
              </Card>
            </Link>
          )}

          {/* Articles Secondaires (droite) - hauteur alignée avec l'article principal */}
          <div className="lg:col-span-2 flex flex-col justify-between h-full">
            {sideArticles.map((article, index) => (
              <Link 
                key={article.id} 
                href={`/article/${article.slug}`} 
                className={`group flex-1 ${index < sideArticles.length - 1 ? 'border-b border-border pb-4 mb-4' : ''}`}
              >
                <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 h-full items-center">
                  {/* Image miniature - ratio 4/3 */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="120px"
                    />
                  </div>
                  
                  {/* Contenu */}
                  <div className="flex flex-col justify-center">
                    <h3 className="font-heading text-sm md:text-base font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 text-xs md:text-sm text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2 : Trending News */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-2xl md:text-3xl font-bold">Trending News</h2>
            </div>
            <Button variant="ghost" asChild className="text-primary hover:text-primary/80 gap-2">
              <Link href="/actualites">
                See More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`} className="group">
                <Card className="h-full overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-card rounded-2xl">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  
                  {/* Contenu */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-heading text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
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

        {/* Section 3 : Newsletter */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-950">
          {/* Motif décoratif */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 right-0 w-1/2 h-full">
              <div className="w-full h-full" style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 3px,
                  rgba(251, 146, 60, 0.3) 3px,
                  rgba(251, 146, 60, 0.3) 4px
                )`,
                transform: 'skewX(-15deg)',
              }} />
            </div>
          </div>
          
          {/* Image décorative à droite */}
          <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-40 hidden lg:block">
            <Image
              src="/provence-alpes-cote-azur-marseille-alliance-medias.webp"
              alt=""
              fill
              className="object-cover object-left"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-transparent" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 max-w-3xl">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
              DERNIÈRES ACTUALITÉS
            </h2>
            <h3 className="font-heading text-3xl md:text-5xl font-bold text-primary leading-tight mb-6">
              ALLIANCE DES MÉDIAS
            </h3>
            <p className="text-zinc-400 uppercase tracking-widest text-sm mb-8">
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
                  className="w-full bg-zinc-800/80 border-zinc-700 text-white placeholder:text-zinc-500 rounded-full pl-5 pr-12 py-6 focus:ring-primary focus:border-primary"
                />
              </div>
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
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
