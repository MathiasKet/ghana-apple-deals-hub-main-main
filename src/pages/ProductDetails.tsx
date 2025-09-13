import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  specs: {
    [key: string]: string;
  };
  stock: number;
  category: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    // TODO: Fetch product details from API
    // For now using mock data
    const mockProduct: Product = {
      id: '1',
      name: 'iPhone 15 Pro',
      price: 999.99,
      description: 'The most advanced iPhone ever with revolutionary features.',
      images: [
        '/images/iphone-15-pro-1.jpg',
        '/images/iphone-15-pro-2.jpg',
      ],
      specs: {
        'Display': '6.1-inch Super Retina XDR',
        'Chip': 'A17 Pro chip',
        'Camera': '48MP Main | 12MP Ultra Wide',
        'Storage': '256GB'
      },
      stock: 10,
      category: 'Phones'
    };

    setProduct(mockProduct);
    setSelectedImage(mockProduct.images[0]);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
      // Reset quantity after adding to cart
      setQuantity(1);
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === image ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" 
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
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600">₵{product.price.toLocaleString()}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="font-medium">Quantity:</label>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 border-r hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="w-16 text-center"
                min="1"
                max={product.stock}
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 border-l hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>

          {/* Specifications */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;