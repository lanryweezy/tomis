'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorSwatchProps {
  colors: Array<{ name: string; code: string; slug: string }>;
  selected: string;
  onSelect: (slug: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function ColorSwatch({ colors, selected, onSelect, size = 'md' }: ColorSwatchProps) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex gap-3">
      {colors.map(color => (
        <button
          key={color.slug}
          onClick={() => onSelect(color.slug)}
          className={`${sizeStyles[size]} rounded-full border-2 transition-all duration-200 relative ${
            selected === color.slug
              ? 'border-[var(--color-neutral-ink)] scale-110'
              : 'border-transparent hover:border-[var(--color-neutral-gray-300)]'
          }`}
          style={{ backgroundColor: color.code }}
          aria-label={color.name}
        >
          {selected === color.slug && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[var(--color-neutral-ink)]"
              layoutId="colorRing"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

interface SizeSelectorProps {
  sizes: Array<{ label: string; value: string; inStock: boolean }>;
  selected: string | null;
  onSelect: (value: string) => void;
}

export function SizeSelector({ sizes, selected, onSelect }: SizeSelectorProps) {
  return (
    <div className="flex gap-2">
      {sizes.map(size => (
        <button
          key={size.value}
          disabled={!size.inStock}
          onClick={() => onSelect(size.value)}
          className={`w-12 h-12 border text-sm font-medium transition-all ${
            selected === size.value
              ? 'border-[var(--color-neutral-ink)] bg-[var(--color-neutral-ink)] text-white'
              : size.inStock
                ? 'border-[var(--color-neutral-gray-200)] hover:border-[var(--color-neutral-ink)]'
                : 'border-[var(--color-neutral-gray-200)] text-[var(--color-neutral-gray-300)] cursor-not-allowed line-through'
          }`}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  return (
    <details className="group border-b border-[var(--color-neutral-gray-200)]" open={defaultOpen}>
      <summary className="flex items-center justify-between py-4 cursor-pointer text-sm font-medium text-[var(--color-neutral-ink)]">
        {title}
        <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="pb-4 text-[var(--color-neutral-gray-600)]">
        {children}
      </div>
    </details>
  );
}

interface BadgeProps {
  variant?: 'default' | 'new' | 'bestseller' | 'sale' | 'coming-soon';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const variants = {
    default: 'bg-[var(--color-neutral-gray-100)] text-[var(--color-neutral-gray-700)]',
    new: 'bg-[var(--color-brand-blue)] text-white',
    bestseller: 'bg-[var(--color-neutral-ink)] text-white',
    sale: 'bg-[var(--color-fashion-burgundy)] text-white',
    'coming-soon': 'bg-[var(--color-neutral-gray-200)] text-[var(--color-neutral-gray-600)]',
  };

  return (
    <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium tracking-widest uppercase ${variants[variant]}`}>
      {children}
    </span>
  );
}

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs text-[var(--color-neutral-gray-500)]">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span>/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-[var(--color-neutral-ink)] transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-[var(--color-neutral-ink)]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  const icons = {
    success: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>,
    error: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" /></svg>,
    info: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 right-6 z-[var(--z-toast)] flex items-center gap-3 px-4 py-3 bg-[var(--color-neutral-ink)] text-white shadow-lg"
    >
      {icons[type]}
      <span className="text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </motion.div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)]">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 border text-sm bg-white focus:outline-none focus:border-[var(--color-neutral-ink)] transition-colors ${
          error ? 'border-red-500' : 'border-[var(--color-neutral-gray-200)]'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ label: string; value: string }>;
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-neutral-gray-500)]">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 border border-[var(--color-neutral-gray-200)] text-sm bg-white focus:outline-none focus:border-[var(--color-neutral-ink)] transition-colors ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <motion.div
        className="relative bg-white p-6 md:p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          {title && <h2 className="text-lg font-medium">{title}</h2>}
          <button onClick={onClose} className="text-[var(--color-neutral-gray-400)] hover:text-[var(--color-neutral-ink)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center border border-[var(--color-neutral-gray-200)] text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--color-neutral-ink)] transition-colors"
      >
        ←
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center border text-sm transition-colors ${
            currentPage === page
              ? 'border-[var(--color-neutral-ink)] bg-[var(--color-neutral-ink)] text-white'
              : 'border-[var(--color-neutral-gray-200)] hover:border-[var(--color-neutral-ink)]'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center border border-[var(--color-neutral-gray-200)] text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--color-neutral-ink)] transition-colors"
      >
        →
      </button>
    </div>
  );
}
