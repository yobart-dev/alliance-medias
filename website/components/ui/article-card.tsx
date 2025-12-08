import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Clock, ArrowRight } from 'lucide-react'
import { getCategoryGradientStyle } from '@/lib/categories-data'

interface ArticleCardProps {
  id: string
  title: string
  excerpt: string
  image: string
  slug: string
  readTime: string
  category?: string
  subCategory?: string
}

export function ArticleCard({
  title,
  excerpt,
  image,
  slug,
  readTime,
  category,
  subCategory
}: ArticleCardProps) {
  // Utiliser la sous-catégorie en priorité, sinon la catégorie principale
  const badgeCategory = subCategory || category || ''
  const gradientStyle = getCategoryGradientStyle(badgeCategory)
  return (
    <article className="
  group h-full p-4 rounded-lg
  bg-card
  transition-all duration-700 ease-out
  hover:bg-slate-50 
  hover:shadow-xl hover:shadow-slate-200
  hover:-translate-y-3
  shadow-md
">
      <Link href={`/article/${slug}`} className="flex flex-col h-full">
        {/* Image */}
        <figure className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mb-4 bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {badgeCategory && (
            <span 
              className="absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg"
              style={gradientStyle}
            >
              {badgeCategory}
            </span>
          )}
        </figure>
                {/* Contenu */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-bold leading-tight mb-2 group-hover:text-primary transition-colors duration-2000">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {readTime}
            </div>
            <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </Link>
    </article>
  )
}