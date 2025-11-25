import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import BentoGrid from "@/components/BentoGrid";


export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Choix de la catégorie</h1>
      <div className="flex gap-2">
        <Button variant="outline">Toutes les actualités</Button>
        <Button variant="outline">Économie</Button>
        <Button variant="outline">Technologie</Button>
      </div>
      <h1 className="pt-5 text-3xl font-bold mb-8">Alliance Médias - Actualités</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard 
          title="Première actualité importante"
          description="Ceci est la description de la première actualité avec plus de détails"
          date="25 novembre 2024"
          imageUrl="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400"
        />
        
        <ArticleCard 
          title="Deuxième article"
          description="Une autre actualité intéressante sur l'économie mondiale"
          date="24 novembre 2024"
          imageUrl="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400"
        />
        
        <ArticleCard 
          title="Troisième news"
          description="Encore une information importante sur la technologie"
          date="23 novembre 2024"
          imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400"
        />
      <button size="lg" variant="default" className="bg-blue-500 text-white p-2 rounded-md">Click me</button> 
      </div>
      <BentoGrid subtitle="Bienvenue sur Next.js " title="On change et on devient PRO" />
    </div>
  );
}