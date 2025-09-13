import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, X, Plus, Trash2, Upload } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { createProduct, updateProduct, getProductById } from '@/services/productService';
import type { Product, ProductWithoutId } from '@/types/product';

// Define the product schema using Zod
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  sku: z.string().optional(),
  stock: z.number().min(0, 'Stock cannot be negative'),
  isActive: z.boolean().default(true),
  specifications: z.record(z.string()).default({}),
  images: z.array(z.string()).default([]),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// Define categories for the select dropdown
const PRODUCT_CATEGORIES = [
  'iPhone',
  'iPad',
  'Mac',
  'Watch',
  'AirPods',
  'Accessories',
  'Other',
] as const;

interface Specification {
  key: string;
  value: string;
}

interface ProductFormProps {
  isEditing?: boolean;
  loading?: boolean;
  initialData?: Partial<ProductFormValues>;
  onSubmit?: (data: ProductFormValues) => Promise<void>;
  onSuccess?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  isEditing = false,
  loading = false,
  initialData,
  onSubmit,
  onSuccess,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // State for form data
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [specs, setSpecs] = useState<Specification[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch product data if in edit mode
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => (id ? getProductById(id) : null),
    enabled: isEditing && !!id,
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      isActive: true,
      specifications: {},
      images: [],
      ...initialData,
    },
  });

  // Set form values when product data is loaded
  useEffect(() => {
    if (product) {
      // Convert product specifications to array for the form
      const specEntries: Specification[] = product.specifications
        ? Object.entries(product.specifications).map(([key, value]) => ({
            key,
            value: String(value),
          }))
        : [];

      setSpecs(specEntries.length > 0 ? specEntries : [{ key: '', value: '' }]);
      setImagePreviews(product.images || []);

      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand || '',
        sku: product.sku || '',
        stock: product.stock,
        isActive: product.isActive,
        specifications: product.specifications || {},
        images: product.images || [],
      });
    } else if (initialData) {
      // Handle initial data if provided
      form.reset({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        isActive: true,
        specifications: {},
        images: [],
        ...initialData,
      });
    }
  }, [product, form, initialData]);

  // Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);

    // Create preview URLs for new files only
    const newImagePreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newImagePreviews]);

    // Clear the file input to allow re-uploading the same file
    e.target.value = '';
  };

  // Remove an image
  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new specification field
  const addSpecification = () => {
    setSpecs((prev) => [...prev, { key: '', value: '' }]);
  };

  // Update a specification field
  const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
    setSpecs((prev) =>
      prev.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec))
    );
  };

  // Remove a specification field
  const removeSpecification = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (formData: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      // Convert specs array to object
      const specifications = specs.reduce<Record<string, string>>((acc, spec) => {
        if (spec.key.trim()) {
          acc[spec.key] = spec.value;
        }
        return acc;
      }, {});

      // Prepare product data with required fields
      const productData: ProductWithoutId = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        stock: formData.stock,
        isActive: formData.isActive,
        specifications,
        brand: formData.brand || '',
        sku: formData.sku || '',
        images: [...(formData.images || []), ...imagePreviews].filter(Boolean) as string[],
      };

      if (onSubmit) {
        // If onSubmit prop is provided, use that
        await onSubmit(productData);
      } else if (isEditing && id) {
        // Otherwise use the default implementation
        await updateProduct(id, {
          ...productData,
          imageFiles: imageFiles.length > 0 ? imageFiles : undefined,
        });
        toast.success('Product updated successfully');
        queryClient.invalidateQueries({ queryKey: ['products'] });
        if (onSuccess) onSuccess();
      } else {
        await createProduct({
          ...productData,
          imageFiles,
        });
        toast.success('Product created successfully');
        queryClient.invalidateQueries({ queryKey: ['products'] });
        if (onSuccess) onSuccess();
        else navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(
        error instanceof Error ? error.message : 'An error occurred while saving the product'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of the product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  {...form.register('name')}
                  disabled={loading || isSubmitting}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  rows={4}
                  {...form.register('description')}
                  disabled={loading || isSubmitting}
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (GHS) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...form.register('price', { valueAsNumber: true })}
                    disabled={loading || isSubmitting}
                  />
                  {form.formState.errors.price && (
                    <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    {...form.register('stock', { valueAsNumber: true })}
                    disabled={loading || isSubmitting}
                  />
                  {form.formState.errors.stock && (
                    <p className="text-sm text-red-500">{form.formState.errors.stock.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Upload images of your product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="object-cover w-24 h-24 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 focus:opacity-100"
                      disabled={loading || isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <label
                  className={`flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-md cursor-pointer ${
                    loading || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-6 h-6 mb-1 text-gray-400" />
                  <span className="text-sm text-gray-500">Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={loading || isSubmitting}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Provide additional details about the product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  onValueChange={(value) => form.setValue('category', value)}
                  value={form.watch('category')}
                  disabled={loading || isSubmitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRODUCT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="e.g., Apple"
                    {...form.register('brand')}
                    disabled={loading || isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="e.g., APL-IPH13-128"
                    {...form.register('sku')}
                    disabled={loading || isSubmitting}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  <Label htmlFor="isActive">Product Status</Label>
                  <p className="text-sm text-muted-foreground">
                    {form.watch('isActive') ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={form.watch('isActive')}
                  onCheckedChange={(checked) => form.setValue('isActive', checked)}
                  disabled={loading || isSubmitting}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Specifications</CardTitle>
                  <CardDescription>Add product specifications and features.</CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSpecification}
                  disabled={loading || isSubmitting}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Spec
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {specs.map((spec, index) => (
                <div key={index} className="grid grid-cols-12 gap-2">
                  <div className="col-span-5">
                    <Input
                      placeholder="Specification name"
                      value={spec.key}
                      onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                      disabled={loading || isSubmitting}
                    />
                  </div>
                  <div className="col-span-6">
                    <Input
                      placeholder="Value"
                      value={spec.value}
                      onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                      disabled={loading || isSubmitting}
                    />
                  </div>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSpecification(index)}
                      disabled={loading || isSubmitting}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              {specs.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No specifications added yet. Click "Add Spec" to get started.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/products')}
          disabled={loading || isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading || isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isEditing ? 'Updating...' : 'Creating...'}
            </>
          ) : isEditing ? (
            'Update Product'
          ) : (
            'Create Product'
          )}
        </Button>
      </div>
    </form>
  );
};
