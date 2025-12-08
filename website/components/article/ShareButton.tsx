'use client'

import { Share2 } from 'lucide-react'
import type { Article } from '@/lib/transformers'

interface ShareButtonProps {
  article: Article
}

export function ShareButton({ article }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // L'utilisateur a annulé le partage
        console.log('Share cancelled')
      }
    } else {
      // Fallback : copier le lien dans le presse-papiers
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papiers !')
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-muted-foreground">Partager :</span>
        <button
          onClick={handleShare}
          className="p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Partager l'article"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

