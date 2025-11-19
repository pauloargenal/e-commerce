import { getLocale } from '../../utils/get-locales';

import ProductLayout from './product-layout';

export default async function ProductPage() {
  const locales = await getLocale();

  const headerLocale = locales.common;
  const cartLocale = locales.cart;
  const checkoutLocale = locales.checkout;
  const productsLocale = locales.products;
  const productCardLocale = locales.productCard;
  const receiptLocale = locales.receipt;
  const footerLocale = locales.footer;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductLayout
        headerLocale={headerLocale}
        cartLocale={cartLocale}
        checkoutLocale={checkoutLocale}
        productsLocale={productsLocale}
        productCardLocale={productCardLocale}
        receiptLocale={receiptLocale}
        footerLocale={footerLocale}
      />
    </div>
  );
}
