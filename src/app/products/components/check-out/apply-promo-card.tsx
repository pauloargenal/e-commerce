import { useMemo } from 'react';

import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';

interface AppliedPromoCardProps {
  appliedPromo: string;
  discountPercentage: number;
  handleRemovePromo: () => void;
  checkoutLocale: Record<string, string>;
}

export function AppliedPromoCard({
  appliedPromo,
  discountPercentage,
  handleRemovePromo,
  checkoutLocale
}: AppliedPromoCardProps) {
  const appliedPromoText = useMemo(() => {
    return checkoutLocale['promoCode.applied'].replace('{code}', appliedPromo);
  }, [checkoutLocale, appliedPromo]);

  const discountPercentageText = useMemo(() => {
    return checkoutLocale['promoCode.saving'].replace(
      '{percentage}',
      discountPercentage.toString()
    );
  }, [checkoutLocale, discountPercentage]);

  return (
    <Card className="bg-green-50 border border-green-200" padding="sm">
      <div className="flex justify-between items-center">
        <p className="font-medium text-green-800">{appliedPromoText}</p>
        <p className="text-sm text-green-600">{discountPercentageText}</p>
        <Button
          size="sm"
          variant="danger"
          onClick={handleRemovePromo}
          ariaLabel={checkoutLocale['promoCode.remove']}
        >
          {checkoutLocale['promoCode.remove']}
        </Button>
      </div>
    </Card>
  );
}
