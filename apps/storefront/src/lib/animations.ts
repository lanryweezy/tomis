export const fadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' } as const,
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

export const slideInLeft = {
  initial: { x: '-100%' },
  whileInView: { x: 0 },
  viewport: { once: true } as const,
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};

export const slideInRight = {
  initial: { x: '100%' },
  whileInView: { x: 0 },
  viewport: { once: true } as const,
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
};
