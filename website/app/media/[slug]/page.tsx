import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { wp } from '@/lib/wordpress'
import { transformMediaPartner, transformArticles } from '@/lib/transformers'
import { mockMediaPartners, getMockArticlesByMedia } from '@/lib/mock-data'
import { ExternalLink, MapPin, Users, Calendar, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'
import { Briefcase, Radio, Video, Globe, UsersIcon, Trophy, Leaf, Newspaper, Headphones, MapPin as MapPinIcon } from 'lucide-react'
import Image from 'next/image'
import type { Metadata } from 'next'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Briefcase': Briefcase,
  'Users': UsersIcon,
  'Newspaper': Newspaper,
  'Globe': Globe,
  'Radio': Radio,
  'Video': Video,
  'Trophy': Trophy,
  'Leaf': Leaf,
  'Headphones': Headphones,
  'MapPin': MapPinIcon,
}

export const revalidate = 300 // Revalider toutes les 5 minutes (ISR)

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let wpMedia = await wp.getMediaPartnerBySlug(params.slug)
  
  // Si WordPress n'est pas disponible, utiliser les données mockées
  if (!wpMedia) {
    const mockMedia = mockMediaPartners.find(m => m.slug === params.slug)
    if (!mockMedia) {
      return {
        title: 'Média non trouvé - Alliance des Médias',
      }
    }
    return {
      title: `${mockMedia.name} - Alliance des Médias PACA`,
      description: mockMedia.description || mockMedia.tagline,
      openGraph: {
        title: `${mockMedia.name} - Alliance des Médias PACA`,
        description: mockMedia.description || mockMedia.tagline,
        type: 'website',
      },
    }
  }

  const media = transformMediaPartner(wpMedia)

  return {
    title: `${media.name} - Alliance des Médias PACA`,
    description: media.description || media.tagline,
    openGraph: {
      title: `${media.name} - Alliance des Médias PACA`,
      description: media.description || media.tagline,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  try {
    const wpMedias = await wp.getMediaPartners()
    
    // Si WordPress n'est pas disponible, utiliser les slugs des médias mockés
    if (wpMedias.length === 0) {
      return mockMediaPartners.map((media) => ({
        slug: media.slug,
      }))
    }
    
    return wpMedias.map((media) => ({
      slug: media.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for media pages:', error)
    // Retourner les slugs des médias mockés en fallback
    return mockMediaPartners.map((media) => ({
      slug: media.slug,
    }))
  }
}

export default async function MediaPage({ params }: { params: { slug: string } }) {
  // Récupérer le média partenaire depuis WordPress
  let wpMedia = await wp.getMediaPartnerBySlug(params.slug)
  
  // Si WordPress n'est pas disponible, utiliser les données mockées
  if (!wpMedia) {
    const mockMedia = mockMediaPartners.find(m => m.slug === params.slug)
    if (!mockMedia) {
      notFound()
    }
    // Créer un objet compatible avec transformMediaPartner
    wpMedia = {
      id: 0,
      title: { rendered: mockMedia.name },
      slug: mockMedia.slug,
      acf: {
        name: mockMedia.name,
        tagline: mockMedia.tagline,
        description: mockMedia.description,
        long_description: mockMedia.longDescription,
        theme: mockMedia.theme,
        color: mockMedia.color,
        icon: mockMedia.icon,
        coverage: mockMedia.coverage,
        founded: mockMedia.founded,
        website: mockMedia.website,
        specialties: mockMedia.specialties,
        team: mockMedia.team,
        audience: mockMedia.audience,
      },
    } as any
  }

  const media = transformMediaPartner(wpMedia)
  const Icon = iconMap[media.icon] || Newspaper

  // Récupérer les articles du média
  let articles = []
  try {
    const articlesResult = await wp.getArticles({
      media_slug: params.slug,
      per_page: 6,
      _embed: true,
    })
    
    // Si WordPress n'est pas disponible, utiliser les données mockées
    if (articlesResult.data.length === 0) {
      articles = getMockArticlesByMedia(params.slug)
    } else {
      articles = transformArticles(articlesResult.data)
    }
  } catch (error) {
    console.error('Error fetching articles for media:', error)
    // En cas d'erreur, utiliser les données mockées
    articles = getMockArticlesByMedia(params.slug)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className={`relative py-20 md:py-32 bg-gradient-to-br ${media.color} text-white overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?key=pattern')] opacity-10" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                <Icon className="h-10 w-10" />
              </div>
              
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {media.theme}
              </Badge>
              
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-balance">
                {media.name}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                {media.tagline}
              </p>
              
              <p className="text-lg text-white/80 max-w-2xl mx-auto text-pretty leading-relaxed">
                {media.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button size="lg" variant="secondary" className="gap-2" asChild>
                  <a href={media.website} target="_blank" rel="noopener noreferrer">
                    Visiter le site
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Nous contacter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border">
          <div className="container mx-auto px-4 -mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Création', value: media.founded, icon: Calendar },
                { label: 'Équipe', value: media.team, icon: Users },
                { label: 'Audience', value: media.audience, icon: TrendingUp },
                { label: 'Couverture', value: media.coverage, icon: MapPin },
              ].map((stat) => {
                const StatIcon = stat.icon
                return (
                  <Card key={stat.label} className="p-6 text-center shadow-lg">
                    <div className="flex justify-center mb-3">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${media.color} flex items-center justify-center text-white`}>
                        <StatIcon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
              <div className="space-y-6">
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Qui sommes-nous ?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {media.longDescription}
                </p>
                
                <div className="pt-4">
                  <h3 className="font-heading text-xl font-bold mb-4">Notre zone de diffusion</h3>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-lg">{media.coverage}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="font-heading text-2xl font-bold">
                  Nos spécialités
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {media.specialties.map((specialty, index) => (
                    <div
                      key={specialty}
                      className={`p-4 rounded-lg bg-gradient-to-r ${media.color} bg-opacity-5 border-l-4 border-primary`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <p className="font-medium">{specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                  Derniers articles
                </h2>
                <p className="text-muted-foreground">
                  Les publications récentes de {media.name}
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/actualites">
                  Tous les articles
                </Link>
              </Button>
            </div>

            {articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Aucun article disponible pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link key={article.id} href={`/article/${article.slug}`}>
                    <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video relative overflow-hidden bg-muted">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <Badge className="absolute top-3 left-3 z-10">
                          {article.category}
                        </Badge>
                      </div>
                      
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
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

        {/* CTA */}
        <section className={`py-20 bg-gradient-to-br ${media.color} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Suivez {media.name}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Ne manquez aucune actualité et retrouvez toutes nos publications sur notre site officiel.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href={media.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Accéder au site
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
