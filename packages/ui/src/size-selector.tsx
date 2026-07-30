'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface SizeOption {
  label: string;
  value: string;
  inStock: boolean;
}

export interface SizeSelectorProps {
  sizes: SizeOption[];
  selected: string | null;
  onSelect: (value: string) => void;
  'aria-label'?: string;
}

export const SizeSelector = forwardRef<HTMLDivElement, SizeSelectorProps>(function SizeSelector(
  { sizes, selected, onSelect, 'aria-label': ariaLabel },
  ref
) {
  const handleKeyDown = (e: React.KeyboardEvent, value: string, inStock: boolean) => {
    if (!inStock) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(value);
    }
  };

  return (
    <div 
      ref={ref}
      className="flex gap-2 flex-wrap" 
      role="radiogroup" 
      aria-label={ariaLabel || 'Size selection'}
    >
      {sizes.map(size => (
        <motion.button
          key={size.value}
          role="radio"
          aria-checked={selected === size.value}
          aria-disabled={!size.inStock}
          onClick={() => size.inStock && onSelect(size.value)}
          onKeyDown={(e) => handleKeyDown(e, size.value, size.inStock)}
          tabIndex={size.inStock ? 0 : -1}
          disabled={!size.inStock}
          className={`
            w-12 h-12 min-w-[48px] min-h-[48px] border text-sm font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:ring-offset-2
            ${selected === size.value
              ? 'border-[var(--color-neutral-ink)] bg-[var(--color-neutral-ink)] text-white'
              : size.inStock
                ? 'border-[var(--color-neutral-gray-200)] hover:border-[var(--color-neutral-ink)] bg-white'
                : 'border-[var(--color-neutral-gray-200)] text-[var(--color-neutral-gray-300)] cursor-not-allowed line-through bg-[var(--color-neutral-gray-50)]'
            }
          `}
          whileHover={size.inStock ? { scale: 1.05 } : {}}
          whileTap={size.inStock ? { scale: 0.95 } : {}}
        >
          {size.label}
        </motion.button>
      ))}
    </div>
  );
});
