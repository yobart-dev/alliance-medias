'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { categoriesData, type MainCategory } from '@/lib/categories-data'

interface CategoryFilterProps {
  selectedMainCategory: string | null
  selectedSubCategory: string | null
  onMainCategoryClick: (categoryId: string) => void
  onSubCategoryClick: (mainCategoryId: string, subCategoryId: string) => void
  articles: any[]
}

// Helper pour convertir les classes Tailwind en couleurs CSS
function getGradientColors(tailwindClass: string): string {
  const colorMap: { [key: string]: string } = {
    'from-red-500 to-orange-500': '#ef4444, #f97316',
    'from-green-500 to-emerald-600': '#22c55e, #059669',
    'from-purple-500 to-pink-500': '#a855f7, #ec4899',
    'from-blue-500 to-cyan-500': '#3b82f6, #06b6d4',
    'from-indigo-500 to-purple-600': '#6366f1, #9333ea',
    'from-amber-500 to-orange-500': '#f59e0b, #f97316',
  }
  return colorMap[tailwindClass] || '#3b82f6, #06b6d4'
}

// Composant pour une sous-catégorie avec hover
function SubCategoryButton({ 
  subCat, 
  category, 
  isActive,
  isEmpty,
  onClick 
}: { 
  subCat: { id: string, name: string }, 
  category: { id: string, color: string },
  isActive: boolean,
  isEmpty: boolean,
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <button
      onClick={isEmpty ? undefined : onClick}
      onMouseEnter={() => !isEmpty && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isEmpty}
      className="w-full text-left px-5 py-3 text-sm font-medium transition-all duration-200"
      style={{
        backgroundImage: !isEmpty && (isActive || isHovered)
          ? `linear-gradient(to right, ${getGradientColors(category.color)})`
          : undefined,
        backgroundColor: isEmpty ? '#f9fafb' : undefined,
        color: isEmpty ? '#d1d5db' : (isActive || isHovered ? 'white' : '#374151'),
        paddingLeft: isHovered && !isActive ? '1.5rem' : '1.25rem',
        cursor: isEmpty ? 'not-allowed' : 'pointer',
        opacity: isEmpty ? 0.6 : 1
      }}
    >
      {subCat.name}
    </button>
  )
}

export function CategoryFilter({
  selectedMainCategory,
  selectedSubCategory,
  onMainCategoryClick,
  onSubCategoryClick,
  articles,
}: CategoryFilterProps) {
  // Compter les articles par sous-catégorie
  const getArticleCount = (mainCategoryId: string, subCategoryId: string) => {
    return articles.filter(
      article => article.mainCategory === mainCategoryId && article.subCategory === subCategoryId
    ).length
  }
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [openMobileCategory, setOpenMobileCategory] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Nettoyer les timeouts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHoveredCategory(categoryId)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null)
    }, 200)
  }

  const handleMainCategoryClick = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    // Desktop : fermer le dropdown et filtrer
    if (window.innerWidth >= 768) {
      setHoveredCategory(null)
      onMainCategoryClick(categoryId)
    } else {
      // Mobile : toggle dropdown
      if (openMobileCategory === categoryId) {
        // Second clic : fermer et filtrer
        setOpenMobileCategory(null)
        onMainCategoryClick(categoryId)
      } else {
        // Premier clic : ouvrir dropdown
        setOpenMobileCategory(categoryId)
      }
    }
  }

  const handleSubCategoryClick = (mainCategoryId: string, subCategoryId: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setHoveredCategory(null)
    setOpenMobileCategory(null)
    onSubCategoryClick(mainCategoryId, subCategoryId)
  }

  const handleResetFilters = () => {
    setHoveredCategory(null)
    setOpenMobileCategory(null)
    onMainCategoryClick('')
  }

  const isDropdownOpen = (categoryId: string) => {
    return hoveredCategory === categoryId || openMobileCategory === categoryId
  }

  return (
    <div className="relative bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        {/* Pills container with horizontal scroll */}
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide relative pb-2">
          {/* Bouton "Tous" */}
          <button
            onClick={handleResetFilters}
            className={`flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
              !selectedMainCategory
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous
          </button>

          {/* Catégories principales */}
          {categoriesData.map((category) => {
            const isActive = selectedMainCategory === category.id
            const isOpen = isDropdownOpen(category.id)

            return (
              <div
                key={category.id}
                className="relative flex-shrink-0"
                style={{ position: 'static' }}
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Pill button */}
                <button
                  onClick={(e) => handleMainCategoryClick(category.id, e)}
                  className={`category-pill-${category.id} group relative px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap flex items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:shadow-md'
                  }`}
                  style={{
                    backgroundImage: isActive || hoveredCategory === category.id
                      ? `linear-gradient(to right, ${getGradientColors(category.color)})`
                      : undefined,
                    color: hoveredCategory === category.id && !isActive ? 'white' : undefined
                  }}
                >
                  <span>{category.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                  <div 
                    className="fixed min-w-[240px] bg-white rounded-xl shadow-2xl border border-gray-100 py-1 overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                    style={{ 
                      top: 'calc(var(--dropdown-top, 0px) + 8px)',
                      left: 'var(--dropdown-left, 0px)',
                      zIndex: 9999
                    }}
                    ref={(el) => {
                      if (el) {
                        const button = el.previousElementSibling as HTMLElement
                        if (button) {
                          const rect = button.getBoundingClientRect()
                          el.style.setProperty('--dropdown-top', `${rect.bottom}px`)
                          el.style.setProperty('--dropdown-left', `${rect.left}px`)
                        }
                      }
                    }}
                  >
                    {category.subCategories.map((subCat) => {
                      const articleCount = getArticleCount(category.id, subCat.id)
                      const isEmpty = articleCount === 0
                      
                      return (
                        <SubCategoryButton
                          key={subCat.id}
                          subCat={subCat}
                          category={category}
                          isActive={selectedSubCategory === subCat.id && selectedMainCategory === category.id}
                          isEmpty={isEmpty}
                          onClick={() => handleSubCategoryClick(category.id, subCat.id)}
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Active filter indicator */}
        {(selectedMainCategory || selectedSubCategory) && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Filtré par :</span>
            {selectedMainCategory && (
              <span className="px-3 py-1 bg-gray-100 rounded-full">
                {categoriesData.find(c => c.id === selectedMainCategory)?.name}
                {selectedSubCategory && (
                  <span className="ml-1">
                    → {categoriesData.find(c => c.id === selectedMainCategory)?.subCategories.find(s => s.id === selectedSubCategory)?.name}
                  </span>
                )}
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-primary hover:underline ml-2"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
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

