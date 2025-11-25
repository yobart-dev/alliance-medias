'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock, Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'

const allArticles = [
  {
    id: 1,
    title: 'Marseille accueille un nouveau hub d\'innovation technologique',
    excerpt: 'Un espace de 5000m² dédié aux startups et à l\'innovation ouvre ses portes dans le quartier de la Joliette.',
    media: 'Provence Éco',
    mediaSlug: 'provence-eco',
    category: 'Économie',
    date: '2024-01-15',
    readTime: '5 min',
    image: '/modern-tech-hub-marseille.jpg',
  },
  {
    id: 2,
    title: 'Festival de Cannes : la sélection officielle dévoilée',
    excerpt: 'Découvrez les films en compétition pour la Palme d\'Or lors de la 77e édition du festival.',
    media: 'Azur Culture',
    mediaSlug: 'azur-culture',
    category: 'Culture',
    date: '2024-01-14',
    readTime: '4 min',
    image: '/cannes-red-carpet.png',
  },
  {
    id: 3,
    title: 'Nouveau plan de mobilité douce dans les quartiers Nord',
    excerpt: 'La ville de Marseille investit 15 millions d\'euros pour développer les pistes cyclables et piétonnes.',
    media: 'Marseille Direct',
    mediaSlug: 'marseille-direct',
    category: 'Actualité Locale',
    date: '2024-01-14',
    readTime: '6 min',
    image: '/bike-lane-urban-planning.jpg',
  },
  {
    id: 4,
    title: 'Protection du Parc National du Mercantour renforcée',
    excerpt: 'De nouvelles mesures pour préserver la biodiversité exceptionnelle des Alpes du Sud.',
    media: 'Alpes Nature',
    mediaSlug: 'alpes-nature',
    category: 'Environnement',
    date: '2024-01-13',
    readTime: '7 min',
    image: '/mercantour-national-park-mountains.jpg',
  },
  {
    id: 5,
    title: 'Interview : le maire de Nice sur les projets 2024',
    excerpt: 'Écoutez l\'interview exclusive sur les grands chantiers de la métropole niçoise.',
    media: 'Riviera Radio',
    mediaSlug: 'riviera-radio',
    category: 'Radio',
    date: '2024-01-13',
    readTime: '15 min',
    image: '/nice-city-promenade-des-anglais.jpg',
  },
  {
    id: 6,
    title: 'Reportage : les coulisses du Port de Marseille',
    excerpt: 'Découvrez en vidéo le quotidien du plus grand port de France et de Méditerranée.',
    media: 'PACA TV',
    mediaSlug: 'paca-tv',
    category: 'Télévision',
    date: '2024-01-12',
    readTime: '12 min',
    image: '/marseille-port-cargo-ships.jpg',
  },
  {
    id: 7,
    title: 'Les startups marseillaises lèvent 120 millions d\'euros',
    excerpt: 'Record historique pour l\'écosystème entrepreneurial de la cité phocéenne en 2024.',
    media: 'Provence Éco',
    mediaSlug: 'provence-eco',
    category: 'Économie',
    date: '2024-01-11',
    readTime: '6 min',
    image: '/placeholder.svg?key=eco2',
  },
  {
    id: 8,
    title: 'Exposition Picasso au Musée Granet d\'Aix-en-Provence',
    excerpt: 'Une rétrospective inédite de l\'artiste espagnol avec 150 œuvres présentées.',
    media: 'Azur Culture',
    mediaSlug: 'azur-culture',
    category: 'Culture',
    date: '2024-01-10',
    readTime: '5 min',
    image: '/placeholder.svg?key=cult2',
  },
  {
    id: 9,
    title: 'Le stade Vélodrome se modernise pour l\'Euro 2028',
    excerpt: 'Travaux d\'envergure annoncés pour améliorer l\'expérience des supporters.',
    media: 'Marseille Direct',
    mediaSlug: 'marseille-direct',
    category: 'Actualité Locale',
    date: '2024-01-09',
    readTime: '4 min',
    image: '/placeholder.svg?key=local2',
  },
  {
    id: 10,
    title: 'Réintroduction du Gypaète barbu dans les Alpes',
    excerpt: 'Un programme européen ambitieux pour sauver ce rapace emblématique.',
    media: 'Alpes Nature',
    mediaSlug: 'alpes-nature',
    category: 'Environnement',
    date: '2024-01-08',
    readTime: '8 min',
    image: '/placeholder.svg?key=env2',
  },
  {
    id: 11,
    title: 'Débat sur le tourisme de masse sur la Côte d\'Azur',
    excerpt: 'Élus et acteurs économiques s\'affrontent sur les limites du développement touristique.',
    media: 'Riviera Radio',
    mediaSlug: 'riviera-radio',
    category: 'Radio',
    date: '2024-01-07',
    readTime: '20 min',
    image: '/placeholder.svg?key=rad2',
  },
  {
    id: 12,
    title: 'Documentaire : L\'histoire du savon de Marseille',
    excerpt: 'Plongée dans les savonneries traditionnelles de la ville et leur savoir-faire séculaire.',
    media: 'PACA TV',
    mediaSlug: 'paca-tv',
    category: 'Télévision',
    date: '2024-01-06',
    readTime: '45 min',
    image: '/placeholder.svg?key=tv2',
  },
]

const categories = ['Tous', 'Économie', 'Culture', 'Actualité Locale', 'Environnement', 'Radio', 'Télévision']
const medias = ['Tous', 'Provence Éco', 'Azur Culture', 'Marseille Direct', 'Alpes Nature', 'Riviera Radio', 'PACA TV']

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selectedMedia, setSelectedMedia] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory
    const matchesMedia = selectedMedia === 'Tous' || article.media === selectedMedia
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesMedia && matchesSearch
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Toutes les actualités
              </h1>
              <p className="text-lg text-muted-foreground">
                Explorez l'ensemble des articles publiés par nos médias partenaires
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher un article..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                className="lg:hidden w-full sm:w-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtres
              </Button>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Filtrer par:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'Tous' ? 'Toutes catégories' : cat}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMedia}
                  onChange={(e) => setSelectedMedia(e.target.value)}
                  className="flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {medias.map((media) => (
                    <option key={media} value={media}>
                      {media === 'Tous' ? 'Tous médias' : media}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mt-4 space-y-4 pb-4 border-t border-border pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === 'Tous' ? 'Toutes catégories' : cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Média</label>
                  <select
                    value={selectedMedia}
                    onChange={(e) => setSelectedMedia(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {medias.map((media) => (
                      <option key={media} value={media}>
                        {media === 'Tous' ? 'Tous médias' : media}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
              </p>
              {(selectedCategory !== 'Tous' || selectedMedia !== 'Tous' || searchQuery) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory('Tous')
                    setSelectedMedia('Tous')
                    setSearchQuery('')
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              )}
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  Aucun article ne correspond à vos critères de recherche.
                </p>
              </div>
            ) : (
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
                        <Badge className="absolute top-3 left-3">
                          {article.category}
                        </Badge>
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
                        
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {article.excerpt}
                        </p>
                        
                        <div className="pt-2 text-xs text-muted-foreground">
                          <time dateTime={article.date}>
                            {new Date(article.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
