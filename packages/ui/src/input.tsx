import { forwardRef, useState, useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    required = false,
    className = '',
    id: providedId,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = providedId || generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const hasError = !!error;
  const describedBy = [
    error && errorId,
    hint && hintId,
    ariaDescribedBy,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label 
          htmlFor={id}
          className={`block text-[10px] font-medium tracking-[0.2em] uppercase ${
            hasError ? 'text-red-600' : 'text-[var(--color-neutral-gray-500)]'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-gray-400)] pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          className={`
            w-full px-4 py-3 border text-sm bg-white transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:bg-[var(--color-neutral-gray-50)] disabled:cursor-not-allowed
            min-h-[44px]
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${hasError 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-[var(--color-neutral-gray-200)] focus:border-[var(--color-neutral-ink)] focus:ring-[var(--color-brand-blue)]/20'
            }
            ${className}
          `}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          aria-required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-gray-400)]">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p id={errorId} className="text-xs text-red-500 flex items-center gap-1" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p id={hintId} className="text-xs text-[var(--color-neutral-gray-400)]">
          {hint}
        </p>
      )}
    </div>
  );
});

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    label,
    error,
    hint,
    required = false,
    className = '',
    id: providedId,
    rows = 4,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = providedId || generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  
  const hasError = !!error;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label 
          htmlFor={id}
          className={`block text-[10px] font-medium tracking-[0.2em] uppercase ${
            hasError ? 'text-red-600' : 'text-[var(--color-neutral-gray-500)]'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`
          w-full px-4 py-3 border text-sm bg-white transition-colors duration-200 resize-y
          focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:bg-[var(--color-neutral-gray-50)] disabled:cursor-not-allowed
          min-h-[44px]
          ${hasError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-[var(--color-neutral-gray-200)] focus:border-[var(--color-neutral-ink)] focus:ring-[var(--color-brand-blue)]/20'
          }
          ${className}
        `}
        aria-invalid={hasError}
        aria-describedby={[error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined}
        aria-required={required}
        {...props}
      />
      
      {error && (
        <p id={errorId} className="text-xs text-red-500 flex items-center gap-1" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p id={hintId} className="text-xs text-[var(--color-neutral-gray-400)]">
          {hint}
        </p>
      )}
    </div>
  );
});
