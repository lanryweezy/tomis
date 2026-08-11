'use client';
import { motion } from 'framer-motion';

interface ColorSwatchProps {
  colors: Array<{ name: string; code: string; slug: string }>;
  selected: string;
  onSelect: (slug: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function ColorSwatch({ colors, selected, onSelect, size = 'md' }: ColorSwatchProps) {
  const sizes = { sm: '1.5rem', md: '2rem', lg: '2.5rem' };
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {colors.map(c => (
        <motion.button
          key={c.slug}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(c.slug)}
          style={{
            width: sizes[size], height: sizes[size], borderRadius: '50%',
            backgroundColor: c.code, border: selected === c.slug ? '2px solid var(--text-primary)' : '2px solid var(--border-strong)',
            cursor: 'pointer', transition: 'border-color 0.2s',
          }}
          aria-label={c.name}
          aria-pressed={selected === c.slug}
        />
      ))}
    </div>
  );
}
