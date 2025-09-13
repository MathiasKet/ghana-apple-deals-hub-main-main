
import React from 'react';
import { Shield, Truck, RotateCcw, Headphones } from 'lucide-react';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Authentic Products',
    description: '100% genuine Apple products with full warranty.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over ₵500 in Ghana.'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '14-day hassle-free return policy.'
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Dedicated customer service for all your queries.'
  }
];

const TrustSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-semibold mb-4 text-center">Why Choose Apple Deals Ghana</h2>
        <p className="text-apple-darkgray text-center max-w-2xl mx-auto mb-12">
          Your trusted destination for authentic Apple products in Ghana, offering competitive prices and exceptional service.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="bg-apple-gray rounded-xl p-6 text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white rounded-full mb-4">
                <feature.icon size={24} className="text-apple-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-apple-darkgray text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
