import Link from 'next/link';
import { Store } from 'lucide-react';

interface FooterProps {
  footerLocale: string;
}

export function Footer({ footerLocale }: FooterProps) {
  const brandName = 'E-Commerce Store';
  const brandDescription =
    'Your one-stop destination for quality products. We offer the best selection with competitive prices and excellent customer service.';
  const quickLinksTitle = 'Quick Links';
  const supportTitle = 'Support';

  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">{brandName}</span>
            </div>
            <p className="text-slate-400 max-w-md mb-6">{brandDescription}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{quickLinksTitle}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=smartphones"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=laptops"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=fragrances"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Fragrances
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{supportTitle}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>{footerLocale}</p>
        </div>
      </div>
    </footer>
  );
}
