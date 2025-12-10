import { ProductsResponse } from '../types/product';

class GetProductsService {
  private get getApiString(): string {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
    }

    return `${apiBaseUrl}/products`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async getProducts(limit = 100, skip = 0): Promise<ProductsResponse> {
    const response = await fetch(`${this.getApiString}?limit=${limit}&skip=${skip}`, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

const GetProductsServiceInstance = new GetProductsService();

export default GetProductsServiceInstance;
