export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand?: string;
  images: string[];
  specifications?: Record<string, any>;
  rating?: number;
  reviews?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'admin' | 'user';
  createdAt: string;
  lastLogin?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
    image?: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchQuery?: string;
}
