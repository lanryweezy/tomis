export const colors = {
  brand: {
    navy: '#0B1F5E',
    blue: '#1647B8',
    electric: '#285DFF',
  },
  neutral: {
    ink: '#101114',
    paper: '#F7F7F4',
    cloud: '#ECEDEA',
    white: '#FFFFFF',
    'gray-50': '#FAFAF9',
    'gray-100': '#F5F5F4',
    'gray-200': '#E7E5E4',
    'gray-300': '#D6D3D1',
    'gray-400': '#A8A29E',
    'gray-500': '#78716C',
    'gray-600': '#57534E',
    'gray-700': '#44403C',
    'gray-800': '#292524',
    'gray-900': '#1C1917',
  },
  fashion: {
    sand: '#D8C7AF',
    olive: '#7A8065',
    burgundy: '#642C35',
    terracotta: '#C67B5C',
    dustyPink: '#D4A5A5',
    lavender: '#B8A9C9',
    cream: '#F5F0E8',
    stone: '#C4B8A8',
    sage: '#9CAF88',
  },
} as const;

export type ColorToken = typeof colors;
