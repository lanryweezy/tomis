'use client';
import { motion } from 'framer-motion';

interface SizeSelectorProps {
  sizes: Array<{ label: string; value: string; inStock: boolean }>;
  selected: string | null;
  onSelect: (value: string) => void;
}

export default function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {sizes.map(s => (
        <motion.button
          key={s.value}
          whileHover={{ scale: s.inStock ? 1.05 : 1 }}
          whileTap={{ scale: s.inStock ? 0.95 : 1 }}
          onClick={() => s.inStock && onSelect(s.value)}
          disabled={!s.inStock}
          title={!s.inStock ? "Out of stock" : undefined}
          aria-label={`${s.label}${!s.inStock ? ' (Out of stock)' : ''}`}
          aria-pressed={selected === s.value}
          style={{
            width: '3rem', height: '3rem', border: '1px solid',
            borderColor: selected === s.value ? 'var(--text-primary)' : 'var(--border-strong)',
            backgroundColor: selected === s.value ? 'var(--text-primary)' : 'transparent',
            color: selected === s.value ? 'var(--bg)' : 'var(--text-primary)',
            fontSize: '0.8rem', fontWeight: 500, cursor: s.inStock ? 'pointer' : 'not-allowed',
            opacity: s.inStock ? 1 : 0.3,
            textDecoration: s.inStock ? 'none' : 'line-through',
            transition: 'all 0.2s',
          }}
        >
          {s.label}
        </motion.button>
      ))}
    </div>
  );
}
