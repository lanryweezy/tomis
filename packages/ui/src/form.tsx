'use client';

import { forwardRef, useState, useCallback } from 'react';
import { Button } from './button';
import { Input, TextArea } from './input';

export interface FormFieldProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (data: Record<string, string>) => Promise<void>;
  children: React.ReactNode;
  submitButtonLabel?: string;
  isSubmitting?: boolean;
}

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  validate?: (value: string) => string | null;
}

interface FieldState {
  value: string;
  error: string | null;
  touched: boolean;
}

export function useFormValidation<T extends Record<string, ValidationRule>>(
  rules: T,
  initialData: Partial<Record<keyof T, string>> = {}
) {
  const [fields, setFields] = useState<Record<keyof T, FieldState>>(() => {
    const initial: Record<keyof T, FieldState> = {} as Record<keyof T, FieldState>;
    for (const key of Object.keys(rules) as Array<keyof T>) {
      initial[key] = {
        value: initialData[key] || '',
        error: null,
        touched: false,
      };
    }
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = useCallback((fieldName: keyof T, value: string): string | null => {
    const rule = rules[fieldName];
    if (!rule) return null;

    if (rule.required && !value.trim()) {
      return `${String(fieldName)} is required`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${String(fieldName)} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `${String(fieldName)} must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.patternMessage || `${String(fieldName)} is invalid`;
    }

    if (rule.validate) {
      return rule.validate(value);
    }

    return null;
  }, [rules]);

  const updateField = useCallback((fieldName: keyof T, value: string) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        error: validateField(fieldName, value),
      },
    }));
  }, [validateField]);

  const setTouched = useCallback((fieldName: keyof T) => {
    setFields(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        touched: true,
      },
    }));
  }, []);

  const validateAll = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    for (const fieldName of Object.keys(rules) as Array<keyof T>) {
      const field = fields[fieldName];
      const error = validateField(fieldName, field.value);
      
      setFields(prev => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          touched: true,
          error,
        },
      }));

      if (error) {
        newErrors[String(fieldName)] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [rules, fields, validateField]);

  const reset = useCallback(() => {
    const initial: Record<keyof T, FieldState> = {} as Record<keyof T, FieldState>;
    for (const key of Object.keys(rules) as Array<keyof T>) {
      initial[key] = {
        value: initialData[key] || '',
        error: null,
        touched: false,
      };
    }
    setFields(initial);
    setErrors({});
  }, [rules, initialData]);

  const getFieldProps = (fieldName: keyof T) => ({
    value: fields[fieldName].value,
    error: fields[fieldName].touched ? (fields[fieldName].error || undefined) : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      updateField(fieldName, e.target.value);
    },
    onBlur: () => setTouched(fieldName),
  });

  return {
    fields,
    errors,
    updateField,
    validateAll,
    reset,
    getFieldProps,
    isValid: Object.values(errors).length === 0,
  };
}

export function Form({ onSubmit, children, submitButtonLabel = 'Submit', isSubmitting = false, ...props }: FormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} {...props} noValidate>
      <div className="space-y-4">{children}</div>
      <div className="mt-6">
        <Button 
          type="submit" 
          variant="primary" 
          fullWidth 
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {submitButtonLabel}
        </Button>
      </div>
    </form>
  );
}

interface FormFieldGroupProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export function FormFieldGroup({ label, error, children }: FormFieldGroupProps) {
  return (
    <div className="space-y-1.5">
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  placeholder?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, placeholder, required = false, className = '', id: providedId, ...props },
  ref
) {
  const generatedId = useId();
  const id = providedId || generatedId;
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
      
      <select
        ref={ref}
        id={id}
        className={`
          w-full px-4 py-3 border text-sm bg-white transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:bg-[var(--color-neutral-gray-50)] disabled:cursor-not-allowed
          min-h-[44px] appearance-none cursor-pointer
          ${hasError 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-[var(--color-neutral-gray-200)] focus:border-[var(--color-neutral-ink)] focus:ring-[var(--color-brand-blue)]/20'
          }
          ${className}
        `}
        aria-invalid={hasError}
        aria-required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1" role="alert">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

// Helper to import useId
function useId() {
  const [id] = useState(() => `field-${Math.random().toString(36).substr(2, 9)}`);
  return id;
}
