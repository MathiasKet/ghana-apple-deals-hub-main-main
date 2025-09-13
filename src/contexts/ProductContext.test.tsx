import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ProductProvider, useProductContext } from './ProductContext';

// Mock the useProducts hook
const mockUseProducts = vi.fn();
vi.mock('../hooks/useProducts', () => ({
  useProducts: () => mockUseProducts()
}));

describe('ProductContext', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'iPhone 13',
      description: 'Latest iPhone model',
      price: 999,
      category: 'Phones',
      images: ['image1.jpg'],
      specs: { storage: '128GB' },
      stock: 10
    }
  ];

  const mockProductsState = {
    products: mockProducts,
    loading: false,
    error: null,
    hasMore: false,
    currentPage: 1,
    loadProducts: vi.fn(),
    loadMore: vi.fn(),
    refreshProducts: vi.fn()
  };

  beforeEach(() => {
    mockUseProducts.mockReturnValue(mockProductsState);
  });

  it('should provide product context values', () => {
    const { result } = renderHook(() => useProductContext(), {
      wrapper: ProductProvider
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(false);
    expect(result.current.currentPage).toBe(1);
  });

  it('should call loadProducts with filters', async () => {
    const filters = { category: 'Phones' };
    const { result } = renderHook(() => useProductContext(), {
      wrapper: ({ children }) => (
        <ProductProvider initialFilters={filters}>{children}</ProductProvider>
      )
    });

    await act(async () => {
      await result.current.loadProducts(filters);
    });

    expect(mockProductsState.loadProducts).toHaveBeenCalledWith(filters);
  });

  it('should call loadMore', async () => {
    const { result } = renderHook(() => useProductContext(), {
      wrapper: ProductProvider
    });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(mockProductsState.loadMore).toHaveBeenCalled();
  });

  it('should call refreshProducts', async () => {
    const { result } = renderHook(() => useProductContext(), {
      wrapper: ProductProvider
    });

    await act(async () => {
      await result.current.refreshProducts();
    });

    expect(mockProductsState.refreshProducts).toHaveBeenCalled();
  });

  it('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useProductContext());
    }).toThrow('useProductContext must be used within a ProductProvider');
  });
}); 