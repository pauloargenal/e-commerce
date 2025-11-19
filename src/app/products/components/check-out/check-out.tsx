'use client';

import { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearCart, setCheckoutOpen } from '../../../../store/slices/cart-slice';
import { Receipt } from '../../../../types/product';
import { promoCodes } from '../../../../api/mock-data';
import { Modal } from '../../../../components/modal';

import { CheckOutView } from './check-out-view';
import { ReceiptView } from './receipt-view';

interface CheckoutProps {
  checkoutLocale: Record<string, any>;
  productCardLocale: Record<string, string>;
  receiptLocale: Record<string, string>;
}

export function Checkout({ checkoutLocale, productCardLocale, receiptLocale }: CheckoutProps) {
  const dispatch = useAppDispatch();
  const { items, isCheckoutOpen } = useAppSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const getDiscountPercentage = () => {
    if (!appliedPromo) return 0;
    const promo = promoCodes.find((promo) => promo.code === appliedPromo);
    return promo ? promo.discount : 0;
  };

  const discountPercentage = getDiscountPercentage();
  const discountAmount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount;

  const handleApplyPromo = () => {
    const promo = promoCodes.find((promo) => promo.code.toUpperCase() === promoCode.toUpperCase());

    if (promo) {
      setAppliedPromo(promo.code);
      setPromoError('');
    } else {
      setPromoError(checkoutLocale['promoCode.invalid']);
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleCompleteCheckout = () => {
    const newReceipt: Receipt = {
      id: `REC-${Date.now()}`,
      items: [...items],
      subtotal,
      discount: discountAmount,
      total,
      promoCode: appliedPromo || undefined,
      timestamp: new Date().toISOString()
    };
    setReceipt(newReceipt);
  };

  const handleClose = () => {
    dispatch(setCheckoutOpen(false));
    setPromoCode('');
    setAppliedPromo(null);
    setPromoError('');
    setReceipt(null);
    if (receipt) {
      dispatch(clearCart());
      setReceipt(null);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setReceipt(null);
    handleClose();
  };

  const checkOutTitle = receipt ? checkoutLocale.orderComplete : checkoutLocale.title;

  const checkOutContent = () => {
    if (receipt) {
      return (
        <ReceiptView
          receipt={receipt}
          handleClearCart={handleClearCart}
          receiptLocale={receiptLocale}
        />
      );
    }
    return (
      <CheckOutView
        items={items}
        appliedPromo={appliedPromo}
        discountPercentage={discountPercentage}
        discountAmount={discountAmount}
        total={total}
        handleCompleteCheckout={handleCompleteCheckout}
        handleRemovePromo={handleRemovePromo}
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        promoError={promoError}
        handleApplyPromo={handleApplyPromo}
        subtotal={subtotal}
        setPromoError={setPromoError}
        checkoutLocale={checkoutLocale}
        productCardLocale={productCardLocale}
      />
    );
  };

  return (
    <Modal isOpen={isCheckoutOpen} onClose={handleClose} title={checkOutTitle} size="lg">
      {checkOutContent()}
    </Modal>
  );
}
