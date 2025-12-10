import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getLocale } from '../../../utils/get-locales';
import GetProductServiceInstance from '../../../api/get-product-service';

import { ProductDetail } from './product-detail';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  try {
    const product = await GetProductServiceInstance.getProduct(parseInt(resolvedParams.id, 10));
    return {
      title: `${product.title} | E-Commerce Store`,
      description: product.description
    };
  } catch (error) {
    return { title: 'Product Not Found' };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  if (isNaN(productId)) {
    notFound();
  }

  const [product, locales] = await Promise.all([
    GetProductServiceInstance.getProduct(productId).catch((error) => {
      if (error.message.includes('not found')) {
        return null;
      }
      throw error;
    }),
    getLocale()
  ]);

  const { productDetail } = locales;
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link href="/products" className="text-slate-500 hover:text-indigo-600 transition-colors">
          {productDetail.backToProducts}
        </Link>
        <span className="text-slate-300">{productDetail.separator}</span>
        <span className="text-slate-500 capitalize">{product.category}</span>
        <span className="text-slate-300">{productDetail.separator}</span>
        <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      <ProductDetail product={product} locales={productDetail} />
    </div>
  );
}
