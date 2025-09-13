import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../contexts/ProductContext';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProductContext();
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    });
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="aspect-w-1 aspect-h-1 mb-4">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-w-1 aspect-h-1 ${
                  selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <p className="text-3xl font-bold text-blue-600">
              ${product.price.toLocaleString()}
            </p>
            {product.discountPercentage && (
              <p className="text-sm text-green-600">
                {product.discountPercentage}% OFF
              </p>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Specifications</h2>
            <dl className="grid grid-cols-1 gap-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex">
                  <dt className="font-medium text-gray-600 w-1/3">{key}:</dt>
                  <dd className="text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mb-6">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded-md"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border rounded-md"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="px-3 py-1 border rounded-md"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={toggleWishlist}
              className={`px-6 py-3 border rounded-lg ${
                isInWishlist(product.id)
                  ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {isInWishlist(product.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}