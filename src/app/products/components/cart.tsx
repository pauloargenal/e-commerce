'use client';

import { ShoppingCart } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { removeFromCart, updateQuantity, setCheckoutOpen } from '../../../store/slices/cart-slice';
import { Card } from '../../../components/card';
import { Button } from '../../../components/button';

interface CartProps {
  cartLocale: Record<string, any>;
}

export function Cart({ cartLocale }: CartProps) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleUpdateQuantity = (
    productId: string,
    size: string,
    color: string,
    newQuantity: number
  ) => {
    dispatch(updateQuantity({ productId, size, color, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    dispatch(removeFromCart({ productId, size, color }));
  };

  const handleCheckout = () => {
    dispatch(setCheckoutOpen(true));
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg font-medium">{cartLocale['empty.title']}</p>
        <p className="text-gray-500 mt-2">{cartLocale['empty.description']}</p>
      </Card>
    );
  }
  const subtotalText = `$${subtotal.toFixed(2)}`;
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item) => {
          const itemSizeColor = `${cartLocale['item.size']}: ${item.size} | ${cartLocale['item.color']}: ${item.color}`;
          const itemPriceText = `$${item.product.price.toFixed(2)} ${cartLocale['item.each']}`;
          return (
            <Card key={`${item.product.id}-${item.size}-${item.color}`} padding="sm">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-gray-900 truncate">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">{itemSizeColor}</p>
                    <p className="text-sm font-medium text-blue-600 mt-1">{itemPriceText}</p>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                    >
                      {cartLocale['item.decrease']}
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateQuantity(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      className="w-7 h-7 rounded bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                    >
                      {cartLocale['item.increase']}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.product.id, item.size, item.color)}
                      className="ml-auto text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      {cartLocale['item.remove']}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-gray-900">{cartLocale.subtotal}</span>
        <span className="text-2xl font-bold text-blue-600">{subtotalText}</span>
      </div>
      <Button fullWidth variant="primary" onClick={handleCheckout}>
        {cartLocale.checkout}
      </Button>
    </div>
  );
}
