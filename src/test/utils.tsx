import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { WishlistProvider } from '../contexts/WishlistContext';

interface WrapperProps {
  children: ReactNode;
}

export const AllTheProviders = ({ children }: WrapperProps) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export const renderWithProviders = (ui: ReactNode) => {
  return render(ui, { wrapper: AllTheProviders });
}; 