import { ProductsResponse } from '../types/product';

class SearchProductService {
  private get getApiString(): string {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
    }

    return `${apiBaseUrl}/products/search`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await fetch(`${this.getApiString}?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

const SearchProductServiceInstance = new SearchProductService();

export default SearchProductServiceInstance;
