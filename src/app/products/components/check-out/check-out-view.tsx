import { useMemo } from 'react';

import { Card } from '../../../../components/card';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { CartItem } from '../../../../types/product';

import { AppliedPromoCard } from './apply-promo-card';
import { ApplyPromoInput } from './apply-promo-input';

interface CheckOutViewProps {
  items: CartItem[];
  appliedPromo: string | null;
  discountPercentage: number;
  discountAmount: number;
  total: number;
  handleCompleteCheckout: () => void;
  handleRemovePromo: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoError: string;
  handleApplyPromo: () => void;
  subtotal: number;
  setPromoError: (error: string) => void;
  checkoutLocale: Record<string, string>;
  productCardLocale: Record<string, string>;
}

export function CheckOutView({
  items,
  appliedPromo,
  discountPercentage,
  discountAmount,
  total,
  handleCompleteCheckout,
  handleRemovePromo,
  promoCode,
  setPromoCode,
  promoError,
  handleApplyPromo,
  subtotal,
  setPromoError,
  checkoutLocale,
  productCardLocale
}: CheckOutViewProps) {
  const checkOutOrderSummaryText = useMemo(() => {
    return `${checkoutLocale.orderSummary}: ${checkoutLocale['summary.discount'].replace(
      '{percentage}',
      discountPercentage.toString()
    )}`;
  }, [checkoutLocale, discountPercentage]);

  const subtotalText = `$${subtotal.toFixed(2)}`;

  const applyPromoContent = useMemo(() => {
    if (appliedPromo) {
      return (
        <AppliedPromoCard
          appliedPromo={appliedPromo}
          discountPercentage={discountPercentage}
          handleRemovePromo={handleRemovePromo}
          checkoutLocale={checkoutLocale}
        />
      );
    }
    return (
      <ApplyPromoInput
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        promoError={promoError}
        handleApplyPromo={handleApplyPromo}
        checkoutLocale={checkoutLocale}
      />
    );
  }, [
    appliedPromo,
    discountPercentage,
    handleRemovePromo,
    promoCode,
    setPromoCode,
    promoError,
    handleApplyPromo,
    checkoutLocale
  ]);

  const discountText = useMemo(() => {
    return checkoutLocale['summary.discount'].replace(
      '{percentage}',
      discountPercentage.toString()
    );
  }, [checkoutLocale, discountPercentage]);

  const formatTotalText = useMemo(() => {
    return `-$${total.toFixed(2)}`;
  }, [total]);

  const totalText = useMemo(() => {
    return `$${total.toFixed(2)}`;
  }, [total]);

  return (
    <div className="space-y-6">
      <>
        <h3 className="text-lg font-semibold mb-3">{checkOutOrderSummaryText}</h3>
        <Card className="bg-gray-50" padding="sm">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {items.map((item, index) => {
              const itemPrice = `$${(item.product.price * item.quantity).toFixed(2)}`;
              const itemSizeColorQuantity = `${productCardLocale.size}: ${item.size} | ${productCardLocale.color}: ${item.color} | ${checkoutLocale.qty}: ${item.quantity}`;
              return (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex justify-between text-sm py-2 border-b border-gray-200 last:border-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-gray-600 text-xs">{itemSizeColorQuantity}</p>
                  </div>
                  <span className="font-medium text-gray-900">{itemPrice}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </>

      <>
        <h3 className="text-lg font-semibold mb-3">{checkoutLocale['promoCode.title']}</h3>
        {applyPromoContent}
      </>

      <Card className="bg-blue-50">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-700">{checkoutLocale['summary.subtotal']}</span>
            <span className="font-medium">{subtotalText}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{discountText}</span>
              <span className="font-medium">{formatTotalText}</span>
            </div>
          )}
          <div className="flex justify-between text-xl font-bold border-t border-blue-200 pt-2">
            <span>{checkoutLocale['summary.total']}</span>
            <span className="text-blue-600">{totalText}</span>
          </div>
        </div>
      </Card>

      <div className="flex w-full">
        <Button fullWidth size="lg" onClick={handleCompleteCheckout}>
          {checkoutLocale.completePurchase}
        </Button>
      </div>
    </div>
  );
}
