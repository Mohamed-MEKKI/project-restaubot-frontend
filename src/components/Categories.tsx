import { useState } from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'salads', name: 'Salads', icon: '🥗' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
];

interface CategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Categories({ selectedCategory, onCategoryChange }: CategoriesProps) {
  return (
    <section className="py-8 bg-white border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl mb-6 text-center">Browse by Category</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`flex-shrink-0 h-auto py-3 px-6 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-primary hover:bg-primary/90 text-white'
                  : 'hover:border-primary hover:text-primary'
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
