// Ce fichier est maintenant obsolète - les données viennent de WordPress
// Conservé pour compatibilité temporaire pendant la migration

import { wp } from './wordpress'
import { transformMediaPartners, transformArticles } from './transformers'

/**
 * Récupérer tous les médias partenaires depuis WordPress
 * @deprecated Utilisez directement wp.getMediaPartners() et transformMediaPartners()
 */
export async function getMediasData() {
  try {
    const wpMedias = await wp.getMediaPartners()
    const medias = transformMediaPartners(wpMedias)
    
    // Convertir en objet avec slug comme clé (pour compatibilité)
    const mediasMap: Record<string, any> = {}
    medias.forEach((media) => {
      mediasMap[media.slug] = {
        id: media.id,
        name: media.name,
        slug: media.slug,
        tagline: media.tagline,
        description: media.description,
        longDescription: media.longDescription,
        theme: media.theme,
        color: media.color,
        icon: media.icon,
        coverage: media.coverage,
        founded: media.founded,
        website: media.website,
        specialties: media.specialties,
        team: media.team,
        audience: media.audience,
        bgImage: media.bgImage,
      }
    })
    
    return mediasMap
  } catch (error) {
    console.error('Error fetching media partners:', error)
    // Retourner un objet vide en cas d'erreur
    return {}
  }
}

/**
 * Récupérer les articles d'un média depuis WordPress
 * @deprecated Utilisez directement wp.getArticles() avec media_slug
 */
export async function getMediaArticles(mediaSlug: string) {
  try {
    const result = await wp.getArticles({
      media_slug: mediaSlug,
      per_page: 10,
      _embed: true,
    })
    
    return transformArticles(result.data)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

// Export pour compatibilité avec l'ancien code
export const mediasData = getMediasData()
