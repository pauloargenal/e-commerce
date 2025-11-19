import { ShoppingCart } from 'lucide-react';

import { Button } from './button';

interface HeaderProps {
  headerLocale: Record<string, string>;
  cartItemsCount: number;
}

export function Header({ headerLocale, cartItemsCount }: HeaderProps) {
  const locales = headerLocale;
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900">{locales?.title}</h1>
          <p className="text-sm text-gray-600 mt-1">{locales?.description}</p>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center justify-center bg-white-60 text-black px-2 py-1 rounded-lg text-normal font-semibold">
            <ShoppingCart className="h-6 w-6 mr-1" />
            {cartItemsCount}
          </div>
        </div>
      </div>
    </header>
  );
}
