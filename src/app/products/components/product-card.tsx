import { useMemo, useState } from 'react';

import { Product } from '../../../types/product';
import { useAppDispatch } from '../../../store/hooks';
import { addToCart } from '../../../store/slices/cart-slice';
import { Card } from '../../../components/card';
import { Button } from '../../../components/button';
import { Select } from '../../../components/select';

interface ProductCardProps {
  product: Product;
  productCardLocale: Record<string, string>;
}

export function ProductCard({ product, productCardLocale }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.availableColors[0]);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        size: selectedSize,
        color: selectedColor
      })
    );

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const productPrice = `$${product.price.toFixed(2)}`;

  const truncatedDescription = useMemo(() => {
    const maxLength = 50;
    if (product.description.length <= maxLength) {
      return product.description;
    }
    return `${product.description.substring(0, maxLength)}...`;
  }, [product.description]);

  const truncatedName = useMemo(() => {
    const maxLength = 60;
    if (product.name.length <= maxLength) {
      return product.name;
    }
    return `${product.name.substring(0, maxLength)}...`;
  }, [product.name]);
  const addToCartText = useMemo(() => {
    return addedToCart ? productCardLocale.added : productCardLocale.addToCart;
  }, [addedToCart, productCardLocale]);

  return (
    <Card className="flex flex-col h-full w-full ">
      <div className="relative w-full h-48 mb-4 bg-gray-200 rounded-lg overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 bg-green-70 text-white px-2 py-1 rounded text-xs font-semibold">
          {product.category}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        <div className="my-4 h-40 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{truncatedName}</h3>
          <p className="text-sm text-gray-600 py-4">{truncatedDescription}</p>
        </div>

        <div className="flex flex-col mt-4 gap-2">
          <p className="text-2xl font-bold text-blue-600 ">{productPrice}</p>
          <Select
            label={productCardLocale.size}
            fullWidth
            value={selectedSize}
            onChange={(value) => setSelectedSize(value)}
            options={product.availableSizes.map((size) => ({ value: size, label: size }))}
          />

          <Select
            label={productCardLocale.color}
            fullWidth
            value={selectedColor}
            onChange={(value) => setSelectedColor(value)}
            options={product.availableColors.map((color) => ({ value: color, label: color }))}
          />
        </div>

        <Button fullWidth onClick={handleAddToCart} variant="primary">
          {addToCartText}
        </Button>
      </div>
    </Card>
  );
}
