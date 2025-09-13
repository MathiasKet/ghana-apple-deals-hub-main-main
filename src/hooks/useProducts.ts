import { useState, useCallback, useEffect } from 'react';
import { Product, ProductFilter } from '../types/product';
import * as productService from '../services/productService';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  currentPage: number;
  loadProducts: (filters?: ProductFilter) => Promise<void>;
  loadMore: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

export function useProducts(initialFilters: ProductFilter = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<ProductFilter>(initialFilters);

  const loadProducts = useCallback(async (filters?: ProductFilter) => {
    try {
      setLoading(true);
      setError(null);
      const newFilters = filters || currentFilters;
      setCurrentFilters(newFilters);
      setCurrentPage(1);

      const result = await productService.getProducts(newFilters, 1);
      setProducts(result.products);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load products'));
    } finally {
      setLoading(false);
    }
  }, [currentFilters]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      setError(null);
      const nextPage = currentPage + 1;
      const result = await productService.getProducts(currentFilters, nextPage);
      
      setProducts(prev => [...prev, ...result.products]);
      setHasMore(result.hasMore);
      setCurrentPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more products'));
    } finally {
      setLoading(false);
    }
  }, [currentPage, hasMore, loading, currentFilters]);

  const refreshProducts = useCallback(() => {
    return loadProducts(currentFilters);
  }, [loadProducts, currentFilters]);

  // Load initial data on mount
  useEffect(() => {
    loadProducts(initialFilters);
  }, [initialFilters, loadProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    currentPage,
    loadProducts,
    loadMore,
    refreshProducts
  };
}