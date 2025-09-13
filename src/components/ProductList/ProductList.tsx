import { useState, useEffect } from 'react';
import { useProductContext } from '../../contexts/ProductContext';
import { ProductFilter } from '../../types/product';

export function ProductList() {
  const {
    products,
    loading,
    error,
    hasMore,
    loadProducts,
    loadMore,
    refreshProducts
  } = useProductContext();

  const [filters, setFilters] = useState<ProductFilter>({});

  useEffect(() => {
    loadProducts(filters);
  }, [loadProducts, filters]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: category || undefined
    }));
  };

  const handlePriceChange = (min?: number, max?: number) => {
    setFilters(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max
    }));
  };

  if (loading && !products.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <div data-testid="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={() => refreshProducts()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={filters.category || ''}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Phones">Phones</option>
            <option value="Tablets">Tablets</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={filters.minPrice || ''}
            onChange={(e) => handlePriceChange(Number(e.target.value) || undefined, filters.maxPrice)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={filters.maxPrice || ''}
            onChange={(e) => handlePriceChange(filters.minPrice, Number(e.target.value) || undefined)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-xl font-bold text-blue-600">
                ${product.price.toLocaleString()}
              </p>
              {product.stock > 0 ? (
                <p className="text-green-600 text-sm">In Stock: {product.stock}</p>
              ) : (
                <p className="text-red-600 text-sm">Out of Stock</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => loadMore()}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
} 