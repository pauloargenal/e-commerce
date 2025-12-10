export interface GetProductsResponseInterface {
  name: string;
}

class GetCategoryService {
  private get getApiString(): string {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error('One or more API env vars are not defined');
    }

    return `${apiBaseUrl}/products/categories`;
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
