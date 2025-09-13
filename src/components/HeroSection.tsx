
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import iphone16 from '../assets/iphone_16-removebg-preview.png';

const HeroSection = () => {
  return (
    <div className="relative bg-apple-gray overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center py-12 md:py-20">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-apple-blue">Coming Soon</h2>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-apple-black">
                iPhone 16 Pro
              </h1>
              <p className="text-xl text-apple-darkgray mt-4">
                Experience the future of iPhone. Groundbreaking AI. Revolutionary camera system.
              </p>
            </div>
            <div className="text-2xl font-medium text-apple-black">
              Starting at ₵8,999.00
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="apple-button">
                Pre-order Now
              </Button>
              <Button className="apple-button-secondary">
                Get Notified
              </Button>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 mt-4 inline-block">
              <p className="text-apple-black flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                <span className="font-medium">Authentic Apple products</span>
              </p>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 animate-fade-in">
            <img 
              src={iphone16} 
              alt="iPhone 16 Pro" 
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
