import Link from 'next/link';
import { PackageX, ArrowLeft } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageX className="w-12 h-12 text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Product Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          The product you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    </div>
  );
}
