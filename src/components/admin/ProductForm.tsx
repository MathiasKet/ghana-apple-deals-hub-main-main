import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Product, ProductWithoutId } from '../../types/product';
import { cn } from '../../lib/utils';
import { X, Upload, Loader2 } from 'lucide-react';

// Base schema for product form data
const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().min(0, 'Stock must be a positive number'),
  featured: z.boolean().default(false),
  discountPercentage: z.number().min(0).max(100).default(0),
});

type ProductFormData = z.infer<typeof productFormSchema> & {
  images: string[];
  specs: Record<string, string | number>;
  imageFiles?: File[];
};

export interface ProductFormProps {
  product?: Product;
  loading?: boolean;
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export const ProductForm = ({ product, onSubmit, loading = false }: ProductFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || '',
      stock: product?.stock || 0,
      featured: product?.featured || false,
      discountPercentage: product?.discountPercentage || 0,
    },
  });
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images || []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [specs, setSpecs] = useState<Record<string, string | number>>(
    product?.specs || {}
  );
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...filesArray]);
      
      // Create preview URLs
      const fileUrls = filesArray.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...fileUrls]);
    }
  };
  
  // Remove an image
  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
    if (index < imageFiles.length) {
      setImageFiles(prev => prev.filter((_, i) => i !== index));
    }
  };
  
  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      imageUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  useEffect(() => {
    if (product?.images) {
      setImageUrls(product.images);
    }
  }, [product]);

  const handleImageUrlChange = (index: number, value: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeImageField = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls.length ? newImageUrls : ['']);
  };

  const handleSpecChange = (key: string, value: string) => {
    setSpecs(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const addSpecField = () => {
    const newKey = `spec_${Object.keys(specs).length}`;
    setSpecs(prev => ({
      ...prev,
      [newKey]: '',
    }));
  };

  const removeSpecField = (key: string) => {
    const newSpecs = { ...specs };
    delete newSpecs[key];
    setSpecs(newSpecs);
  };

  const onSubmitForm = async (formData: z.infer<typeof productFormSchema>) => {
    try {
      setIsUploading(true);
      // Create the complete product data
      const productData: ProductFormData = {
        ...formData,
        images: imageUrls,
        specs,
      };
      
      // Add imageFiles if any
      if (imageFiles.length > 0) {
        productData.imageFiles = imageFiles;
      }
      
      await onSubmitProp(productData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="Enter product name"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              {...register('description')}
              className={errors.description ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price (GHS)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register('price', { valueAsNumber: true })}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                {...register('stock', { valueAsNumber: true })}
                className={errors.stock ? 'border-red-500' : ''}
              />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="discountPercentage">Discount (%)</Label>
              <Input
                id="discountPercentage"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                {...register('discountPercentage', { valueAsNumber: true })}
                className={errors.discountPercentage ? 'border-red-500' : ''}
              />
              {errors.discountPercentage && (
                <p className="text-sm text-red-500">
                  {errors.discountPercentage.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g. Electronics"
                {...register('category')}
                className={errors.category ? 'border-red-500' : ''}
              />
              {errors.category && (
                <p className="text-sm text-red-500">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex items-end gap-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  {...register('featured')}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="space-y-2">
              <Label htmlFor="images">Product Images</Label>
              <div className="space-y-4">
                {/* Image preview grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                        <img
                          src={url}
                          alt={`Product preview ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {/* File upload button */}
                  <div className="aspect-square">
                    <input
                      id="product-images"
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                    />
                    <label
                      htmlFor="product-images"
                      className={cn(
                        "h-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer",
                        isUploading && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isUploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      ) : (
                        <>
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500 text-center px-2">
                            Upload images
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                
                {/* Help text */}
                <p className="text-xs text-gray-500">
                  Upload high-quality product images. First image will be used as the main image.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <Label>Specifications</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSpecField}
                >
                  Add Specification
                </Button>
              </div>
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-5">
                    <Input
                      value={key}
                      onChange={(e) => {
                        const newSpecs = { ...specs };
                        delete newSpecs[key];
                        newSpecs[e.target.value] = value;
                        setSpecs(newSpecs);
                      }}
                      placeholder="Specification name"
                    />
                  </div>
                  <div className="col-span-5">
                    <Input
                      value={value as string}
                      onChange={(e) => handleSpecChange(key, e.target.value)}
                      placeholder="Value"
                    />
                  </div>
                  <div className="col-span-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSpecField(key)}
                    >
                      <span className="text-red-500">×</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || isUploading}
              >
                {loading || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? 'Uploading...' : 'Saving...'}
                  </>
                ) : (
                  'Save Product'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
