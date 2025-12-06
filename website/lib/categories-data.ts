// Structure hiérarchique des catégories pour les articles

export interface SubCategory {
  id: string
  name: string
}

export interface MainCategory {
  id: string
  name: string
  icon?: string
  color: string
  subCategories: SubCategory[]
}

export const categoriesData: MainCategory[] = [
  {
    id: 'sports',
    name: 'Sports',
    color: 'from-red-500 to-orange-500',
    subCategories: [
      { id: 'football', name: 'Football' },
      { id: 'rugby', name: 'Rugby' },
      { id: 'basket', name: 'Basketball' },
      { id: 'sports-nautiques', name: 'Sports nautiques' },
      { id: 'athletisme', name: 'Athlétisme' },
      { id: 'sports-hiver', name: 'Sports d\'hiver' },
    ]
  },
  {
    id: 'environnement',
    name: 'Environnement',
    color: 'from-green-500 to-emerald-600',
    subCategories: [
      { id: 'ecologie', name: 'Écologie' },
      { id: 'agriculture', name: 'Agriculture' },
      { id: 'energie', name: 'Énergie' },
      { id: 'nature', name: 'Nature' },
      { id: 'climat', name: 'Climat' },
      { id: 'biodiversite', name: 'Biodiversité' },
    ]
  },
  {
    id: 'evenements',
    name: 'Événements',
    color: 'from-purple-500 to-pink-500',
    subCategories: [
      { id: 'festivals', name: 'Festivals' },
      { id: 'culture', name: 'Culture' },
      { id: 'spectacles', name: 'Spectacles' },
      { id: 'expositions', name: 'Expositions' },
      { id: 'concerts', name: 'Concerts' },
      { id: 'conferences', name: 'Conférences' },
    ]
  },
  {
    id: 'actualites',
    name: 'Actualités',
    color: 'from-blue-500 to-cyan-500',
    subCategories: [
      { id: 'politique', name: 'Politique' },
      { id: 'economie', name: 'Économie' },
      { id: 'societe', name: 'Société' },
      { id: 'education', name: 'Éducation' },
      { id: 'justice', name: 'Justice' },
      { id: 'transport', name: 'Transport' },
    ]
  },
  {
    id: 'podcasts',
    name: 'Podcasts',
    color: 'from-indigo-500 to-purple-600',
    subCategories: [
      { id: 'interviews', name: 'Interviews' },
      { id: 'debats', name: 'Débats' },
      { id: 'reportages', name: 'Reportages' },
      { id: 'documentaires', name: 'Documentaires' },
      { id: 'analyses', name: 'Analyses' },
      { id: 'temoignages', name: 'Témoignages' },
    ]
  },
  {
    id: 'vie-locale',
    name: 'Vie locale',
    color: 'from-amber-500 to-orange-500',
    subCategories: [
      { id: 'quartiers', name: 'Quartiers' },
      { id: 'initiatives', name: 'Initiatives citoyennes' },
      { id: 'social', name: 'Social' },
      { id: 'sante', name: 'Santé' },
      { id: 'solidarite', name: 'Solidarité' },
      { id: 'urbanisme', name: 'Urbanisme' },
    ]
  },
]

// Helper pour obtenir une catégorie par ID
export function getCategoryById(id: string): MainCategory | undefined {
  return categoriesData.find(cat => cat.id === id)
}

// Helper pour obtenir une sous-catégorie
export function getSubCategoryById(mainCategoryId: string, subCategoryId: string): SubCategory | undefined {
  const mainCategory = getCategoryById(mainCategoryId)
  return mainCategory?.subCategories.find(sub => sub.id === subCategoryId)
}

// Helper pour obtenir toutes les catégories principales
export function getAllMainCategories(): MainCategory[] {
  return categoriesData
}

// Helper pour obtenir les couleurs du gradient en format CSS
export function getGradientColors(tailwindGradient: string): string {
  const colorMap: Record<string, string> = {
    'from-red-500 to-orange-500': '#ef4444, #f97316',
    'from-green-500 to-emerald-600': '#22c55e, #059669',
    'from-purple-500 to-pink-500': '#a855f7, #ec4899',
    'from-blue-500 to-cyan-500': '#3b82f6, #06b6d4',
    'from-indigo-500 to-purple-600': '#6366f1, #9333ea',
    'from-amber-500 to-orange-500': '#f59e0b, #f97316',
  }
  return colorMap[tailwindGradient] || '#3b82f6, #06b6d4'
}

// Helper pour obtenir la couleur d'une catégorie à partir d'une sous-catégorie ou catégorie principale
export function getCategoryColor(categoryOrSubCategory: string): string {
  if (!categoryOrSubCategory) return 'from-blue-500 to-cyan-500'
  
  const normalized = categoryOrSubCategory.toLowerCase().trim()
  
  // Chercher d'abord si c'est une catégorie principale
  const mainCategory = categoriesData.find(cat => cat.id === normalized)
  if (mainCategory) {
    return mainCategory.color
  }

  // Sinon, chercher dans les sous-catégories
  for (const category of categoriesData) {
    const subCategory = category.subCategories.find(
      sub => sub.id === normalized
    )
    if (subCategory) {
      return category.color
    }
  }

  // Par défaut, retourner la couleur des actualités
  return 'from-blue-500 to-cyan-500'
}

// Helper pour obtenir le style inline du gradient
export function getCategoryGradientStyle(categoryOrSubCategory: string): { backgroundImage: string } {
  const color = getCategoryColor(categoryOrSubCategory)
  const colors = getGradientColors(color)
  return {
    backgroundImage: `linear-gradient(to right, ${colors})`,
  }
}

