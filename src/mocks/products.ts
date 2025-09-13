import { ProductWithoutId } from '../types/product';

export const mockProducts: ProductWithoutId[] = [
  {
    name: "iPhone 13 Pro",
    description: "Latest iPhone with Pro camera system",
    price: 899.99,
    stock: 15,
    category: "smartphones",
    images: ["https://images.unsplash.com/photo-1633891120862-aaa056fe62f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTMlMjBwcm98ZW58MHx8MHx8fDA%3D"],
    specs: {
      "Storage": "128GB",
      "Display": "6.1\" Super Retina XDR",
      "Chip": "A15 Bionic"
    },
    featured: true,
    discountPercentage: 5
  },
  {
    name: "MacBook Air M2",
    description: "Lightweight and powerful laptop",
    price: 1199.99,
    stock: 8,
    category: "laptops",
    images: ["https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMGFpciUyMG0yfGVufDB8fDB8fHww"],
    specs: {
      "Chip": "M2",
      "Memory": "8GB",
      "Storage": "256GB SSD"
    },
    featured: true,
    discountPercentage: 0
  },
  {
    name: "iPad Air",
    description: "Powerful. Colorful. Wonderful.",
    price: 599.99,
    stock: 12,
    category: "tablets",
    images: ["https://images.unsplash.com/photo-1642774046487-3b62b24a3a64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZCUyMGFpcnxlbnwwfHwwfHx8MA%3D%3D"],
    specs: {
      "Display": "10.9\" Liquid Retina",
      "Chip": "M1",
      "Storage": "64GB"
    },
    featured: false,
    discountPercentage: 10
  }
];
