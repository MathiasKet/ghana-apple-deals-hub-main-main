import { Product, ProductFilter, ProductWithoutId } from '../types/product';
import { apiRequest, uploadFiles } from './api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

interface GetProductsOptions extends Omit<ProductFilter, 'sortBy'> {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const getProducts = async (
  options: GetProductsOptions = {}
): Promise<{ products: Product[]; total: number }> => {
  const {
    search = '',
    category,
    minPrice,
    maxPrice,
    inStock,
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    limit = 12,
  } = options;

  // Build query parameters
  const params = new URLSearchParams({
    search,
    ...(category && { category }),
    ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
    ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
    ...(inStock !== undefined && { inStock: inStock.toString() }),
    sortBy,
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
  });

  return apiRequest<{ products: Product[]; total: number }>(`/products?${params.toString()}`);
};

export const getProductById = async (id: string): Promise<Product> => {
  return apiRequest<Product>(`/products/${id}`);
};

export const createProduct = async (
  productData: ProductWithoutId & { imageFiles?: File[] }
): Promise<Product> => {
  const { imageFiles = [], ...data } = productData;
  
  // Upload images if any
  let imageUrls: string[] = [];
  if (imageFiles.length > 0) {
    imageUrls = await uploadFiles(imageFiles);
  }

  // Combine existing images with new ones
  const productToCreate = {
    ...data,
    images: [...(data.images || []), ...imageUrls],
  };

  return apiRequest<Product>('/products', 'POST', productToCreate);
};

export const updateProduct = async (
  id: string,
  productData: Partial<Product> & { imageFiles?: File[] }
): Promise<Product> => {
  const { imageFiles = [], ...data } = productData;
  
  // Upload new images if any
  let imageUrls: string[] = [];
  if (imageFiles.length > 0) {
    imageUrls = await uploadFiles(imageFiles);
  }

  // Combine existing images with new ones
  const productToUpdate = {
    ...data,
    ...(imageUrls.length > 0 && {
      images: [...(data.images || []), ...imageUrls],
    }),
  };

  return apiRequest<Product>(`/products/${id}`, 'PUT', productToUpdate);
};

export const deleteProduct = async (id: string): Promise<void> => {
  await apiRequest(`/products/${id}`, 'DELETE');
};

// For development/testing purposes only
declare global {
  interface Window {
    seedProducts?: (products: ProductWithoutId[]) => Promise<void>;
  }
}

// Expose seed function for development/testing
if (import.meta.env.DEV) {
  window.seedProducts = async (initialProducts: ProductWithoutId[]) => {
    try {
      await Promise.all(
        initialProducts.map(product => 
          createProduct(product).catch(console.error)
        )
      );
      console.log('Successfully seeded products');
    } catch (error) {
      console.error('Error seeding products:', error);
    }
  };
}