import { ProductsResponse } from '../types/product';

export interface CategoryResponse {
  slug: string;
  name: string;
  url: string;
}

class GetProductCategoryService {
  private get getApiString(): string {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
    }

    return `${apiBaseUrl}/products/category`;
  }

  private get headers(): HeadersInit {
    return {
      'content-type': 'application/json'
    };
  }

  async getProductCategories(category: string): Promise<ProductsResponse> {
    const response = await fetch(`${this.getApiString}/${encodeURIComponent(category)}`, {
      method: 'GET',
      headers: this.headers,
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products by category: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }
}

const GetProductCategoryServiceInstance = new GetProductCategoryService();

export default GetProductCategoryServiceInstance;
