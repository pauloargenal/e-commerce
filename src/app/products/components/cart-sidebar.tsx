'use client';

import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useEffect, useRef, useCallback } from 'react';

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
import { formatPrice } from '../utils/format-price';

interface CartSidebarProps {
  cartLocale: Record<string, string>;
  isOpen: boolean;
}

export function CartSidebar({ cartLocale, isOpen }: CartSidebarProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const subtotal = cartItems.reduce((sum, item) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    return sum + discountedPrice * item.quantity;
  }, 0);

  const subtotalText = formatPrice(subtotal);

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  const handleClose = useCallback(() => {
    dispatch(setCartOpen(false));
  }, [dispatch]);

  // Focus management when sidebar opens/closes
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element before opening sidebar
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // Focus the close button when sidebar opens (after animation)
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }

    // When closing, restore focus to previously focused element
    if (previouslyFocusedElement.current) {
      previouslyFocusedElement.current.focus();
    }

    // Restore body scroll
    document.body.style.overflow = 'unset';

    return undefined;
  }, [isOpen]);

  // Trap focus inside sidebar when open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Close on Escape key
      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      if (event.key === 'Tab' && sidebarRef.current) {
        const focusableElements = sidebarRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        // If only one or no focusable elements, prevent tabbing
        if (focusableElements.length === 0) {
          event.preventDefault();
          return;
        }

        if (focusableElements.length === 1) {
          event.preventDefault();
          firstElement?.focus();
          return;
        }

        // Trap focus within sidebar
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
          return;
        }

        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

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
      <aside
        ref={sidebarRef}
        className={sidebarClass}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-sidebar-title"
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-indigo-600" aria-hidden="true" />
            <h2 id="cart-sidebar-title" className="text-xl font-bold text-slate-900">
              {cartLocale.title}
            </h2>
            {totalItems > 0 &&
              (() => {
                const itemsText = totalItems === 1 ? 'item' : 'items';
                return (
                  <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                    <span className="sr-only">
                      {totalItems} {itemsText}
                    </span>
                    <span aria-hidden="true">{totalItems}</span>
                  </span>
                );
              })()}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label={cartLocale.close || 'Close cart'}
          >
            <X className="w-5 h-5 text-slate-500" aria-hidden="true" />
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
      </aside>
    </>
  );
}
