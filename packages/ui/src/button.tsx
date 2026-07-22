export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[var(--color-brand-blue)] text-white hover:bg-[var(--color-brand-navy)] active:scale-[0.98]',
    secondary: 'border border-[var(--color-neutral-gray-300)] text-[var(--color-neutral-ink)] bg-transparent hover:border-[var(--color-neutral-ink)] hover:bg-[var(--color-neutral-ink)] hover:text-white',
    ghost: 'bg-transparent text-[var(--color-neutral-ink)] hover:bg-[var(--color-neutral-gray-100)]',
    text: 'bg-transparent text-[var(--color-neutral-ink)] underline underline-offset-4 hover:text-[var(--color-brand-blue)]',
  };

  const sizeStyles = {
    sm: 'h-9 px-4 text-xs tracking-wide',
    md: 'h-11 px-6 text-sm tracking-wide',
    lg: 'h-13 px-8 text-sm tracking-wider',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
}
