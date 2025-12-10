export interface CategoryResponse {
  slug: string;
  name: string;
  url: string;
}

const API_BASE_URL = 'https://dummyjson.com';

class GetProductCategoryService {
  private get getApiString(): string {
    if (!API_BASE_URL) {
      throw new Error('One or more API env vars are not defined');
    }

    return `${API_BASE_URL}/products/category`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async getProductCategories(category: string): Promise<Response> {
    return fetch(`${this.getApiString}/${encodeURIComponent(category)}`, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 3600 }
    });
  }
}

const GetProductCategoryServiceInstance = new GetProductCategoryService();

export default GetProductCategoryServiceInstance;
