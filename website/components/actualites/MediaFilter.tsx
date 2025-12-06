'use client'

import { useState } from 'react'
import { mockMediaPartners } from '@/lib/mock-data'
import type { Article } from '@/lib/transformers'
import Image from 'next/image'

interface MediaFilterProps {
  selectedMedia: string
  onMediaClick: (mediaName: string) => void
  articles: Article[]
}

export function MediaFilter({ selectedMedia, onMediaClick, articles }: MediaFilterProps) {
  // Compter les articles par média
  const getArticleCount = (mediaName: string) => {
    if (mediaName === 'Tous') {
      return articles.length
    }
    return articles.filter(article => article.media === mediaName).length
  }

  // Créer la liste des médias avec "Tous" en premier
  const mediasList = [
    { name: 'Tous', slug: 'tous', bgImage: null },
    ...mockMediaPartners.map(media => ({
      name: media.name,
      slug: media.slug,
      bgImage: media.bgImage
    }))
  ]

  return (
    <div className="relative bg-gradient-to-r from-slate-50 to-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        {/* Label */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold text-gray-700">📰 Médias de l'Alliance</span>
          <span className="text-xs text-muted-foreground">({mockMediaPartners.length} médias partenaires)</span>
        </div>

        {/* Pills container with horizontal scroll */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
          {mediasList.map((media) => {
            const isActive = selectedMedia === media.name
            const count = getArticleCount(media.name)
            const isEmpty = count === 0

            return (
              <button
                key={media.slug}
                onClick={() => !isEmpty && onMediaClick(media.name)}
                disabled={isEmpty}
                style={
                  !isActive && !isEmpty
                    ? {
                        transition: 'all 0.3s ease',
                      }
                    : undefined
                }
                className={`
                  group relative flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full 
                  font-medium text-sm whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-primary text-white shadow-lg scale-105 ring-2 ring-primary/30'
                      : isEmpty
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-white text-gray-700 border border-gray-200'
                  }
                  ${!isEmpty && !isActive ? 'hover:!bg-primary hover:!text-white hover:!shadow-lg hover:!scale-105 hover:!ring-2 hover:!ring-primary/30 hover:!border-transparent' : ''}
                `}
              >
                {/* Mini logo (optionnel - préparé pour plus tard) */}
                {media.bgImage && (
                  <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={media.bgImage}
                      alt={media.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                )}

                {/* Nom du média */}
                <span>{media.name}</span>

                {/* Compteur d'articles */}
                <span
                  className={`
                    text-xs font-semibold px-2 py-0.5 rounded-full
                    ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isEmpty
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-white/20 group-hover:text-white'
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* CSS pour masquer la scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

