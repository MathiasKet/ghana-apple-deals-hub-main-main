import React from 'react';
import AnimatedBanner from '../components/AnimatedBanner';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import TrustSection from '../components/TrustSection';
import NewsletterSection from '../components/NewsletterSection';

const Index = () => {
  return (
    <>
      <AnimatedBanner />
      <main className="flex-grow">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <TrustSection />
        <NewsletterSection />
      </main>
    </>
  );
};

export default Index;
