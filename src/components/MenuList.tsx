import { useState, useEffect, useCallback } from 'react';
import { Loader2, Plus, Search, Edit, Trash2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { useAuth } from '@clerk/clerk-react';
import { MenuItem } from 'interfaces/Menu';   
import { apiFetch } from '@/api/menuApi';    

interface MenuListProps {
  onAddNew: () => void;
  onEdit?: (id: string) => void;
}

export function MenuList({ onAddNew, onEdit }: MenuListProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    async function fetchItems() {
      setIsLoading(true);
      try {
        const token = await getToken();
        const data = await apiFetch('/menuitem/get-all/', token);
        setMenuItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
        toast.error('Failed to load menu items');
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, [isLoaded, isSignedIn]);

  const handleDelete = useCallback(async (id: string) => {
    if (!isLoaded || !isSignedIn) return;
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const token = await getToken();
      await apiFetch('/menuitem/delete/', token, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [id] }),
      });
      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast.success('Menu item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete menu item');
    }
  }, [isLoaded, isSignedIn, getToken]);

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Menu Management
          </h1>
          <p className="text-muted-foreground text-lg">Manage your restaurant&apos;s menu items</p>
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
                    ${menuItems.length > 0
                      ? (menuItems.reduce((acc, item) => acc + Number(item.price), 0) / menuItems.length).toFixed(2)
                      : '0.00'}
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
                  <p className="text-3xl mt-1">{new Set(menuItems.map(item => item.cuisine)).size}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
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
          <Button onClick={onAddNew} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12 gap-2">
            <Plus className="h-5 w-5" /> Add New Item
          </Button>
        </div>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <Card className="p-12 text-center border-2 border-dashed">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl mb-2">No menu items found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try a different search term' : 'Start by adding your first menu item'}
            </p>
            {!searchQuery && (
              <Button onClick={onAddNew} className="bg-primary">
                <Plus className="mr-2 h-4 w-4" /> Add Your First Item
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={item.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}` : ''}
                    alt={item.name}
                    fill                              // ← fixes width/height error
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <Badge className="absolute top-3 left-3 bg-white text-primary">{item.cuisine}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-2xl text-primary">${Number(item.price).toFixed(2)}</div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" className="hover:border-primary hover:text-primary" onClick={() => onEdit?.(item.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" className="hover:border-red-500 hover:text-red-500" onClick={() => handleDelete(item.id)}>
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