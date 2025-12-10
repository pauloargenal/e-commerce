'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';

import { Product } from '../../../types/product';
import { useAppDispatch } from '../../../store/hooks';
import { addToCart } from '../../../store/slices/cart-slice';
import { Button } from '../../../components';
import { formatPrice } from '../utils/format-price';

interface ProductCardProps {
  product: Product;
  index?: number;
  productCardLocale: Record<string, string>;
}

export function ProductCard({ product, index = 0, productCardLocale }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  const discountPercentage = Math.round(product.discountPercentage);
  const discountText = `-${discountPercentage}%`;
  const stockText = `Only ${product.stock} left`;
  const addToCartText = addedToCart ? productCardLocale.added : productCardLocale.addToCart;
  const likeText = isLiked ? 'Liked!' : 'Like';
  const priceText = formatPrice(discountedPrice);
  const priceTextWithDiscount = formatPrice(product.price);
  const viewDetailsText = productCardLocale.view;

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    dispatch(addToCart({ product }));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleLike = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 hover:border-indigo-100 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          />

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
              {discountText}
            </div>
          )}

          {/* Stock Badge */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
              {stockText}
            </div>
          )}

          {/* Action Buttons */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4 gap-2 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addedToCart}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                addedToCart
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-slate-900 hover:bg-indigo-600 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {addToCartText}
            </button>
            <button
              type="button"
              onClick={handleLike}
              className={`p-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 ${
                isLiked
                  ? 'bg-rose-500 text-white'
                  : 'bg-white text-slate-900 hover:bg-rose-500 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              {likeText}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Category */}
          <div className="mb-2">
            <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full capitalize">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-slate-900 mb-2 truncate group-hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>

          {/* Brand */}
          <p className="text-xs text-slate-500 mb-2 h-4">{product.brand || '\u00A0'}</p>

          {/* Rating */}
          <div className="mb-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(product.rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
              <span className="ml-1.5 text-xs text-slate-500">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-indigo-600">{priceText}</span>
              {hasDiscount && (
                <span className="text-sm text-slate-400 line-through">{priceTextWithDiscount}</span>
              )}
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 group-hover:text-indigo-600 transition-colors">
              <Eye className="w-4 h-4" />
              {viewDetailsText}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
