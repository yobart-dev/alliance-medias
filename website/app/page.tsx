import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { MediaGrid } from '@/components/home/media-grid'
import { NewsFeed } from '@/components/home/news-feed'
import { AboutSection } from '@/components/home/about-section'
import { wp } from '@/lib/wordpress'
import { transformArticles, transformMediaPartners } from '@/lib/transformers'
import { mockArticles, mockMediaPartners } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const revalidate = 300 // Revalider toutes les 5 minutes (ISR)

export const metadata: Metadata = {
  title: "L'Alliance des Médias - Provence-Alpes-Côte d'Azur",
  description: "Plateforme regroupant les médias locaux de la région PACA. Découvrez l'actualité locale à travers nos médias partenaires spécialisés.",
  keywords: ['médias', 'PACA', 'Provence', 'actualité locale', 'journalisme', 'alliance médias'],
  openGraph: {
    title: "L'Alliance des Médias - Provence-Alpes-Côte d'Azur",
    description: "Plateforme regroupant les médias locaux de la région PACA",
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'Alliance des Médias - Provence-Alpes-Côte d'Azur",
    description: "Plateforme regroupant les médias locaux de la région PACA",
  },
}

export default async function HomePage() {
  // Récupérer les articles récents et les médias partenaires
  let recentArticles = []
  let mediaPartners = []

  try {
    // Récupérer les 12 derniers articles (4 en haut + 8 pour le carousel)
    const articlesResult = await wp.getArticles({
      per_page: 12,
      _embed: true,
    })
    
    // Si WordPress n'est pas disponible, utiliser les données mockées
    if (articlesResult.data.length === 0) {
      recentArticles = mockArticles
    } else {
      recentArticles = transformArticles(articlesResult.data)
    }

    // Récupérer tous les médias partenaires
    const wpMedias = await wp.getMediaPartners()
    
    // Si WordPress n'est pas disponible, utiliser les données mockées
    if (wpMedias.length === 0) {
      mediaPartners = mockMediaPartners
    } else {
      mediaPartners = transformMediaPartners(wpMedias)
    }
  } catch (error) {
    console.error('Error fetching data for homepage:', error)
    // En cas d'erreur, utiliser les données mockées pour l'aperçu
    recentArticles = mockArticles
    mediaPartners = mockMediaPartners
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <NewsFeed articles={recentArticles} />
        <MediaGrid mediaPartners={mediaPartners} />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
