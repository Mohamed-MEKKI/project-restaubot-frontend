import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { toast } from 'sonner';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  cuisine: string;
  image: string;
}

interface MenuListProps {
  onAddNew: () => void;
  onEdit?: (item: MenuItem) => void;
}

export function MenuList({ onAddNew, onEdit }: MenuListProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this menu item?')) return;
        
  try {
    await fetch('http://127.0.0.1:8000/menuitem/delete/', {
          headers:{
            'Content-Type':"application/json"
          },
          body: JSON.stringify({ids: [id]}),
          method: 'DELETE'
        })
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast.success('Menu item deleted successfully');
  } catch (error) {
    toast.error('Failed to delete menu item');
  }
};

useEffect(() => {
    setIsLoading(true);
    async function fetchItems() {
      
      try {
      const response = await fetch('http://127.0.0.1:8000/menuitem/get-all/');
      const data = await response.json();
      setMenuItems(Array.isArray(data) ? data : []);
      } catch (error) {
      console.error('Failed to fetch menu items:', error);
      } finally {
      setIsLoading(false);
      }
    }

    fetchItems();
  }, []);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Menu Management
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your restaurant&apos;s menu items
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-3xl mt-1">{menuItems.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Price</p>
                  <p className="text-3xl mt-1">
                    ${menuItems.length > 0 ? (menuItems.reduce((acc, item) => acc + item.price, 0) / menuItems.length).toFixed(2) : '0.00'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cuisines</p>
                  <p className="text-3xl mt-1">
                    {new Set(menuItems.map(item => item.cuisine)).size}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button
            onClick={onAddNew}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12 gap-2"
          >
            <Plus className="h-5 w-5" />
            Add New Item
          </Button>
        </div>

        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <CardContent className="p-4">
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <Card className="p-12 text-center border-2 border-dashed">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl mb-2">No menu items found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Start by adding your first menu item'}
            </p>
            {!searchQuery && (
              <Button onClick={onAddNew} className="bg-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Item
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-primary">
                    {item.cuisine}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-2xl text-primary">${item.price}</div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="hover:border-primary hover:text-primary"
                        onClick={() => onEdit?.(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="hover:border-red-500 hover:text-red-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
