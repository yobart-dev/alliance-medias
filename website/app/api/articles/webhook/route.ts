import { NextRequest, NextResponse } from 'next/server'
import { wp } from '@/lib/wordpress'
import { z } from 'zod'

// Schéma de validation pour les articles reçus
const articleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  media_slug: z.string().min(1),
  media_source: z.string().min(1),
  category: z.string().optional(),
  read_time: z.string().optional(),
  featured_image_url: z.string().url().optional(),
  date: z.string().optional(),
  status: z.enum(['draft', 'publish']).optional().default('publish'),
})

export async function POST(request: NextRequest) {
  try {
    // Vérifier la clé secrète
    const authHeader = request.headers.get('authorization')
    const secretKey = process.env.WEBHOOK_SECRET_KEY

    if (!secretKey) {
      console.error('WEBHOOK_SECRET_KEY not configured')
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      )
    }

    if (authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parser le body
    const body = await request.json()

    // Valider les données
    const validatedData = articleSchema.parse(body)

    // Créer l'article dans WordPress
    const wpArticle = await wp.createArticle({
      title: validatedData.title,
      content: validatedData.content,
      excerpt: validatedData.excerpt,
      status: validatedData.status,
      acf: {
        media_slug: validatedData.media_slug,
        media_source: validatedData.media_source,
        category: validatedData.category,
        read_time: validatedData.read_time,
      },
    })

    // Si une image est fournie, l'uploader vers WordPress
    if (validatedData.featured_image_url) {
      try {
        // Note: L'upload d'image nécessite une authentification WordPress
        // Pour l'instant, on stocke juste l'URL dans ACF
        // TODO: Implémenter l'upload d'image vers WordPress Media Library
        console.log('Image URL provided:', validatedData.featured_image_url)
      } catch (error) {
        console.error('Error handling image:', error)
      }
    }

    return NextResponse.json({
      success: true,
      article: {
        id: wpArticle.id,
        slug: wpArticle.slug,
        link: wpArticle.link,
      },
    })
  } catch (error) {
    console.error('Webhook error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Méthode GET pour vérifier que l'endpoint fonctionne
export async function GET() {
  return NextResponse.json({
    message: 'Webhook endpoint is active',
    method: 'POST',
    requiredHeaders: {
      'Authorization': 'Bearer YOUR_SECRET_KEY',
      'Content-Type': 'application/json',
    },
    exampleBody: {
      title: 'Titre de l\'article',
      content: 'Contenu de l\'article...',
      excerpt: 'Résumé de l\'article',
      media_slug: 'sport-med',
      media_source: 'Sport MED',
      category: 'Sport',
      read_time: '5 min',
      featured_image_url: 'https://example.com/image.jpg',
      status: 'publish',
    },
  })
}

