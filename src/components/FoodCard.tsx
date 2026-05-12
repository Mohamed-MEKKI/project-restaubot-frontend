import { Star, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState } from 'react';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  isPopular?: boolean;
  onAddToCart: (id: string) => void;
}

export function FoodCard({
  id,
  name,
  description,
  price,
  image,
  rating,
  category,
  isPopular = false,
  onAddToCart,
}: FoodCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {isPopular && (
          <Badge className="absolute top-3 left-3 bg-secondary">
            Popular
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-white/90 hover:bg-white ${
            isFavorite ? 'text-red-500' : ''
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground ml-2">• {category}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-2xl text-primary">${price.toFixed(2)}</div>
          <Button
            className="bg-primary hover:bg-primary/90 gap-2"
            onClick={() => onAddToCart(id)}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
