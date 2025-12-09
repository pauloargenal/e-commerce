'use client';

import Link from 'next/link';
import { ShoppingCart, Store } from 'lucide-react';
import { Fragment } from 'react';

import { useAppDispatch } from '../store/hooks';
import { toggleCart } from '../store/slices/cart-slice';

interface HeaderProps {
  headerLocale: Record<string, string>;
  cartItemsCount: number;
}

export function Header({ headerLocale, cartItemsCount }: HeaderProps) {
  const dispatch = useAppDispatch();

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const cartCountDisplay = cartItemsCount > 99 ? '99+' : String(cartItemsCount);
  const showCartCount = cartItemsCount > 0;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/products" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50 group-hover:shadow-indigo-300/60 transition-shadow">
              <Store className="w-5 h-5 text-white" />
            </div>
            <>
              <h1 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {headerLocale?.title}
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">{headerLocale?.description}</p>
            </>
          </Link>

          <button
            type="button"
            onClick={handleCartClick}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
          >
            <ShoppingCart className="h-5 w-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
            <span className="font-medium text-slate-700 hidden sm:inline">
              {headerLocale?.cart}
            </span>
            {showCartCount && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                {cartCountDisplay}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
