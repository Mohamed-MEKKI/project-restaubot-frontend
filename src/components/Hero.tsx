import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-white to-secondary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Delicious Food, Delivered Fresh
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Order from the best local restaurants and get it delivered to your door in minutes
          </p>
          
          {/* Search Bar */}
          <div className="flex gap-2 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for dishes or restaurants..." 
                className="pl-10 h-12 border-2 focus-visible:ring-primary"
              />
            </div>
            <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
              Search
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md border border-border">
              <div className="text-2xl md:text-3xl mb-1 text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Restaurants</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border border-border">
              <div className="text-2xl md:text-3xl mb-1 text-secondary">1000+</div>
              <div className="text-sm text-muted-foreground">Menu Items</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border border-border">
              <div className="text-2xl md:text-3xl mb-1 text-primary">50k+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
