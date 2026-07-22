export const motion = {
  duration: {
    instant: '50ms',
    fast: '100ms',
    normal: '200ms',
    moderate: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  split: {
    leftToRight: {
      initial: { x: '-100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    rightToLeft: {
      initial: { x: '100%', opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    topToBottom: {
      initial: { y: '-100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    bottomToTop: {
      initial: { y: '100%', opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
  },
} as const;

export const transitions = {
  colors: 'color var(--duration-normal) var(--easing-default), background-color var(--duration-normal) var(--easing-default), border-color var(--duration-normal) var(--easing-default)',
  opacity: 'opacity var(--duration-normal) var(--easing-default)',
  transform: 'transform var(--duration-normal) var(--easing-default)',
  all: 'all var(--duration-normal) var(--easing-default)',
} as const;
