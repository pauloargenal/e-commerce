import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { CartItem } from '../../../types/product';
import { Button } from '../../../components';

interface CartContentProps {
  cartLocale: Record<string, string>;
  cartItems: CartItem[];
  handleClose: () => void;
  handleRemove: (productId: number) => void;
  handleQuantityChange: (
    productId: number,
    delta: number,
    currentQuantity: number,
    maxStock: number
  ) => void;
  continueShoppingLabel: string;
}
export default function CartContent({
  cartLocale,
  cartItems,
  handleClose,
  handleRemove,
  handleQuantityChange,
  continueShoppingLabel
}: CartContentProps) {
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{cartLocale['empty.title']}</h3>
        <p className="text-slate-500 mb-6">{cartLocale['empty.description']}</p>
        <Button
          onClick={handleClose}
          variant="primary"
          className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
        >
          {continueShoppingLabel}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 180px)' }}>
      <div className="space-y-4">
        {cartItems.map((item: CartItem) => {
          const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
          const discountedPriceText = `$${discountedPrice.toFixed(2)}`;
          const hasDiscount = item.product.discountPercentage > 0;
          const priceText = `$${item.product.price.toFixed(2)}`;
          return (
            <div key={item.product.id} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
              {/* Product Image */}
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 text-sm line-clamp-2 mb-1">
                  {item.product.title}
                </h4>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-semibold text-indigo-600">{discountedPriceText}</span>
                  {hasDiscount && (
                    <span className="text-xs text-slate-400 line-through">{priceText}</span>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.product.id, -1, item.quantity, item.product.stock)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors rounded-l-lg"
                      aria-label={cartLocale['item.decrease']}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(item.product.id, 1, item.quantity, item.product.stock)
                      }
                      className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 transition-colors rounded-r-lg"
                      aria-label={cartLocale['item.increase']}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item.product.id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label={cartLocale['item.remove']}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
