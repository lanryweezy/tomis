'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface ColorSwatchProps {
  colors: Array<{ name: string; code: string; slug: string }>;
  selected: string;
  onSelect: (slug: string) => void;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(function ColorSwatch(
  { colors, selected, onSelect, size = 'md', 'aria-label': ariaLabel },
  ref
) {
  const sizes = { 
    sm: 'w-8 h-8', 
    md: 'w-10 h-10', 
    lg: 'w-12 h-12' 
  };

  const handleKeyDown = (e: React.KeyboardEvent, slug: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(slug);
    }
  };

  return (
    <div 
      ref={ref}
      className="flex gap-3 flex-wrap" 
      role="radiogroup" 
      aria-label={ariaLabel || 'Color selection'}
    >
      {colors.map(color => (
        <motion.button
          key={color.slug}
          role="radio"
          aria-checked={selected === color.slug}
          aria-label={color.name}
          onClick={() => onSelect(color.slug)}
          onKeyDown={(e) => handleKeyDown(e, color.slug)}
          tabIndex={0}
          className={`
            ${sizes[size]} rounded-full border-2 transition-all duration-200 relative
            focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:ring-offset-2
            ${selected === color.slug
              ? 'border-[var(--color-neutral-ink)] scale-110'
              : 'border-transparent hover:border-[var(--color-neutral-gray-300)]'
            }
          `}
          style={{ backgroundColor: color.code }}
          whileHover={{ scale: selected === color.slug ? 1.1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {selected === color.slug && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[var(--color-neutral-ink)]"
              layoutId="colorRing"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              aria-hidden="true"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
});
