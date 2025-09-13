import { supabase } from './supabase';
import { Product, Profile, Order, OrderItem, WishlistItem } from './supabase';

export const getProducts = async (filters = {}) => {
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' });

  // Apply filters
  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters.isFeatured) {
    query = query.eq('is_featured', true);
  }
  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  // Apply sorting
  if (filters.sortBy) {
    const [column, order] = filters.sortBy.split(':');
    query = query.order(column, { ascending: order === 'asc' });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  // Apply pagination
  if (filters.page && filters.limit) {
    const from = (filters.page - 1) * filters.limit;
    const to = from + filters.limit - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;
  
  if (error) throw error;
  return { products: data, count: count || 0 };
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) throw error;
  return data;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const addToWishlist = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: userId, product_id: productId }])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);
    
  if (error) throw error;
};

export const getWishlist = async (userId: string) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select(`
      *,
      products (*)
    `)
    .eq('user_id', userId);
    
  if (error) throw error;
  return data.map(item => item.products);
};

export const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'status'>, items: Array<Omit<OrderItem, 'id'>>) => {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{ ...order, status: 'pending' }])
    .select()
    .single();
    
  if (orderError) throw orderError;
  
  const orderItems = items.map(item => ({
    ...item,
    order_id: orderData.id
  }));
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
    
  if (itemsError) throw itemsError;
  
  return orderData;
};

export const getOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};
