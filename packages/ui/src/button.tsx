import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  'aria-label'?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    children,
    fullWidth = false,
    icon,
    iconPosition = 'right',
    isLoading = false,
    className = '',
    disabled,
    'aria-label': ariaLabel,
    ...props
  },
  ref
) {
  // Minimum touch target size for accessibility (44x44px per WCAG)
  const minTouchTarget = 'min-h-[44px] min-w-[44px]';
  
  const baseStyles = `inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-blue)] focus:ring-offset-2 ${minTouchTarget}`;
  
  const variantStyles = {
    primary: 'bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-navy)] active:scale-[0.98]',
    secondary: 'border border-[var(--color-neutral-gray-300)] text-[var(--color-neutral-ink)] bg-transparent hover:border-[var(--color-neutral-ink)] hover:bg-[var(--color-neutral-ink)] hover:text-white',
    ghost: 'bg-transparent text-[var(--color-neutral-ink)] hover:bg-[var(--color-neutral-gray-100)]',
    text: 'bg-transparent text-[var(--color-neutral-ink)] underline underline-offset-4 hover:text-[var(--color-brand-blue)]',
  };
  
  const sizeStyles = {
    sm: 'h-11 px-4 text-xs tracking-wide',
    md: 'h-12 px-6 text-sm tracking-wide',
    lg: 'h-14 px-8 text-sm tracking-wider',
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  const isDisabled = disabled || isLoading;
  
  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      disabled={isDisabled}
      aria-label={ariaLabel || (isLoading ? 'Loading' : undefined)}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && icon && iconPosition === 'left' && <span className="mr-2" aria-hidden="true">{icon}</span>}
      {!isLoading && children}
      {!isLoading && icon && iconPosition === 'right' && <span className="ml-2" aria-hidden="true">{icon}</span>}
    </button>
  );
});
