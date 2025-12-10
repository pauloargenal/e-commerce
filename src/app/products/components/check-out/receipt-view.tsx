import { CheckCircle, Download, Mail } from 'lucide-react';

import { Card } from '../../../../components/card';
import { Button } from '../../../../components/button';
import { Receipt } from '../../../../types/product';

import { formatDate } from './utils/format-date';

interface ReceiptViewProps {
  receipt: Receipt;
  handleClearCart: () => void;
  receiptLocale: Record<string, string>;
}

export function ReceiptView({ receipt, handleClearCart, receiptLocale }: ReceiptViewProps) {
  const orderNumberLabel = receiptLocale.orderNumber;
  const dateLabel = receiptLocale.date;
  const itemsLabel = receiptLocale.items;
  const subtotalLabel = receiptLocale.subtotal;
  const discountLabel = receiptLocale.discount;
  const totalLabel = receiptLocale.total;
  const discountAmountText = `-$${receipt.discount.toFixed(2)}`;
  const subtotalText = `$${receipt.subtotal.toFixed(2)}`;
  const totalText = `$${receipt.total.toFixed(2)}`;
  const renderOrderItem = (item: (typeof receipt.items)[0]) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    const itemTotal = discountedPrice * item.quantity;
    const itemDescription = `${item.product.title} x${item.quantity}`;
    const itemTotalText = `$${itemTotal.toFixed(2)}`;

    return (
      <div key={item.product.id} className="flex justify-between text-sm py-2">
        <span className="text-slate-700">{itemDescription}</span>
        <span className="font-medium text-slate-900">{itemTotalText}</span>
      </div>
    );
  };

  const renderDiscountRow = () => {
    if (receipt.discount <= 0) return null;
    return (
      <div className="flex justify-between text-sm text-emerald-600">
        <span>{discountLabel}</span>
        <span className="font-medium">{discountAmountText}</span>
      </div>
    );
  };

  return (
    <div className="text-center">
      {/* Success Icon */}
      <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
        <CheckCircle className="w-12 h-12 text-emerald-600" />
      </div>

      {/* Success Message */}
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{receiptLocale.title}</h3>
      <p className="text-slate-500 mb-8">{receiptLocale.success}</p>

      {/* Receipt Card */}
      <Card className="bg-white border border-slate-200 text-left mb-6 shadow-sm">
        <div className="space-y-4">
          {/* Order Info */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <>
              <p className="text-xs text-slate-500 uppercase tracking-wide">{orderNumberLabel}</p>
              <p className="font-mono font-bold text-indigo-600 text-lg">{receipt.id}</p>
            </>
            <>
              <p className="text-xs text-slate-500 uppercase tracking-wide">{dateLabel}</p>
              <p className="font-medium text-slate-900">{formatDate(receipt.timestamp)}</p>
            </>
          </div>

          {/* Items */}
          <>
            <p className="text-sm font-semibold text-slate-900 mb-2">{itemsLabel}</p>
            <div className="bg-slate-50 rounded-lg p-3">{receipt.items.map(renderOrderItem)}</div>
          </>

          {/* Totals */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">{subtotalLabel}</span>
              <span className="font-medium text-slate-900">{subtotalText}</span>
            </div>
            {renderDiscountRow()}
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-slate-200">
              <span className="text-slate-900">{totalLabel}</span>
              <span className="text-indigo-600">{totalText}</span>
            </div>
          </div>

          {/* Promo Code Badge */}
          {receipt.promoCode && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
              <p className="text-sm text-emerald-700">
                {receiptLocale['promoCode.applied'].replace('{code}', receipt.promoCode || '')}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          fullWidth
          onClick={handleClearCart}
          variant="primary"
          className="h-12 rounded-xl text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
        >
          {receiptLocale.continueShopping}
        </Button>
      </div>
    </div>
  );
}
