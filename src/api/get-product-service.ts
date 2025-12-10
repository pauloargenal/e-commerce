import { Product } from '../types/product';

export interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

class GetProductService {
  private get getApiString(): string {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error('One or more API env vars are not defined');
    }

    return `${apiBaseUrl}/products`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async getProduct(id: number): Promise<Response> {
    return fetch(`${this.getApiString}/${id}`, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 3600 }
    });
  }
}

const GetProductServiceInstance = new GetProductService();

export default GetProductServiceInstance;
