import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import macbookImage from '../assets/macbook.jpg';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'price-asc',
  });

  // Mock categories
  const categories = ['all', 'iPhone', 'iPad', 'MacBook', 'Apple Watch', 'AirPods'];

  useEffect(() => {
    // TODO: Fetch products from API
    // Mock data for now
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        price: 999.99,
        description: 'The most advanced iPhone ever.',
        image: macbookImage,
        category: 'iPhone',
      },
      {
        id: '2',
        name: 'MacBook Air M2',
        price: 1199.99,
        description: 'Incredibly thin and light.',
        image: macbookImage,
        category: 'MacBook',
      },
      // Add more mock products...
    ];

    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 border rounded-lg"
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="p-2 border rounded-lg"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterOptions['sortBy'] }))}
            className="p-2 border rounded-lg"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label>Min Price:</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
              className="w-24 p-2 border rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Max Price:</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-24 p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <p className="text-blue-600 font-semibold">₵{product.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Products; 