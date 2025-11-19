import { InputHTMLAttributes, forwardRef, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', ...props }, ref) => {
    const generatedId = useId();
    const widthStyles = fullWidth ? 'w-full' : '';
    const inputId = props.id || generatedId;

    return (
      <div className={`${widthStyles}`}>
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label || ''}
          <input
            ref={ref}
            autoComplete="off"
            id={inputId}
            className={`
            px-4 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-60' : 'border-gray-300'}
            ${widthStyles}
            ${className}
          `}
            {...props}
          />
        </label>
        {error && <p className="mt-1 text-sm text-red-60">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
