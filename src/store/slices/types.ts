import { CartItem, Product } from '../../types/product';

export interface CartState {
  items: CartItem[];
  isCheckoutOpen: boolean;
}

export interface AddToCartPayload {
  product: Product;
  size: string;
  color: string;
}

export interface UpdateQuantityPayload {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  productId: string;
  size: string;
  color: string;
}
