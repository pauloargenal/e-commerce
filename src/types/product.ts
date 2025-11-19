export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  availableSizes: string[];
  availableColors: string[];
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface PromoCode {
  code: string;
  discount: number;
}

export interface Receipt {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  timestamp: string;
}
