'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

interface ProductImage {
  id: string;
  src: string;
  alt: string;
  type: string;
}

interface ProductCardProps {
  name: string;
  color: string;
  price: number;
  images: ProductImage[];
  slug: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export function ProductCard({ name, color, price, images, slug, isNew, isBestSeller }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const productImage = images.find(i => i.type === 'product');
  const modelImage = images.find(i => i.type === 'model');

  const formatPrice = (p: number) => `₦${p.toLocaleString('en-NG')}`;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  // Handle keyboard navigation for wishlist button
  const handleWishlistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsWishlisted(!isWishlisted);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={`/products/${slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-blue)] focus-visible:ring-offset-2">
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-neutral-gray-50)]">
          {/* Product Image */}
          <AnimatePresence mode="wait">
            {isHovered && modelImage ? (
              <motion.img
                key="model"
                src={modelImage.src}
                alt={modelImage.alt}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                loading="lazy"
              />
            ) : (
              <motion.img
                key="product"
                src={productImage?.src || images[0]?.src}
                alt={productImage?.alt || images[0]?.alt}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
            )}
          </AnimatePresence>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isNew && (
              <span className="px-2 py-1 bg-[var(--color-brand-blue)] text-white text-[10px] font-medium tracking-widest uppercase">
                NEW
              </span>
            )}
            {isBestSeller && (
              <span className="px-2 py-1 bg-[var(--color-neutral-ink)] text-white text-[10px] font-medium tracking-widest uppercase">
                BEST SELLER
              </span>
            )}
          </div>

          {/* Wishlist - Improved touch target and accessibility */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            onKeyDown={handleWishlistKeyDown}
            className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)]"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={isWishlisted}
            tabIndex={0}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isWishlisted ? 'var(--color-brand-blue)' : 'none'}
              stroke={isWishlisted ? 'var(--color-brand-blue)' : 'currentColor'}
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Quick Add - Always visible on mobile, hover on desktop */}
          <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 md:translate-y-0">
            <Button 
              variant="primary" 
              fullWidth 
              size="sm"
              onClick={handleQuickAdd}
              isLoading={isLoading}
              aria-label={`Add ${name} to cart`}
            >
              {isLoading ? 'ADDING...' : 'QUICK ADD'}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-3 space-y-1">
          <p className="text-[10px] font-medium tracking-widest uppercase text-[var(--color-neutral-gray-500)]">
            {color}
          </p>
          <h3 className="text-sm font-medium text-[var(--color-neutral-ink)] tracking-wide uppercase">
            {name}
          </h3>
          <p className="text-sm font-medium text-[var(--color-neutral-ink)]">
            {formatPrice(price)}
          </p>
        </div>
      </a>
    </motion.div>
  );
}
