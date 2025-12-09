'use client';

import { ReactNode } from 'react';

import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { useAppSelector } from '../../store/hooks';

import { CartSidebar } from './components/cart-sidebar';
import { Checkout } from './components/check-out/check-out';

interface ProductLayoutProps {
  children: ReactNode;
  headerLocale: Record<string, string>;
  cartLocale: Record<string, string>;
  checkoutLocale: Record<string, string>;
  receiptLocale: Record<string, string>;
  footerLocale: Record<string, string>;
}

export function ProductLayout({
  children,
  headerLocale,
  cartLocale,
  checkoutLocale,
  receiptLocale,
  footerLocale
}: ProductLayoutProps) {
  const cartItemsCount = useAppSelector((state) => {
    return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  });
  const isCartOpen = useAppSelector((state) => {
    return state.cart.isOpen;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Header headerLocale={headerLocale} cartItemsCount={cartItemsCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>

      <CartSidebar cartLocale={cartLocale} isOpen={isCartOpen} />

      <Checkout checkoutLocale={checkoutLocale} receiptLocale={receiptLocale} />

      <Footer footerLocale={footerLocale.copyright} />
    </div>
  );
}
