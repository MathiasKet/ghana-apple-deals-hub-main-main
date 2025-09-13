import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductList } from './ProductList';
import { useProductContext } from '../../contexts/ProductContext';

// Mock the ProductContext
vi.mock('../../contexts/ProductContext', () => ({
  useProductContext: vi.fn()
}));

describe('ProductList', () => {
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
    },
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

  const mockContext = {
    products: mockProducts,
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 1,
    loadProducts: vi.fn(),
    loadMore: vi.fn(),
    refreshProducts: vi.fn()
  };

  beforeEach(() => {
    vi.mocked(useProductContext).mockReturnValue(mockContext);
  });

  it('should render product list', () => {
    render(<ProductList />);

    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('iPhone 14')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
    expect(screen.getByText('$1,099')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    vi.mocked(useProductContext).mockReturnValue({
      ...mockContext,
      loading: true
    });

    render(<ProductList />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should show error state', () => {
    const error = new Error('Failed to load products');
    vi.mocked(useProductContext).mockReturnValue({
      ...mockContext,
      error
    });

    render(<ProductList />);

    expect(screen.getByText('Failed to load products')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('should load more products when clicking load more button', async () => {
    render(<ProductList />);

    const loadMoreButton = screen.getByText('Load More');
    fireEvent.click(loadMoreButton);

    expect(mockContext.loadMore).toHaveBeenCalled();
  });

  it('should not show load more button when hasMore is false', () => {
    vi.mocked(useProductContext).mockReturnValue({
      ...mockContext,
      hasMore: false
    });

    render(<ProductList />);

    expect(screen.queryByText('Load More')).not.toBeInTheDocument();
  });

  it('should filter products by category', async () => {
    render(<ProductList />);

    const filterSelect = screen.getByLabelText('Category');
    fireEvent.change(filterSelect, { target: { value: 'Phones' } });

    await waitFor(() => {
      expect(mockContext.loadProducts).toHaveBeenCalledWith({
        category: 'Phones'
      });
    });
  });

  it('should filter products by price range', async () => {
    render(<ProductList />);

    const minPriceInput = screen.getByLabelText('Min Price');
    const maxPriceInput = screen.getByLabelText('Max Price');

    fireEvent.change(minPriceInput, { target: { value: '500' } });
    fireEvent.change(maxPriceInput, { target: { value: '1500' } });

    await waitFor(() => {
      expect(mockContext.loadProducts).toHaveBeenCalledWith({
        minPrice: 500,
        maxPrice: 1500
      });
    });
  });
}); 