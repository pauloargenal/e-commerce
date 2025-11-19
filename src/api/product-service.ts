import { Product } from '../types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const getAvailableSizes = (category: string): string[] => {
  const categoryLower = category.toLowerCase();

  if (
    categoryLower.includes('clothing') ||
    categoryLower.includes("men's") ||
    categoryLower.includes("women's")
  ) {
    return ['XS', 'S', 'M', 'L', 'XL'];
  }

  return ['One Size'];
};

const getAvailableColors = (category: string): string[] => {
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes('electronic')) {
    return ['Black', 'Silver', 'White'];
  }

  if (categoryLower.includes('jewelry')) {
    return ['Gold', 'Silver', 'Rose Gold'];
  }

  return ['Black', 'White', 'Gray', 'Navy', 'Red'];
};

const mapFakeStoreProduct = (apiProduct: FakeStoreProduct): Product => {
  return {
    id: String(apiProduct.id),
    name: apiProduct.title,
    price: apiProduct.price,
    category: apiProduct.category,
    description: apiProduct.description,
    image: apiProduct.image,
    availableSizes: getAvailableSizes(apiProduct.category),
    availableColors: getAvailableColors(apiProduct.category),
    rating: apiProduct.rating
  };
};

export const productService = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data: FakeStoreProduct[] = await response.json();
    return data.map(mapFakeStoreProduct);
  },

  async fetchProductById(id: string): Promise<Product | undefined> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return undefined;
        }
        throw new Error(`Failed to fetch product with id ${id}`);
      }

      const data: FakeStoreProduct = await response.json();
      return mapFakeStoreProduct(data);
    } catch (error) {
      throw new Error(`Failed to fetch product with id ${id}: ${error}`);
    }
  }
};
