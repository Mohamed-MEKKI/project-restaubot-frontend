import { FormEvent, useState } from 'react';
import { ArrowLeft, Upload, Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface FormErrors {
  [key: string]: string;
}

interface MenuItemFormProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function MenuItemForm({ onBack, onSuccess }: MenuItemFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const requiredFields = ['name', 'price', 'cuisine', 'description', 'image'];

  const validate = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    
    requiredFields.forEach((field) => {
      const value = formData.get(field);
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Validate price is a number
    const price = formData.get('price') as string;
    if (price && isNaN(Number(price))) {
      errors['price'] = 'Price must be a valid number';
    }

    return errors;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      const response = await fetch('http://127.0.0.1:8000/menuitem/create/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Menu item created successfully!');
                
        // Call success callback if provided
        if (onSuccess) {
          setTimeout(() => onSuccess(), 1000);
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to create menu item');
      }
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
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 hover:bg-primary/10"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Menu
          </Button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Create New Menu Item
          </h1>
          <p className="text-muted-foreground text-lg">
            Add a delicious new dish to your menu
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Fill in the information about your menu item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Classic Burger"
                  className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <X className="h-4 w-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Price and Cuisine Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-base">
                    Price ($) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="12.99"
                    className={`h-12 ${errors.price ? 'border-red-500' : ''}`}
                  />
                  {errors.price && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <X className="h-4 w-4" />
                      {errors.price}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cuisine" className="text-base">
                    Cuisine <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="cuisine"
                    name="cuisine"
                    placeholder="e.g., American, Italian"
                    className={`h-12 ${errors.cuisine ? 'border-red-500' : ''}`}
                  />
                  {errors.cuisine && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <X className="h-4 w-4" />
                      {errors.cuisine}
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
                  id="description"
                  name="description"
                  placeholder="Describe your dish in detail..."
                  className={`min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
                />
                {errors.description && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <X className="h-4 w-4" />
                    {errors.description}
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-base">
                  Image <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={`h-12 cursor-pointer ${errors.image ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.image && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <X className="h-4 w-4" />
                      {errors.image}
                    </div>
                  )}
                  
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-border">
                      <ImageWithFallback
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          type="button"
                          size="icon"
                          variant="secondary"
                          className="rounded-full"
                          onClick={() => {
                            setImagePreview(null);
                            const input = document.getElementById('image') as HTMLInputElement;
                            if (input) input.value = '';
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {!imagePreview && (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Upload an image of your dish
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={onBack}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Create Menu Item
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> High-quality images and detailed descriptions help customers make better choices and increase sales!
          </p>
        </div>
      </div>
    </div>
  );
}
