import { Button } from '../../../components/button';
import { CartItem } from '../../../types/product';

interface CartFooterProps {
  cartLocale: Record<string, string>;
  subtotalText: string;
  handleCheckout: () => void;
  cartItems: CartItem[];
}
export default function CartFooter({
  cartLocale,
  subtotalText,
  handleCheckout,
  cartItems
}: CartFooterProps) {
  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-600">{cartLocale.subtotal}</span>
        <span className="text-xl font-bold text-slate-900">{subtotalText}</span>
      </div>
      <Button
        fullWidth
        variant="primary"
        className="h-12 rounded-xl text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
        onClick={handleCheckout}
      >
        {cartLocale.checkout}
      </Button>
    </div>
  );
}
