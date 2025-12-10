import { Product } from '../types/product';

export interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const API_BASE_URL = 'https://dummyjson.com';

class SearchProductService {
  private get getApiString(): string {
    if (!API_BASE_URL) {
      throw new Error('One or more API env vars are not defined');
    }

    return `${API_BASE_URL}/products/search`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async searchProducts(query: string): Promise<Response> {
    return fetch(`${this.getApiString}?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 60 }
    });
  }
}

const SearchProductServiceInstance = new SearchProductService();

export default SearchProductServiceInstance;
