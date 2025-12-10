export interface GetProductsResponseInterface {
  name: string;
}

const API_BASE_URL = 'https://dummyjson.com';

class GetProductsService {
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

  async getProducts(limit = 100, skip = 0): Promise<Response> {
    return fetch(`${this.getApiString}?limit=${limit}&skip=${skip}`, {
      method: 'GET',
      headers: this.headers
    });
  }
}

const GetProductsServiceInstance = new GetProductsService();

export default GetProductsServiceInstance;
