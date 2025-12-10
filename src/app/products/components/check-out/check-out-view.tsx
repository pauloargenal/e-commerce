import { useMemo } from 'react';
import { ShoppingBag } from 'lucide-react';

import { Card } from '../../../../components/card';
import { Button } from '../../../../components/button';
import { CartItem } from '../../../../types/product';

import { AppliedPromoCard } from './apply-promo-card';
import { ApplyPromoInput } from './apply-promo-input';
import { formatPrice } from '../../utils/format-price';

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
  setPromoError: _setPromoError,
  checkoutLocale
}: CheckOutViewProps) {
  const orderSummaryTitle = checkoutLocale.orderSummary;
  const subtotalText = formatPrice(subtotal);
  const totalText = formatPrice(total);
  const discountAmountText = `-${formatPrice(discountAmount)}`;

  const discountText = useMemo(() => {
    return checkoutLocale['summary.discount'].replace(
      '{percentage}',
      discountPercentage.toString()
    );
  }, [checkoutLocale, discountPercentage]);

  const renderPromoSection = () => {
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
  };

  const renderOrderItem = (item: CartItem) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    const itemTotal = discountedPrice * item.quantity;
    const quantityText = `${checkoutLocale.qty}: ${item.quantity}`;
    const itemTotalText = `$${itemTotal.toFixed(2)}`;
    return (
      <div
        key={item.product.id}
        className="flex gap-3 py-3 border-b border-slate-200 last:border-0"
      >
        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
          <img
            src={item.product.thumbnail}
            alt={item.product.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-slate-900 text-sm line-clamp-1">{item.product.title}</p>
          <p className="text-slate-500 text-xs mt-0.5">{quantityText}</p>
        </div>
        <span className="font-semibold text-slate-900">{itemTotalText}</span>
      </div>
    );
  };

  const renderDiscountRow = () => {
    if (discountAmount <= 0) return null;
    return (
      <div className="flex justify-between text-emerald-600">
        <span>{discountText}</span>
        <span className="font-medium">{discountAmountText}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-slate-900">{orderSummaryTitle}</h3>
        </div>
        <Card className="bg-slate-50 border border-slate-200" padding="sm">
          <div className="max-h-60 overflow-y-auto">{items.map(renderOrderItem)}</div>
        </Card>
      </section>

      {/* Promo Code */}
      <section>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">
          {checkoutLocale['promoCode.title']}
        </h3>
        {renderPromoSection()}
      </section>

      {/* Price Summary */}
      <Card className="bg-indigo-50 border border-indigo-100">
        <div className="space-y-3">
          <div className="flex justify-between text-slate-700">
            <span>{checkoutLocale['summary.subtotal']}</span>
            <span className="font-medium">{subtotalText}</span>
          </div>
          {renderDiscountRow()}
          <div className="flex justify-between text-xl font-bold border-t border-indigo-200 pt-3">
            <span className="text-slate-900">{checkoutLocale['summary.total']}</span>
            <span className="text-indigo-600">{totalText}</span>
          </div>
        </div>
      </Card>

      {/* Complete Purchase Button */}
      <Button
        fullWidth
        size="lg"
        onClick={handleCompleteCheckout}
        className="h-14 rounded-xl text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
      >
        {checkoutLocale.completePurchase}
      </Button>
    </div>
  );
}
