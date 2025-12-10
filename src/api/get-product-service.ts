import { Product } from '../types/product';

export interface GetProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const API_BASE_URL = 'https://dummyjson.com';

class GetProductService {
  private get getApiString(): string {
    if (!API_BASE_URL) {
      throw new Error('One or more API env vars are not defined');
    }

    return `${API_BASE_URL}/products`;
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
