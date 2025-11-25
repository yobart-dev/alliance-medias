import { MetadataRoute } from 'next'
import { wp } from '@/lib/wordpress'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alliance-medias.fr'

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/alliance`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/actualites`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Pages dynamiques : médias partenaires
  let mediaPages: MetadataRoute.Sitemap = []
  try {
    const wpMedias = await wp.getMediaPartners()
    mediaPages = wpMedias.map((media) => ({
      url: `${baseUrl}/media/${media.slug}`,
      lastModified: new Date(media.modified || media.date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching media partners for sitemap:', error)
  }

  // Pages dynamiques : articles
  let articlePages: MetadataRoute.Sitemap = []
  try {
    const articlesResult = await wp.getArticles({
      per_page: 100,
      _embed: false,
    })
    articlePages = articlesResult.data.map((article) => ({
      url: `${baseUrl}/article/${article.slug}`,
      lastModified: new Date(article.modified || article.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error)
  }

  return [...staticPages, ...mediaPages, ...articlePages]
}

