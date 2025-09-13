
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'iphone',
    name: 'iPhone',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-iphone-15-pro-202309?wid=400&hei=500&fmt=p-jpg&qlt=95&.v=1692910040844',
    link: '/iphone'
  },
  {
    id: 'ipad',
    name: 'iPad',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-ipad-pro-202210?wid=400&hei=500&fmt=p-jpg&qlt=95&.v=1664912197553',
    link: '/ipad'
  },
  {
    id: 'mac',
    name: 'Mac',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-macbook-air-15-202306?wid=400&hei=500&fmt=p-jpg&qlt=95&.v=1683847992191',
    link: '/mac'
  },
  {
    id: 'watch',
    name: 'Apple Watch',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-watch-ultra-202309?wid=400&hei=500&fmt=p-jpg&qlt=95&.v=1693711765605',
    link: '/watch'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-accessories-202309?wid=400&hei=500&fmt=p-jpg&qlt=95&.v=1692803114952',
    link: '/accessories'
  },
  {
    id: 'services',
    name: 'Services',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-40-subscriptions-202108?wid=400&hei=500&fmt=p-jpg&qlt=95&.v=1626375547000',
    link: '/services'
  },
];

const CategorySection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-semibold mb-8 text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link to={category.link} key={category.id} className="category-card">
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-medium text-apple-black">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
