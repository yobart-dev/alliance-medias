import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ArticlesList } from '@/components/actualites/ArticlesList'
import { wp } from '@/lib/wordpress'
import { transformArticles } from '@/lib/transformers'
import { mockArticles } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const revalidate = 300 // Revalider toutes les 5 minutes (ISR)

export const metadata: Metadata = {
  title: 'Toutes les actualités - Alliance des Médias PACA',
  description: 'Explorez l\'ensemble des articles publiés par nos médias partenaires de la région Provence-Alpes-Côte d\'Azur',
  openGraph: {
    title: 'Toutes les actualités - Alliance des Médias PACA',
    description: 'Explorez l\'ensemble des articles publiés par nos médias partenaires',
    type: 'website',
  },
}

export default async function ActualitesPage() {
  // Récupérer tous les articles depuis WordPress
  let allArticles = []
  let categories: string[] = []
  let medias: string[] = []

  try {
    const articlesResult = await wp.getArticles({
      per_page: 100, // Récupérer un grand nombre d'articles
      _embed: true,
    })
    allArticles = transformArticles(articlesResult.data)

    // Extraire les catégories et médias uniques
    const categoriesSet = new Set<string>()
    const mediasSet = new Set<string>()
    
    allArticles.forEach(article => {
      if (article.category) categoriesSet.add(article.category)
      if (article.media) mediasSet.add(article.media)
    })

    categories = ['Tous', ...Array.from(categoriesSet).sort()]
    medias = ['Tous', ...Array.from(mediasSet).sort()]
  } catch (error) {
    console.error('Error fetching articles:', error)
    // En cas d'erreur, utiliser les données mockées pour l'aperçu
    allArticles = mockArticles
    const categoriesSet = new Set(mockArticles.map(a => a.category))
    const mediasSet = new Set(mockArticles.map(a => a.media))
    categories = ['Tous', ...Array.from(categoriesSet).sort()]
    medias = ['Tous', ...Array.from(mediasSet).sort()]
  }

  // Si aucune donnée n'a été récupérée, utiliser les mocks
  if (allArticles.length === 0) {
    allArticles = mockArticles
    const categoriesSet = new Set(mockArticles.map(a => a.category))
    const mediasSet = new Set(mockArticles.map(a => a.media))
    categories = ['Tous', ...Array.from(categoriesSet).sort()]
    medias = ['Tous', ...Array.from(mediasSet).sort()]
  }

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

        <ArticlesList articles={allArticles} categories={categories} medias={medias} />
      </main>
      <Footer />
    </div>
  )
}
