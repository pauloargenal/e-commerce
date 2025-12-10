export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductResponse {
  product: Product;
}

export interface CategoriesResponse {
  categories: CategoryInfo[];
}

export interface CategoryInfo {
  slug: string;
  name: string;
  url: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
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

export type SortOption = 'title' | 'price' | 'rating' | 'stock';
export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  search: string;
  category: string;
  sortBy: SortOption;
  sortOrder: SortOrder;
}
