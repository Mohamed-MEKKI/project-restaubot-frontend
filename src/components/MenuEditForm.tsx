import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Upload, Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useAuth } from '@clerk/clerk-react';
import { MenuItem } from 'interfaces/Menu';
import { apiFetch } from '@/api/menuApi';
import { useParams } from 'next/navigation';

interface FormErrors {
  [key: string]: string;
}

interface MenuItemEditProps {
  menuItem: MenuItem;
  onBack?: () => void;
  onSuccess?: () => void;
  id?: string;
}

export function MenuItemEdit({ menuItem, onBack, onSuccess, id }: MenuItemEditProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [item, setItem] = useState<MenuItem>(menuItem);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hasNewImage, setHasNewImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  const requiredFields = ['name', 'price', 'cuisine', 'description'];

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    async function fetchItem() {
      setIsFetching(true);
      try {
        const token = await getToken();
        const data = await apiFetch(`/menuitem/get/${id}/`, token);
        setItem(data); // ← fresh data lands here
        // ← set image preview from fresh data, not stale prop
        setImagePreview(data.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${data.image}` : null);
      } catch (error) {
        toast.error('Could not refresh item — showing cached data');
        // fallback: use prop image
        setImagePreview(menuItem.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${menuItem.image}` : null);
      } finally {
        setIsFetching(false);
      }
    }

    fetchItem();
  }, [isLoaded, isSignedIn, menuItem.id]);

  // ── Spinner — form only mounts AFTER this clears ──────────────────────────
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p>Loading item...</p>
        </div>
      </div>
    );
  }

  // ── Helpers (safe to define after early return since no hooks below) ───────
  const validate = (formData: FormData): FormErrors => {
    const errs: FormErrors = {};
    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errs[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    const price = formData.get('price') as string;
    if (price && isNaN(Number(price))) {
      errs['price'] = 'Price must be a valid number';
    }
    return errs;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
      setHasNewImage(true);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    // ← revert to item (fresh fetch), not stale menuItem prop
    setImagePreview(item.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${item.image}` : null);
    setHasNewImage(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      toast.error('Please fill in all required fields');
      return;
    }

    setErrors({});

    try {
      if (!isLoaded || !isSignedIn) {
        toast.error('You must be signed in');
        return;
      }
      const token = await getToken();
      await apiFetch(`/menuitem/update/${item.id}/`, token, {
        method: 'PUT',
        body: formData,
      });
      toast.success('Menu item updated successfully!');
      if (onSuccess) setTimeout(() => onSuccess(), 1000);
    } catch (error) {
      toast.error('Network error. Please check your connection.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 hover:bg-primary/10" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Edit Menu Item
          </h1>
          <p className="text-muted-foreground text-lg">Update your menu item details</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            {/* ← item.name not menuItem.name */}
            <CardDescription>Modify the information about {item.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name" name="name"
                  defaultValue={item.name}          // ← item not menuItem
                  placeholder="e.g., Classic Burger"
                  className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <X className="h-4 w-4" /> {errors.name}
                  </div>
                )}
              </div>

              {/* Price & Cuisine */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base">
                    Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price" name="price" type="number" step="0.01"
                    defaultValue={item.price}        // ← item not menuItem
                    className={`h-12 ${errors.price ? 'border-red-500' : ''}`}
                  />
                  {errors.price && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <X className="h-4 w-4" /> {errors.price}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuisine" className="text-base">
                    Cuisine <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cuisine" name="cuisine"
                    defaultValue={item.cuisine}      // ← item not menuItem
                    placeholder="e.g., American, Italian"
                    className={`h-12 ${errors.cuisine ? 'border-red-500' : ''}`}
                  />
                  {errors.cuisine && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <X className="h-4 w-4" /> {errors.cuisine}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description" name="description"
                  defaultValue={item.description}    // ← item not menuItem
                  placeholder="Describe your dish in detail..."
                  className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <X className="h-4 w-4" /> {errors.description}
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-base">
                  Image
                  <span className="text-sm text-muted-foreground ml-2">
                    (Optional — leave blank to keep current)
                  </span>
                </Label>
                <div className="space-y-4">
                  <Input
                    ref={imageInputRef}
                    id="image" name="image" type="file" accept="image/*"
                    onChange={handleImageChange}
                    className="h-12 cursor-pointer"
                  />
                  {imagePreview ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-border">
                      <ImageWithFallback
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className={hasNewImage ? 'bg-primary' : 'bg-blue-500'}>
                          {hasNewImage ? 'New Image' : 'Current Image'}
                        </Badge>
                      </div>
                      {hasNewImage && (
                        <div className="absolute top-2 right-2">
                          <Button
                            type="button" size="icon" variant="secondary"
                            className="rounded-full" onClick={handleRemoveImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Upload a new image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={onBack} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</>
                  ) : (
                    <><Check className="mr-2 h-4 w-4" /> Update Menu Item</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Tip:</strong> Regular updates with fresh images keep customers engaged.
          </p>
        </div>
      </div>
    </div>
  );
}