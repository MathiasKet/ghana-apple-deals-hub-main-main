
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const featuredProducts = [
  {
    id: 1,
    name: 'iPhone 15',
    description: 'A magical new way to experience iPhone.',
    price: 5999,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1692992937164',
    link: '/product/iphone-15'
  },
  {
    id: 2,
    name: 'MacBook Air',
    description: 'Supercharged by M2 chip.',
    price: 7499,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665',
    link: '/product/macbook-air'
  },
  {
    id: 3,
    name: 'Apple Watch Series 9',
    description: 'Smarter. Brighter. Mightier.',
    price: 3299,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-card-40-s9-202309?wid=680&hei=528&fmt=p-jpg&qlt=95&.v=1693868243008',
    link: '/product/apple-watch-series-9'
  },
  {
    id: 4,
    name: 'AirPods Pro',
    description: 'Adaptive Audio. Now playing.',
    price: 1499,
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361',
    link: '/product/airpods-pro'
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
  }).format(price);
};

const FeaturedProducts = () => {
  return (
    <section className="section-padding bg-apple-gray">
      <div className="container-custom">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card group">
              <Link to={product.link} className="block">
                <div className="aspect-square bg-white overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg text-apple-black">{product.name}</h3>
                  <p className="text-apple-darkgray text-sm mt-1">{product.description}</p>
                  <div className="mt-2 font-medium">{formatPrice(product.price)}</div>
                </div>
              </Link>
              <div className="p-4 pt-0 mt-auto">
                <Button className="w-full apple-button">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/products">
            <Button className="apple-button-secondary">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
