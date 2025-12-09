import { ChangeEvent, useMemo } from 'react';

import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';

interface ApplyPromoInputProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  promoError: string;
  handleApplyPromo: () => void;
  checkoutLocale: Record<string, string>;
}

export function ApplyPromoInput({
  promoCode,
  setPromoCode,
  promoError,
  handleApplyPromo,
  checkoutLocale
}: ApplyPromoInputProps) {
  return (
    <div className="flex gap-2">
      <Input
        fullWidth
        placeholder={checkoutLocale['promoCode.placeholder']}
        value={promoCode}
        error={promoError}
        id="promo-code-input"
        onChange={(event: ChangeEvent<HTMLInputElement>) => setPromoCode(event.target.value)}
      />
      <Button onClick={handleApplyPromo} disabled={!promoCode.trim()}>
        {checkoutLocale['promoCode.apply']}
      </Button>
    </div>
  );
}
