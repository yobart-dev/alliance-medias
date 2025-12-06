import { ArticleCard } from '@/components/ui/article-card'

const mockArticle = {
  id: '1',
  title: 'L\'avenir du journalisme local en PACA',
  excerpt: 'Découvrez comment les médias locaux s\'adaptent à l\'ère numérique et renforcent leur impact auprès des lecteurs.',
  image: 'https://via.placeholder.com/400x300?text=Article+1',
  slug: 'avenir-journalisme-paca',
  readTime: '5 min',
  category: 'Médias'
}

export default function TestPage() {
  return (
    <div className="bg-background min-h-screen p-10">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-12 text-foreground">
          Test : Article Card
        </h1>

        {/* Une seule card */}
        <div className="mb-16 max-w-sm">
          <ArticleCard {...mockArticle} />
        </div>

        {/* 3 cards en grille */}
        <h2 className="text-2xl font-bold mb-8 text-foreground">
          Grille de 3 cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ArticleCard {...mockArticle} id="1" slug="article-1" />
          <ArticleCard 
            {...mockArticle} 
            id="2" 
            slug="article-2"
            title="Médias Partenaires : Un écosystème unique"
          />
          <ArticleCard 
            {...mockArticle} 
            id="3" 
            slug="article-3"
            title="Comment rester informé en PACA"
          />
        </div>
      </div>
    </div>
  )
}