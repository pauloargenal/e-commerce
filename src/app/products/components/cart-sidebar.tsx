'use client';

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  removeFromCart,
  updateQuantity,
  setCartOpen,
  openCheckout
} from '../../../store/slices/cart-slice';
import { Button } from '../../../components/button';

import CartFooter from './cart-footer';
import CartContent from './cart-content';

interface CartSidebarProps {
  cartLocale: Record<string, string>;
  isOpen: boolean;
}

export function CartSidebar({ cartLocale, isOpen }: CartSidebarProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((sum, item) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const subtotalText = `$${subtotal.toFixed(2)}`;

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const handleClose = () => {
    dispatch(setCartOpen(false));
  };

  const handleQuantityChange = (
    productId: number,
    delta: number,
    currentQuantity: number,
    maxStock: number
  ) => {
    const newQuantity = Math.max(0, Math.min(maxStock, currentQuantity + delta));
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    dispatch(openCheckout());
  };

  const backdropClass = isOpen
    ? 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-100'
    : 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-0 pointer-events-none';

  const sidebarClass = isOpen
    ? 'fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out translate-x-0'
    : 'fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out translate-x-full';

  const continueShoppingLabel = cartLocale['empty.continue'] || 'Continue Shopping';

  return (
    <>
      <div className={backdropClass} onClick={handleClose} aria-hidden="true" />
      <div className={sidebarClass}>
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">{cartLocale.title}</h2>
            {totalItems > 0 && (
              <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={cartLocale.close}
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <CartContent
          cartLocale={cartLocale}
          cartItems={cartItems}
          handleClose={handleClose}
          handleRemove={handleRemove}
          handleQuantityChange={handleQuantityChange}
          continueShoppingLabel={continueShoppingLabel}
        />

        <CartFooter
          cartLocale={cartLocale}
          subtotalText={subtotalText}
          handleCheckout={handleCheckout}
          cartItems={cartItems}
        />
      </div>
    </>
  );
}
