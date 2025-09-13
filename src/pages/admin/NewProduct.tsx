import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ProductForm, type ProductFormValues } from '@/components/forms/ProductForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { createProduct } from '@/services/productService';
import type { ProductWithoutId } from '@/types/product';

export const NewProduct = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: (formData: ProductFormValues) => {
      // Convert form data to ProductWithoutId type
      const productData: ProductWithoutId = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        stock: formData.stock,
        isActive: formData.isActive,
        specifications: formData.specifications || {},
        brand: formData.brand || '',
        sku: formData.sku || '',
        images: formData.images || [],
      };
      
      return createProduct({
        ...productData,
        imageFiles: [], // Will be populated by the form
      });
    },
    onSuccess: () => {
      toast.success('Product created successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      navigate('/admin/products');
    },
    onError: (error: Error) => {
      toast.error(`Error creating product: ${error.message}`);
    },
  });

  const handleSubmit = async (formData: ProductFormValues) => {
    try {
      await createProductMutation.mutateAsync(formData);
    } catch (error) {
      // Error is handled by the mutation
      console.error('Error in handleSubmit:', error);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">
            Fill in the details below to add a new product to your store
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Enter the product information and upload images
          </CardDescription>
        </CardHeader>
        <ProductForm 
          isEditing={false} 
          loading={createProductMutation.isPending}
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
};
