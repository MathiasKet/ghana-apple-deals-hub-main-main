import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import logo from '../assets/logo-apple-deals-ghana.png';


const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(() => {
    const hasSeenAnnouncement = localStorage.getItem('hasSeenAnnouncement');
    return !hasSeenAnnouncement;
  });

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenAnnouncement', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-apple-black text-white py-1 px-3">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell size={14} />
            <p className="text-xs font-medium">Free shipping on all orders over ₵500!</p>
          </div>
          <button 
            onClick={handleClose} 
            className="text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close announcement"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: { items } } = useCart();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Apple Deals Ghana Logo"
                  className="h-16 w-auto mr-4"
                  style={{ maxHeight: '64px' }}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-apple-black hover:text-apple-blue transition-colors">Home</Link>
              <Link to="/iphone" className="text-apple-black hover:text-apple-blue transition-colors">iPhone</Link>
              <Link to="/ipad" className="text-apple-black hover:text-apple-blue transition-colors">iPad</Link>
              <Link to="/mac" className="text-apple-black hover:text-apple-blue transition-colors">Mac</Link>
              <Link to="/watch" className="text-apple-black hover:text-apple-blue transition-colors">Watch</Link>
              <Link to="/accessories" className="text-apple-black hover:text-apple-blue transition-colors">Accessories</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-apple-black p-1 rounded-full hover:bg-apple-gray transition-colors">
                <Search size={20} />
              </button>
              <Link to="/cart" className="text-apple-black p-1 rounded-full hover:bg-apple-gray transition-colors">
                <ShoppingCart size={20} />
              </Link>
              <Link to="/account" className="text-apple-black p-1 rounded-full hover:bg-apple-gray transition-colors">
                <User size={20} />
              </Link>
              <button 
                className="md:hidden text-apple-black p-1 rounded-full hover:bg-apple-gray transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 md:top-20 z-40 bg-white">
            <div className="container-custom py-8">
              <nav className="flex flex-col space-y-6">
                <Link 
                  to="/" 
                  className="text-2xl text-apple-black hover:text-apple-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/iphone" 
                  className="text-2xl text-apple-black hover:text-apple-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  iPhone
                </Link>
                <Link 
                  to="/ipad" 
                  className="text-2xl text-apple-black hover:text-apple-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  iPad
                </Link>
                <Link 
                  to="/mac" 
                  className="text-2xl text-apple-black hover:text-apple-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mac
                </Link>
                <Link 
                  to="/watch" 
                  className="text-2xl text-apple-black hover:text-apple-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Watch
                </Link>
                <Link 
                  to="/accessories" 
                  className="text-2xl text-apple-black hover:text-apple-blue transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accessories
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
  );
};

export default Header;
