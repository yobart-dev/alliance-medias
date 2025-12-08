// Types TypeScript pour l'API WordPress

export interface WordPressMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes: {
      [key: string]: {
        source_url: string
        width: number
        height: number
      }
    }
  }
}

export interface WordPressAuthor {
  id: number
  name: string
  slug: string
  avatar_urls: {
    [key: string]: string
  }
}

export interface WordPressCategory {
  id: number
  name: string
  slug: string
}

export interface WordPressTag {
  id: number
  name: string
  slug: string
}

export interface WordPressArticle {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
    protected: boolean
  }
  excerpt: {
    rendered: string
    protected: boolean
  }
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  sticky: boolean
  template: string
  format: string
  meta: {
    [key: string]: any
  }
  acf?: {
    read_time?: string
    media_source?: string
    media_slug?: string
    featured_image?: number
    [key: string]: any
  }
  categories: number[]
  tags: number[]
  _embedded?: {
    author?: WordPressAuthor[]
    'wp:featuredmedia'?: WordPressMedia[]
    'wp:term'?: Array<Array<WordPressCategory | WordPressTag>>
  }
}

export interface WordPressMediaPartner {
  id: number
  title: {
    rendered: string
  }
  slug: string
  acf?: {
    name: string
    tagline: string
    description: string
    long_description: string
    theme: string
    color: string
    icon: string
    coverage: string
    founded: string
    website: string
    specialties: string[]
    team: string
    audience: string
    bg_image?: number
    logo?: number
  }
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[]
  }
}

export interface WordPressResponse<T> {
  data: T[]
  total: number
  totalPages: number
}

export interface WordPressApiConfig {
  baseUrl: string
  username?: string
  password?: string
  applicationPassword?: string
}

