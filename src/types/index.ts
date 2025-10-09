export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'women' | 'men' | 'unisex';
  price: number;
  currency: string;
  volume: number;
  concentration?: string;
  longevity?: string;
  notes_top?: string;
  notes_heart?: string;
  notes_base?: string;
  description_short?: string;
  description_full?: string;
  image_url: string;
  in_stock: boolean;
  popularity_score: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  delivery_method: 'nova_poshta' | 'courier' | 'ukrposhta';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price_at_order: number;
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
