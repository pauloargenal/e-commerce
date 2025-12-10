export interface GetProductsResponseInterface {
  name: string;
}

const API_BASE_URL = 'https://dummyjson.com';


class GetCategoryService {
  private get getApiString(): string {
    if (!API_BASE_URL) {
      throw new Error('One or more API env vars are not defined');
    }

    return `${API_BASE_URL}/products/categories`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async getCategories(): Promise<Response> {
    return fetch(this.getApiString, {
      method: 'GET',
      headers: this.headers
    });
  }
}

const GetCategoryServiceInstance = new GetCategoryService();

export default GetCategoryServiceInstance;
