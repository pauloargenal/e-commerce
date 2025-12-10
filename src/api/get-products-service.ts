export interface GetProductsResponseInterface {
  name: string;
}

class GetProductsService {
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

  async getProducts(limit = 100, skip = 0): Promise<Response> {
    return fetch(`${this.getApiString}?limit=${limit}&skip=${skip}`, {
      method: 'GET',
      headers: this.headers
    });
  }
}

const GetProductsServiceInstance = new GetProductsService();

export default GetProductsServiceInstance;
