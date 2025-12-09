import { notFound } from 'next/navigation';
import Link from 'next/link';

import { productService } from '../../../api/product-service';
import { getLocale } from '../../../utils/get-locales';

import { ProductDetail } from './product-detail';

interface ProductDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const product = await productService.fetchProductById(parseInt(params.id, 10));

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | E-Commerce Store`,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const productId = parseInt(params.id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const [product, locales] = await Promise.all([
    productService.fetchProductById(productId),
    getLocale()
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/products" className="text-slate-500 hover:text-indigo-600 transition-colors">
          Products
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500 capitalize">{product.category}</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      <ProductDetail product={product} locales={locales} />
    </div>
  );
}
