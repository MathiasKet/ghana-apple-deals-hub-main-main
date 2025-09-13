import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getInitials(name?: string | null): string {
  if (!name) return 'US';
  
  // If it's an email, get the part before @
  const nameToUse = name.includes('@') ? name.split('@')[0] : name;
  
  // Split by spaces and dots, filter out empty strings
  const parts = nameToUse.split(/[\s.]+/).filter(Boolean);
  
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  // Get first letter of first and last part
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
}
