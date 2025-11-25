import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ArticleCard({ title, description, date, imageUrl }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" size="sm">Lire la suite</Button>
      </CardContent>
    </Card>
  );
}