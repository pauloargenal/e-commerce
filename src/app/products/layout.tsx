import { ReactNode } from 'react';

import { getLocale } from '../../utils/get-locales';

import { ProductLayout } from './product-layout';

interface ProductsLayoutProps {
  children: ReactNode;
}

export default async function ProductsLayout({ children }: ProductsLayoutProps) {
  const locales = await getLocale();

  return (
    <ProductLayout
      headerLocale={locales.common}
      cartLocale={locales.cart}
      checkoutLocale={locales.checkout}
      receiptLocale={locales.receipt}
      footerLocale={locales.footer}
    >
      {children}
    </ProductLayout>
  );
}
