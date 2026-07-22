export const typography = {
  fontFamily: {
    sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
    serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
    display: ['var(--font-dm-serif)', 'DM Serif Display', 'Georgia', 'serif'],
  },
  fontSize: {
    '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.05em' }],
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
    xl: ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
    '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
    '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
    '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
    '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    none: '1',
    tight: '1.15',
    snug: '1.3',
    normal: '1.5',
    relaxed: '1.65',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type TypographyToken = typeof typography;
