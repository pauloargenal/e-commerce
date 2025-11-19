'use client';

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { useAppSelector } from '../../store/hooks';

import { Cart } from './components/cart';
import { ProductList } from './components/product-list';
import { Checkout } from './components/check-out/check-out';

interface ProductLayoutProps {
  headerLocale: Record<string, any>;
  cartLocale: Record<string, any>;
  checkoutLocale: Record<string, any>;
  productsLocale: Record<string, any>;
  productCardLocale: Record<string, string>;
  receiptLocale: Record<string, string>;
  footerLocale: Record<string, string>;
}

export default function ProductLayout({
  headerLocale,
  cartLocale,
  checkoutLocale,
  productsLocale,
  productCardLocale,
  receiptLocale,
  footerLocale
}: ProductLayoutProps) {
  const cartItemsCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header headerLocale={headerLocale} cartItemsCount={cartItemsCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{productsLocale.title}</h2>
            <ProductList productsLocale={productsLocale} productCardLocale={productCardLocale} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{cartLocale.title}</h2>
              <Cart cartLocale={cartLocale} />
            </div>
          </div>
        </div>
      </main>

      <Checkout
        checkoutLocale={checkoutLocale}
        productCardLocale={productCardLocale}
        receiptLocale={receiptLocale}
      />

      <Footer footerLocale={footerLocale.copyright} />
    </div>
  );
}
