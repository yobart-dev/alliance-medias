// Transformateurs pour convertir les données WordPress en format utilisable par les composants
import type {
  WordPressArticle,
  WordPressMediaPartner,
  WordPressMedia,
} from '@/types/wordpress'

export interface Article {
  id: number
  title: string
  excerpt: string
  content?: string
  media: string
  mediaSlug: string
  category: string
  mainCategory?: string  // Nouvelle catégorie principale
  subCategory?: string   // Nouvelle sous-catégorie
  date: string
  readTime: string
  image: string
  slug: string
  link: string
}

export interface MediaPartner {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  longDescription: string
  theme: string
  color: string
  icon: string
  coverage: string
  founded: string
  website: string
  specialties: string[]
  team: string
  audience: string
  bgImage: string
  logo?: string
}

/**
 * Transformer un article WordPress en format Article
 */
export function transformArticle(wpArticle: WordPressArticle): Article {
  // Extraire l'image
  let imageUrl = '/placeholder.svg'
  if (wpArticle.featured_media && wpArticle._embedded?.['wp:featuredmedia']?.[0]) {
    imageUrl = wpArticle._embedded['wp:featuredmedia'][0].source_url
  } else if (wpArticle.acf?.featured_image?.url) {
    imageUrl = wpArticle.acf.featured_image.url
  }

  // Extraire la catégorie
  let category = 'Actualité'
  if (wpArticle._embedded?.['wp:term']?.[0]?.[0]) {
    category = wpArticle._embedded['wp:term'][0][0].name || 'Actualité'
  } else if (wpArticle.acf?.category) {
    category = wpArticle.acf.category
  }

  // Extraire le média source
  const mediaSource = wpArticle.acf?.media_source || 'Alliance Medias'
  const mediaSlug = wpArticle.acf?.media_slug || 'alliance-medias'

  // Extraire le temps de lecture
  const readTime = wpArticle.acf?.read_time || '5 min'

  // Nettoyer l'excerpt (enlever les balises HTML)
  const excerpt = wpArticle.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 150) + '...'

  return {
    id: wpArticle.id,
    title: wpArticle.title.rendered,
    excerpt,
    content: wpArticle.content.rendered,
    media: mediaSource,
    mediaSlug,
    category,
    date: wpArticle.date,
    readTime,
    image: imageUrl,
    slug: wpArticle.slug,
    link: wpArticle.link,
  }
}

/**
 * Transformer un média partenaire WordPress en format MediaPartner
 */
export function transformMediaPartner(
  wpMedia: WordPressMediaPartner
): MediaPartner {
  const acf = wpMedia.acf || {}

  // Extraire l'image de fond
  let bgImage = '/placeholder.svg'
  if (wpMedia._embedded?.['wp:featuredmedia']?.[0]) {
    bgImage = wpMedia._embedded['wp:featuredmedia'][0].source_url
  } else if (acf.bg_image?.url) {
    bgImage = acf.bg_image.url
  }

  // Extraire le logo
  let logo: string | undefined
  if (acf.logo?.url) {
    logo = acf.logo.url
  }

  // Gérer les spécialités (peuvent être un tableau ou une chaîne)
  let specialties: string[] = []
  if (Array.isArray(acf.specialties)) {
    specialties = acf.specialties
  } else if (typeof acf.specialties === 'string') {
    specialties = acf.specialties.split('\n').filter((s: string) => s.trim())
  }

  return {
    id: wpMedia.slug,
    name: acf.name || wpMedia.title.rendered,
    slug: wpMedia.slug,
    tagline: acf.tagline || '',
    description: acf.description || '',
    longDescription: acf.long_description || '',
    theme: acf.theme || '',
    color: acf.color || 'from-slate-700 to-slate-900',
    icon: acf.icon || 'Newspaper',
    coverage: acf.coverage || '',
    founded: acf.founded || '',
    website: acf.website || '',
    specialties,
    team: acf.team || '',
    audience: acf.audience || '',
    bgImage,
    logo,
  }
}

/**
 * Transformer une liste d'articles WordPress
 */
export function transformArticles(wpArticles: WordPressArticle[]): Article[] {
  return wpArticles.map(transformArticle)
}

/**
 * Transformer une liste de médias partenaires WordPress
 */
export function transformMediaPartners(
  wpMedias: WordPressMediaPartner[]
): MediaPartner[] {
  return wpMedias.map(transformMediaPartner)
}

/**
 * Obtenir l'URL d'une image WordPress
 */
export function getWordPressImageUrl(
  media: WordPressMedia | undefined,
  size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'
): string {
  if (!media) return '/placeholder.svg'

  if (size === 'full') {
    return media.source_url
  }

  const sizes = media.media_details?.sizes
  if (sizes && sizes[size]) {
    return sizes[size].source_url
  }

  return media.source_url
}

