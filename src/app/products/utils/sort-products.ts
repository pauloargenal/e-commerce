import { Product, SortOption, SortOrder } from '../../../types/product';

export function sortProducts(
  products: Product[],
  sortBy: SortOption = 'title',
  sortOrder: SortOrder = 'asc'
): Product[] {
  return [...products].sort((productA, productB) => {
    let comparison = 0;

    switch (sortBy) {
      case 'title':
        comparison = productA.title.localeCompare(productB.title);
        break;
      case 'price':
        comparison = productA.price - productB.price;
        break;
      case 'rating':
        comparison = productA.rating - productB.rating;
        break;
      case 'stock':
        comparison = productA.stock - productB.stock;
        break;
      default:
        comparison = productA.title.localeCompare(productB.title);
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });
}
