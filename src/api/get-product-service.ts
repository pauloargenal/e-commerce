import { Product } from '../types/product';

class GetProductService {
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

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${this.getApiString}/${id}`, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Product with ID ${id} not found`);
      }
      throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

const GetProductServiceInstance = new GetProductService();

export default GetProductServiceInstance;
