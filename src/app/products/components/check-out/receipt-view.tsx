import { CheckIcon } from 'lucide-react';

import { Button, Card } from '../../../../components';
import { Receipt } from '../../../../types/product';

import { formatDate } from './utils/format-date';

interface ReceiptViewProps {
  receipt: Receipt;
  handleClearCart: () => void;
  receiptLocale: Record<string, string>;
}

export function ReceiptView({ receipt, handleClearCart, receiptLocale }: ReceiptViewProps) {
  const subtotalText = `$${receipt.subtotal.toFixed(2)}`;
  const discountText = `${receiptLocale.discount} (${receipt.promoCode}):`;
  const discountAmountText = `-$${receipt.discount.toFixed(2)}`;
  const totalText = `$${receipt.total.toFixed(2)}`;
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckIcon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{receiptLocale.title}</h3>
      </div>

      <Card className="bg-gray-50">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{receiptLocale.orderNumber}</span>
            <span className="font-mono font-medium">{receipt.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{receiptLocale.date}</span>
            <span className="font-medium">{formatDate(receipt.timestamp)}</span>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <h4 className="font-semibold mb-3">{receiptLocale.items}</h4>
            <div className="space-y-2">
              {receipt.items.map((item, index) => {
                const itemPrice = `$${(item.product.price * item.quantity).toFixed(2)}`;
                const itemName = `${item.product.name} (${item.size}, ${item.color}) × ${item.quantity}`;
                return (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-700">{itemName}</span>
                    <span className="font-medium">{itemPrice}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{receiptLocale.subtotal}</span>
              <span className="font-medium">{subtotalText}</span>
            </div>
            {receipt.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>{discountText}</span>
                <span className="font-medium">{discountAmountText}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
              <span>{receiptLocale.total}</span>
              <span className="text-blue-600">{totalText}</span>
            </div>
          </div>
        </div>
      </Card>

      <Button fullWidth onClick={handleClearCart}>
        {receiptLocale.continueShopping}
      </Button>
    </div>
  );
}
