
import React from 'react';

const AnimatedBanner = () => {
  return (
    <section className="bg-apple-blue text-white py-6 overflow-hidden relative">
      <div 
        className="flex whitespace-nowrap"
        style={{
          animation: 'marquee 20s linear infinite',
          width: 'fit-content'
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center mx-4">
            <span className="mx-4 font-medium">Free delivery on orders over ₵500</span>
            <span className="mx-4 font-medium">•</span>
            <span className="mx-4 font-medium">Authentic Apple products</span>
            <span className="mx-4 font-medium">•</span>
            <span className="mx-4 font-medium">Apple authorized reseller</span>
            <span className="mx-4 font-medium">•</span>
            <span className="mx-4 font-medium">Official warranty</span>
            <span className="mx-4 font-medium">•</span>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `
      }} />
    </section>
  );
};

export default AnimatedBanner;
