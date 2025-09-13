export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  specifications: {
    [key: string]: string;
  };
  stock: number;
  sku?: string;
  brand?: string;
  isActive?: boolean;
  featured?: boolean;
  discountPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Base product type without the id field (for creation)
export type ProductWithoutId = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

// Type for product updates (all fields optional except id)
export type ProductUpdate = Partial<ProductWithoutId> & { id: string };

export interface ProductFilter {
  // Filtering
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  search?: string; // Alias for searchQuery for consistency
  inStock?: boolean;
  
  // Sorting
  sortBy?: keyof Product;
  sortOrder?: 'asc' | 'desc';
  
  // Pagination
  page?: number;
  limit?: number;
}