import { Product, CartItem } from '../../src/types/product';

export const mockProduct: Product = {
  id: 1,
  title: 'iPhone 9',
  description: 'An apple mobile which is nothing like apple',
  category: 'smartphones',
  price: 549,
  discountPercentage: 12.96,
  rating: 4.69,
  stock: 94,
  tags: ['smartphone', 'apple'],
  brand: 'Apple',
  sku: 'ABCD1234',
  weight: 0.5,
  dimensions: {
    width: 10,
    height: 15,
    depth: 1
  },
  warrantyInformation: '1 year warranty',
  shippingInformation: 'Ships in 1 month',
  availabilityStatus: 'In Stock',
  reviews: [
    {
      rating: 5,
      comment: 'Great product!',
      date: '2024-01-01',
      reviewerName: 'John Doe',
      reviewerEmail: 'john@example.com'
    }
  ],
  returnPolicy: '30 days return policy',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    barcode: '1234567890',
    qrCode: 'https://example.com/qr'
  },
  images: ['https://cdn.dummyjson.com/products/images/smartphones/iPhone%209/1.png'],
  thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%209/thumbnail.png'
};

export const mockProduct2: Product = {
  id: 2,
  title: 'iPhone X',
  description: 'SIM-Free, Model A19211 6.5-inch Super Retina HD display',
  category: 'smartphones',
  price: 899,
  discountPercentage: 17.94,
  rating: 4.44,
  stock: 34,
  tags: ['smartphone', 'apple'],
  brand: 'Apple',
  sku: 'EFGH5678',
  weight: 0.6,
  dimensions: {
    width: 11,
    height: 16,
    depth: 1
  },
  warrantyInformation: '1 year warranty',
  shippingInformation: 'Ships in 2 weeks',
  availabilityStatus: 'In Stock',
  reviews: [],
  returnPolicy: '30 days return policy',
  minimumOrderQuantity: 1,
  meta: {
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    barcode: '0987654321',
    qrCode: 'https://example.com/qr2'
  },
  images: ['https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/1.png'],
  thumbnail: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png'
};

export const mockProducts: Product[] = [mockProduct, mockProduct2];

export const mockCartItem: CartItem = {
  product: mockProduct,
  quantity: 1
};

export const mockCartItems: CartItem[] = [
  mockCartItem,
  {
    product: mockProduct2,
    quantity: 2
  }
];
