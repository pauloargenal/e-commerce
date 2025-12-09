'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  Package,
  Minus,
  Plus
} from 'lucide-react';

import { Product } from '../../../types/product';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart } from '../../../store/slices/cart-slice';
import { Button } from '../../../components/button';

interface ProductDetailProps {
  product: Product;
  locales: Record<string, any>;
}

export function ProductDetail({ product, locales }: ProductDetailProps) {
  const dispatch = useAppDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.product.id === product.id);

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;
  const savings = product.price - discountedPrice;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart({ product }));
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stock, quantity + delta));
    setQuantity(newQuantity);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
            }`}
          />
        ))}
        <span className="ml-2 text-slate-600 font-medium">{rating.toFixed(1)}</span>
        <span className="text-slate-400">({product.reviews?.length || 0} reviews)</span>
      </div>
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden shadow-lg">
          <img
            src={product.images[selectedImageIndex]}
            alt={product.title}
            className="w-full h-full object-contain p-8"
          />

          {/* Navigation Arrows */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
              Save {Math.round(product.discountPercentage)}%
            </div>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? 'border-indigo-500 shadow-lg shadow-indigo-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Category & Brand */}
        <div className="flex items-center gap-3">
          <Link
            href={`/products?category=${product.category}`}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full hover:bg-indigo-200 transition-colors capitalize"
          >
            {product.category}
          </Link>
          {product.brand && (
            <span className="text-slate-500 text-sm font-medium">{product.brand}</span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
          {product.title}
        </h1>

        {/* Rating */}
        {renderStars(product.rating)}

        {/* Price */}
        <div className="py-6 border-y border-slate-100">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-bold text-indigo-600">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-xl text-slate-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded">
                  Save ${savings.toFixed(2)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Stock Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Package
              className={`w-5 h-5 ${product.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}
            />
            <span
              className={`font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-red-600'}`}
            >
              {product.availabilityStatus}
            </span>
          </div>
          {product.stock > 0 && product.stock < 20 && (
            <span className="text-amber-600 text-sm">Only {product.stock} left in stock</span>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              className="w-12 h-12 flex items-center justify-center hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || addedToCart}
            className={`flex-1 h-12 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
              addedToCart
                ? 'bg-emerald-500 hover:bg-emerald-500'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            variant="primary"
          >
            {addedToCart ? (
              <>
                <Check className="w-5 h-5" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </Button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
              isLiked
                ? 'bg-rose-500 border-rose-500 text-white'
                : 'border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Cart Status */}
        {itemInCart && (
          <p className="text-sm text-slate-500">
            You have {itemInCart.quantity} of this item in your cart
          </p>
        )}

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Truck className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900 text-sm">Free Shipping</p>
              <p className="text-xs text-slate-500">{product.shippingInformation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Shield className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900 text-sm">Warranty</p>
              <p className="text-xs text-slate-500">{product.warrantyInformation}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <RotateCcw className="w-6 h-6 text-indigo-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900 text-sm">Returns</p>
              <p className="text-xs text-slate-500">{product.returnPolicy}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="pt-8 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Customer Reviews</h3>
            <div className="space-y-4">
              {product.reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{review.reviewerName}</p>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= review.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
