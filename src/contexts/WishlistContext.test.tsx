import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { WishlistProvider, useWishlist } from './WishlistContext';

describe('WishlistContext', () => {
  const mockItem = {
    id: '1',
    name: 'iPhone 13',
    price: 999,
    image: 'iphone13.jpg'
  };

  it('should add item to wishlist', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0]).toEqual(mockItem);
  });

  it('should not add duplicate items', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem);
    });

    expect(result.current.state.items).toHaveLength(1);
  });

  it('should remove item from wishlist', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    act(() => {
      result.current.addItem(mockItem);
      result.current.removeItem(mockItem.id);
    });

    expect(result.current.state.items).toHaveLength(0);
  });

  it('should clear wishlist', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem({
        ...mockItem,
        id: '2',
        name: 'iPhone 14'
      });
      result.current.clearWishlist();
    });

    expect(result.current.state.items).toHaveLength(0);
  });

  it('should check if item is in wishlist', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: WishlistProvider
    });

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.isInWishlist(mockItem.id)).toBe(true);
    expect(result.current.isInWishlist('nonexistent')).toBe(false);
  });
}); 