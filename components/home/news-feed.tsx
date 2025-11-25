"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "OGC Nice remporte une victoire spectaculaire",
    excerpt: "Le match est allé en prolongation avec un but décisif en toute fin de rencontre.",
    media: "Sport MED",
    category: "Football",
    date: "2024-01-15",
    readTime: "5 min",
    image: "/football-match-stadium.png",
  },
  {
    id: 2,
    title: "Politique régionale: nouvelles mesures pour 2024",
    excerpt: "Les élus régionaux dévoilent leur programme pour les mois à venir.",
    media: "Marcelle",
    category: "Politique",
    date: "2024-01-14",
    readTime: "7 min",
    image: "/regional-government-meeting.jpg",
  },
  {
    id: 3,
    title: "Initiative verte: nouvelle réserve naturelle en Provence",
    excerpt: "Les habitants se mobilisent pour protéger un espace naturel unique.",
    media: "mprovence",
    category: "Environnement",
    date: "2024-01-14",
    readTime: "6 min",
    image: "/nature-reserve-provence-green-forest.jpg",
  },
  {
    id: 4,
    title: "Vie de quartier: les initiatives qui changent Marseille",
    excerpt: "Découvrez les projets des habitants du quartier de la Plaine.",
    media: "LEHTM",
    category: "Actualité Locale",
    date: "2024-01-13",
    readTime: "8 min",
    image: "/marseille-neighborhood-community.jpg",
  },
  {
    id: 5,
    title: "Podcast: les entrepreneurs qui font la région",
    excerpt: "Écoutez les histoires inspirantes d'entrepreneurs locaux engagés.",
    media: "bleu tomate",
    category: "Podcast",
    date: "2024-01-13",
    readTime: "45 min",
    image: "/podcast-microphone-studio-recording.jpg",
  },
  {
    id: 6,
    title: "Musique: les talents régionaux à découvrir",
    excerpt: "Écoutez les nouveaux artistes mis en avant par Frequence Mistral.",
    media: "Frequence Mistral",
    category: "Musique",
    date: "2024-01-12",
    readTime: "4 min",
    image: "/live-music-concert-stage-lights.jpg",
  },
]

const filters = ["Tous", "Football", "Politique", "Environnement", "Actualité Locale", "Podcast", "Musique"]

export function NewsFeed() {
  const [activeFilter, setActiveFilter] = useState("Tous")

  const filteredArticles =
    activeFilter === "Tous" ? articles : articles.filter((article) => article.category === activeFilter)

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Dernières Actualités</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              L'essentiel de l'information régionale en temps réel
            </p>
          </div>

          <Button variant="outline" asChild>
            <Link href="/actualites">
              Toutes les actualités
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3">{article.category}</Badge>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-primary">{article.media}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{article.excerpt}</p>

                  <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
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
