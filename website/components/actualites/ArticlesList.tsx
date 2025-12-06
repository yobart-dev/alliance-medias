'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock, Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Article } from '@/lib/transformers'
import { CategoryFilter } from './CategoryFilter'

interface ArticlesListProps {
  articles: Article[]
  categories: string[]
  medias: string[]
}

export function ArticlesList({ articles, categories, medias }: ArticlesListProps) {
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [selectedMedia, setSelectedMedia] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleMainCategoryClick = (categoryId: string) => {
    if (categoryId === '') {
      // Reset filters
      setSelectedMainCategory(null)
      setSelectedSubCategory(null)
    } else if (selectedMainCategory === categoryId) {
      // Deselect if same category
      setSelectedMainCategory(null)
      setSelectedSubCategory(null)
    } else {
      setSelectedMainCategory(categoryId)
      setSelectedSubCategory(null) // Reset sub-category when main changes
    }
  }

  const handleSubCategoryClick = (mainCategoryId: string, subCategoryId: string) => {
    setSelectedMainCategory(mainCategoryId)
    setSelectedSubCategory(subCategoryId)
  }

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Filtrage par catégorie hiérarchique
      let matchesCategory = true
      if (selectedMainCategory) {
        matchesCategory = article.mainCategory === selectedMainCategory
        if (selectedSubCategory) {
          matchesCategory = matchesCategory && article.subCategory === selectedSubCategory
        }
      }
      
      const matchesMedia = selectedMedia === 'Tous' || article.media === selectedMedia
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesCategory && matchesMedia && matchesSearch
    })
  }, [articles, selectedMainCategory, selectedSubCategory, selectedMedia, searchQuery])

  return (
    <>
      {/* Category Filter - Horizontal Pills */}
      <CategoryFilter
        selectedMainCategory={selectedMainCategory}
        selectedSubCategory={selectedSubCategory}
        onMainCategoryClick={handleMainCategoryClick}
        onSubCategoryClick={handleSubCategoryClick}
        articles={articles}
      />

      {/* Filters Section - Search and Media */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un article..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="lg:hidden w-full sm:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres
            </Button>

            {/* Desktop Filters - Media only */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Média:</span>
              <select
                value={selectedMedia}
                onChange={(e) => setSelectedMedia(e.target.value)}
                className="flex h-9 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {medias.map((media) => (
                  <option key={media} value={media}>
                    {media === 'Tous' ? 'Tous médias' : media}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters - Media only */}
          {showFilters && (
            <div className="lg:hidden mt-4 space-y-4 pb-4 border-t border-border pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Média</label>
                <select
                  value={selectedMedia}
                  onChange={(e) => setSelectedMedia(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {medias.map((media) => (
                    <option key={media} value={media}>
                      {media === 'Tous' ? 'Tous médias' : media}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}
            </p>
            {(selectedMainCategory || selectedMedia !== 'Tous' || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleMainCategoryClick('')
                  setSelectedMedia('Tous')
                  setSearchQuery('')
                }}
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                Aucun article ne correspond à vos critères de recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <Badge className="absolute top-3 left-3 z-10">
                        {article.category}
                      </Badge>
                    </div>
                    
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-primary">{article.media}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                      
                      <h3 className="font-heading text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="pt-2 text-xs text-muted-foreground">
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

