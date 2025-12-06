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

