
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { CreditCard, Banknote, DollarSign, Wallet } from 'lucide-react';
import { 
  MobileMoneyIcon, 
  BankTransferIcon, 
  VisaIcon, 
  MastercardIcon 
} from '@/components/ui/icons';
import logo from '../assets/logo-apple-deals-ghana.png';

const Footer = () => {
  return (
    <footer className="bg-apple-gray pt-12 pb-6">
      <div className="container-custom">
        {/* Payment Methods Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-semibold mb-4">We Accept</h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                {/* Official Visa SVG */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#1A1F71" />
                  <g>
                    <path d="M13.5 31L17.1 17H20.1L16.5 31H13.5Z" fill="white"/>
                    <path d="M21.1 17H24.1L25.7 28.2L28.1 17H31.1L27.1 31H24.1L21.1 17Z" fill="white"/>
                    <path d="M32.5 17H35.5L34.1 31H31.1L32.5 17Z" fill="white"/>
                  </g>
                </svg>
              </div>
              <span className="text-xs font-medium mt-1">Visa</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                {/* Official Mastercard SVG */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#fff" />
                  <circle cx="20" cy="24" r="10" fill="#EB001B" />
                  <circle cx="28" cy="24" r="10" fill="#F79E1B" />
                  <circle cx="24" cy="24" r="10" fill="#FF5F00" fillOpacity=".7" />
                </svg>
              </div>
              <span className="text-xs font-medium mt-1">Mastercard</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                {/* Generic Mobile Money SVG */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#FFCC00" />
                  <rect x="12" y="16" width="24" height="16" rx="4" fill="#fff" />
                  <rect x="18" y="20" width="12" height="8" rx="2" fill="#000" />
                  <circle cx="36" cy="20" r="2" fill="#000" />
                  <rect x="22" y="28" width="4" height="4" rx="1" fill="#00A859" />
                </svg>
              </div>
              <span className="text-xs font-medium mt-1">Mobile Money</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                {/* Bank Transfer SVG */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="8" fill="#1A365D" />
                  <rect x="12" y="20" width="24" height="12" rx="2" fill="#fff" />
                  <rect x="18" y="26" width="12" height="4" rx="1" fill="#1A365D" />
                  <circle cx="24" cy="24" r="2" fill="#1A365D" />
                  <rect x="20" y="16" width="8" height="4" rx="1" fill="#1A365D" />
                </svg>
              </div>
              <span className="text-xs font-medium mt-1">Bank Transfer</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop and Learn</h3>
            <ul className="space-y-2">
              <li><Link to="/iphone" className="text-apple-darkgray hover:text-apple-black transition-colors">iPhone</Link></li>
              <li><Link to="/ipad" className="text-apple-darkgray hover:text-apple-black transition-colors">iPad</Link></li>
              <li><Link to="/mac" className="text-apple-darkgray hover:text-apple-black transition-colors">Mac</Link></li>
              <li><Link to="/watch" className="text-apple-darkgray hover:text-apple-black transition-colors">Apple Watch</Link></li>
              <li><Link to="/accessories" className="text-apple-darkgray hover:text-apple-black transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/apple-care" className="text-apple-darkgray hover:text-apple-black transition-colors">Apple Care</Link></li>
              <li><Link to="/repairs" className="text-apple-darkgray hover:text-apple-black transition-colors">Repairs & Service</Link></li>
              <li><Link to="/financing" className="text-apple-darkgray hover:text-apple-black transition-colors">Financing</Link></li>
              <li><Link to="/trade-in" className="text-apple-darkgray hover:text-apple-black transition-colors">Trade-In Program</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Apple Deals Ghana</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-apple-darkgray hover:text-apple-black transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-apple-darkgray hover:text-apple-black transition-colors">Contact Us</Link></li>
              <li><Link to="/careers" className="text-apple-darkgray hover:text-apple-black transition-colors">Careers</Link></li>
              <li><Link to="/locations" className="text-apple-darkgray hover:text-apple-black transition-colors">Store Locations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-apple-darkgray">
              <li>Accra Mall, 71 Salem Ave</li>
              <li>Accra, Ghana</li>
              <li>Phone: +233 30 123 4567</li>
              <li>Email: info@appledealsgha.com</li>
            </ul>
            
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" aria-label="Facebook" className="text-apple-darkgray hover:text-apple-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-apple-darkgray hover:text-apple-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-apple-darkgray hover:text-apple-black transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={logo}
              alt="Apple Deals Ghana Logo"
              className="h-8 w-auto mr-2"
              style={{ maxHeight: '32px' }}
            />
            <span className="text-sm text-apple-darkgray">&copy; {new Date().getFullYear()} Apple Deals Ghana. All rights reserved.</span>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link to="/privacy" className="text-apple-darkgray hover:text-apple-black transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-apple-darkgray hover:text-apple-black transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-apple-darkgray hover:text-apple-black transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
        
        <div className="text-xs text-apple-darkgray text-center mt-8">
          Apple Deals Ghana is an independent reseller and is not affiliated with Apple Inc.
          Apple, the Apple logo, iPhone, iPad, Mac, Apple Watch, and AirPods are trademarks of Apple Inc., registered in the U.S. and other countries.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
