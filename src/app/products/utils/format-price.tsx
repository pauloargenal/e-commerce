export const formatPrice = (value: number): string => {
  const formattedValue = value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return `$${formattedValue}`;
};
