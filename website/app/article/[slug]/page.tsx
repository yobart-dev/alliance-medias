import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { wp } from '@/lib/wordpress'
import { transformArticle } from '@/lib/transformers'
import { getMockArticleBySlug } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { Clock, ArrowLeft } from 'lucide-react'
import { ShareButton } from '@/components/article/ShareButton'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = 300 // Revalider toutes les 5 minutes (ISR)

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let wpArticle = await wp.getArticleBySlug(params.slug)
  
  // Si WordPress n'est pas disponible, utiliser les données mockées
  if (!wpArticle) {
    const mockArticle = getMockArticleBySlug(params.slug)
    if (!mockArticle) {
      return {
        title: 'Article non trouvé - Alliance des Médias',
      }
    }
    return {
      title: `${mockArticle.title} - Alliance des Médias PACA`,
      description: mockArticle.excerpt,
      openGraph: {
        title: mockArticle.title,
        description: mockArticle.excerpt,
        type: 'article',
        publishedTime: mockArticle.date,
        images: mockArticle.image ? [mockArticle.image] : [],
      },
    }
  }

  const article = transformArticle(wpArticle)

  return {
    title: `${article.title} - Alliance des Médias PACA`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      images: article.image ? [article.image] : [],
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  let wpArticle = await wp.getArticleBySlug(params.slug)
  
  // Si WordPress n'est pas disponible, utiliser les données mockées
  if (!wpArticle) {
    const mockArticle = getMockArticleBySlug(params.slug)
    if (!mockArticle) {
      notFound()
    }
    // Créer un objet compatible avec transformArticle
    wpArticle = {
      id: mockArticle.id,
      date: mockArticle.date,
      date_gmt: mockArticle.date,
      modified: mockArticle.date,
      modified_gmt: mockArticle.date,
      slug: mockArticle.slug,
      status: 'publish',
      type: 'article',
      link: mockArticle.link,
      title: { rendered: mockArticle.title },
      content: { rendered: `<p>${mockArticle.excerpt}</p><p>${mockArticle.excerpt}</p>`, protected: false },
      excerpt: { rendered: mockArticle.excerpt, protected: false },
      author: 1,
      featured_media: 0,
      comment_status: 'closed',
      ping_status: 'closed',
      sticky: false,
      template: '',
      format: 'standard',
      meta: {},
      acf: {
        read_time: mockArticle.readTime,
        media_source: mockArticle.media,
        media_slug: mockArticle.mediaSlug,
        category: mockArticle.category,
      },
      categories: [],
      tags: [],
      _embedded: {
        'wp:featuredmedia': [{
          id: 0,
          source_url: mockArticle.image,
          alt_text: mockArticle.title,
          media_details: {
            width: 1200,
            height: 800,
            sizes: {},
          },
        }],
      },
    } as any
  }

  const article = transformArticle(wpArticle)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Image */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden">
          <Image
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-8">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-4 text-white/90 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {article.category}
                </Badge>
                <span className="font-medium">{article.media}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {article.title}
              </h1>
              <time dateTime={article.date} className="text-white/80 text-sm">
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link 
                  href="/actualites"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour aux actualités
                </Link>
              </div>

              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
              />

              {/* Share Section */}
              <ShareButton article={article} />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

