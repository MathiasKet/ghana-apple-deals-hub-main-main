import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ProductForm, type ProductFormValues } from '@/components/forms/ProductForm';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getProductById, updateProduct } from '@/services/productService';
import { Loader2 } from 'lucide-react';
import type { ProductWithoutId } from '@/types/product';

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch the product data
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!), // We know id exists because of the route
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductFormValues }) => {
      // Convert form data to ProductWithoutId type
      const productData: ProductWithoutId = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
        isActive: data.isActive,
        specifications: data.specifications || {},
        brand: data.brand || '',
        sku: data.sku || '',
        images: data.images || [],
      };
      
      return updateProduct(id, {
        ...productData,
        imageFiles: [], // Will be populated by the form
      });
    },
    onSuccess: () => {
      toast.success('Product updated successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate('/admin/products');
    },
    onError: (error: Error) => {
      toast.error(`Error updating product: ${error.message}`);
    },
  });

  const handleSubmit = async (formData: ProductFormValues) => {
    if (!id) return;
    
    try {
      await updateProductMutation.mutateAsync({
        id,
        data: formData,
      });
    } catch (error) {
      // Error is handled by the mutation
      console.error('Error in handleSubmit:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-md">
        Error loading product: {error.message}
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        isEditing
        initialData={product}
        onSubmit={handleSubmit}
        loading={updateProductMutation.isPending}
      />
    </div>
  );
};
