import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProducts } from './useProducts';
import * as productService from '../services/productService';

vi.mock('../services/productService', () => ({
  getProducts: vi.fn()
}));

describe('useProducts', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load products successfully', async () => {
    vi.mocked(productService.getProducts).mockResolvedValue({
      products: mockProducts,
      hasMore: false
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual([]);

    await act(async () => {
      await result.current.loadProducts();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(false);
  });

  it('should handle errors when loading products', async () => {
    const error = new Error('Failed to load products');
    vi.mocked(productService.getProducts).mockRejectedValue(error);

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.loadProducts();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(error);
    expect(result.current.products).toEqual([]);
  });

  it('should load more products successfully', async () => {
    const moreProducts = [
      {
        id: '2',
        name: 'iPhone 14',
        description: 'Latest iPhone model',
        price: 1099,
        category: 'Phones',
        images: ['image2.jpg'],
        specs: { storage: '256GB' },
        stock: 5
      }
    ];

    vi.mocked(productService.getProducts)
      .mockResolvedValueOnce({ products: mockProducts, hasMore: true })
      .mockResolvedValueOnce({ products: moreProducts, hasMore: false });

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.loadProducts();
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.hasMore).toBe(true);

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.products).toEqual([...mockProducts, ...moreProducts]);
    expect(result.current.hasMore).toBe(false);
  });

  it('should apply filters when loading products', async () => {
    const filters = { category: 'Phones', minPrice: 500 };

    vi.mocked(productService.getProducts).mockResolvedValue({
      products: mockProducts,
      hasMore: false
    });

    const { result } = renderHook(() => useProducts(filters));

    await act(async () => {
      await result.current.loadProducts();
    });

    expect(productService.getProducts).toHaveBeenCalledWith(filters, 1);
    expect(result.current.products).toEqual(mockProducts);
  });

  it('should refresh products with current filters', async () => {
    vi.mocked(productService.getProducts).mockResolvedValue({
      products: mockProducts,
      hasMore: false
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.refreshProducts();
    });

    expect(productService.getProducts).toHaveBeenCalledTimes(1);
    expect(result.current.products).toEqual(mockProducts);
  });
}); 