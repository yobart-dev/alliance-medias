// Client API WordPress pour Next.js
import type {
  WordPressArticle,
  WordPressMediaPartner,
  WordPressMedia,
  WordPressApiConfig,
} from '@/types/wordpress'

// Configuration par défaut (sera remplacée par les variables d'environnement)
const defaultConfig: WordPressApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || '',
  username: process.env.WORDPRESS_USERNAME,
  password: process.env.WORDPRESS_PASSWORD,
  applicationPassword: process.env.WORDPRESS_APPLICATION_PASSWORD,
}

/**
 * Classe pour gérer les appels API WordPress
 */
class WordPressClient {
  private baseUrl: string
  private authHeader: string | null = null

  constructor(config: WordPressApiConfig = defaultConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '') // Enlever le slash final
    
    // Configuration de l'authentification pour les requêtes privées
    if (config.applicationPassword) {
      // Application Password (recommandé pour WordPress)
      const credentials = Buffer.from(
        `${config.username}:${config.applicationPassword}`
      ).toString('base64')
      this.authHeader = `Basic ${credentials}`
    } else if (config.username && config.password) {
      // Username/Password (moins sécurisé)
      const credentials = Buffer.from(
        `${config.username}:${config.password}`
      ).toString('base64')
      this.authHeader = `Basic ${credentials}`
    }
  }

  /**
   * Faire une requête GET à l'API WordPress
   */
  private async fetch<T>(
    endpoint: string,
    params: Record<string, string | number | boolean> = {},
    authenticated = false
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}/wp-json/wp/v2/${endpoint}`)
    
    // Ajouter les paramètres de requête
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value))
    })

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Ajouter l'authentification si nécessaire
    if (authenticated && this.authHeader) {
      headers['Authorization'] = this.authHeader
    }

    try {
      const response = await fetch(url.toString(), {
        headers,
        next: {
          revalidate: 300, // Cache pendant 5 minutes (ISR)
        },
      })

      if (!response.ok) {
        throw new Error(
          `WordPress API Error: ${response.status} ${response.statusText}`
        )
      }

      // Si c'est une liste, récupérer aussi les headers de pagination
      if (endpoint.includes('posts') || endpoint.includes('media-partners')) {
        const total = parseInt(response.headers.get('X-WP-Total') || '0', 10)
        const totalPages = parseInt(
          response.headers.get('X-WP-TotalPages') || '0',
          10
        )

        const data = await response.json()
        return {
          data,
          total,
          totalPages,
        } as T
      }

      return response.json()
    } catch (error) {
      console.error('WordPress API Error:', error)
      throw error
    }
  }

  /**
   * Vérifier si WordPress est disponible
   */
  private async isWordPressAvailable(): Promise<boolean> {
    if (!this.baseUrl) return false
    
    try {
      const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/posts?per_page=1`, {
        method: 'GET',
        next: { revalidate: 60 },
      })
      return response.ok
    } catch {
      return false
    }
  }

  /**
   * Récupérer tous les articles
   */
  async getArticles(params: {
    page?: number
    per_page?: number
    categories?: number[]
    tags?: number[]
    search?: string
    media_slug?: string
    _embed?: boolean
  } = {}): Promise<{
    data: WordPressArticle[]
    total: number
    totalPages: number
  }> {
    // Vérifier si WordPress est disponible, sinon retourner des données mockées
    const isAvailable = await this.isWordPressAvailable()
    if (!isAvailable) {
      // Mode démo : retourner des données vides (seront remplacées par les mocks dans les pages)
      return {
        data: [],
        total: 0,
        totalPages: 0,
      }
    }

    const queryParams: Record<string, string | number | boolean> = {
      _embed: params._embed ?? true,
      per_page: params.per_page || 10,
      page: params.page || 1,
    }

    if (params.categories && params.categories.length > 0) {
      queryParams.categories = params.categories.join(',')
    }

    if (params.tags && params.tags.length > 0) {
      queryParams.tags = params.tags.join(',')
    }

    if (params.search) {
      queryParams.search = params.search
    }

    // Filtrer par média source via meta query (nécessite un plugin ou custom endpoint)
    if (params.media_slug) {
      queryParams.meta_key = 'media_slug'
      queryParams.meta_value = params.media_slug
    }

    return this.fetch<{
      data: WordPressArticle[]
      total: number
      totalPages: number
    }>('posts', queryParams)
  }

  /**
   * Récupérer un article par ID
   */
  async getArticleById(id: number): Promise<WordPressArticle> {
    return this.fetch<WordPressArticle>(`posts/${id}`, { _embed: true })
  }

  /**
   * Récupérer un article par slug
   */
  async getArticleBySlug(slug: string): Promise<WordPressArticle | null> {
    const isAvailable = await this.isWordPressAvailable()
    if (!isAvailable) {
      return null
    }

    const result = await this.fetch<WordPressArticle[]>('posts', {
      slug,
      _embed: true,
      per_page: 1,
    })

    if (Array.isArray(result)) {
      return result[0] || null
    }

    return (result as any).data?.[0] || null
  }

  /**
   * Récupérer tous les médias partenaires
   */
  async getMediaPartners(): Promise<WordPressMediaPartner[]> {
    const isAvailable = await this.isWordPressAvailable()
    if (!isAvailable) {
      // Mode démo : retourner un tableau vide (sera remplacé par les mocks dans les pages)
      return []
    }

    const result = await this.fetch<WordPressMediaPartner[]>(
      'media-partners',
      {
        _embed: true,
        per_page: 100,
      }
    )

    if (Array.isArray(result)) {
      return result
    }

    return (result as any).data || []
  }

  /**
   * Récupérer un média partenaire par slug
   */
  async getMediaPartnerBySlug(
    slug: string
  ): Promise<WordPressMediaPartner | null> {
    const isAvailable = await this.isWordPressAvailable()
    if (!isAvailable) {
      return null
    }

    const result = await this.fetch<WordPressMediaPartner[]>(
      'media-partners',
      {
        slug,
        _embed: true,
        per_page: 1,
      }
    )

    if (Array.isArray(result)) {
      return result[0] || null
    }

    return (result as any).data?.[0] || null
  }

  /**
   * Créer un article (nécessite authentification)
   */
  async createArticle(article: {
    title: string
    content: string
    excerpt?: string
    status?: 'draft' | 'publish'
    categories?: number[]
    tags?: number[]
    featured_media?: number
    acf?: Record<string, any>
  }): Promise<WordPressArticle> {
    if (!this.authHeader) {
      throw new Error('Authentication required to create articles')
    }

    // Faire un POST avec fetch directement
    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authHeader,
      },
      body: JSON.stringify(article),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to create article: ${response.status} ${response.statusText} - ${errorText}`
      )
    }

    return response.json()
  }

  /**
   * Récupérer une image par ID
   */
  async getMediaById(id: number): Promise<WordPressMedia> {
    return this.fetch<WordPressMedia>(`media/${id}`)
  }

  /**
   * Rechercher des articles
   */
  async searchArticles(query: string, limit = 10): Promise<WordPressArticle[]> {
    const result = await this.getArticles({
      search: query,
      per_page: limit,
      _embed: true,
    })

    return result.data
  }
}

// Instance singleton
let clientInstance: WordPressClient | null = null

/**
 * Obtenir l'instance du client WordPress
 */
export function getWordPressClient(): WordPressClient {
  if (!clientInstance) {
    if (!defaultConfig.baseUrl) {
      console.warn(
        'WordPress URL not configured. Please set NEXT_PUBLIC_WORDPRESS_URL environment variable.'
      )
    }
    clientInstance = new WordPressClient()
  }
  return clientInstance
}

// Export des fonctions utilitaires
export const wp = {
  getArticles: (params?: Parameters<WordPressClient['getArticles']>[0]) =>
    getWordPressClient().getArticles(params),
  getArticleById: (id: number) => getWordPressClient().getArticleById(id),
  getArticleBySlug: (slug: string) =>
    getWordPressClient().getArticleBySlug(slug),
  getMediaPartners: () => getWordPressClient().getMediaPartners(),
  getMediaPartnerBySlug: (slug: string) =>
    getWordPressClient().getMediaPartnerBySlug(slug),
  createArticle: (article: Parameters<WordPressClient['createArticle']>[0]) =>
    getWordPressClient().createArticle(article),
  getMediaById: (id: number) => getWordPressClient().getMediaById(id),
  searchArticles: (query: string, limit?: number) =>
    getWordPressClient().searchArticles(query, limit),
}

export default getWordPressClient

