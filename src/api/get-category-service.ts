import { CategoryResponse } from './get-product-category-service';

class GetCategoryService {
  private get getApiString(): string {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
    }

    return `${apiBaseUrl}/products/categories`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async getCategories(): Promise<CategoryResponse[]> {
    const response = await fetch(this.getApiString, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

const GetCategoryServiceInstance = new GetCategoryService();

export default GetCategoryServiceInstance;
