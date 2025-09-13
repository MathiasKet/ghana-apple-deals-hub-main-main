import { createContext, useContext, ReactNode } from 'react';
import { Product, ProductFilter } from '../types/product';
import { useProducts } from '../hooks/useProducts';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  currentPage: number;
  loadProducts: (filters?: ProductFilter) => Promise<void>;
  loadMore: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
  initialFilters?: ProductFilter;
}

export const ProductProvider = ({ children, initialFilters }: ProductProviderProps) => {
  const {
    products,
    loading,
    error,
    hasMore,
    currentPage,
    loadProducts,
    loadMore,
    refreshProducts
  } = useProducts(initialFilters);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        hasMore,
        currentPage,
        loadProducts,
        loadMore,
        refreshProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}; 