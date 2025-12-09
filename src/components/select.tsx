import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SelectProps {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

export const Select = ({
  label,
  error,
  fullWidth = false,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  name
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const widthStyles = fullWidth ? 'w-full' : '';
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectOptionClass = selectedOption ? 'text-gray-900' : 'text-gray-400';
  const selectTextContent = selectedOption ? selectedOption.label : placeholder;
  return (
    <div className={`${widthStyles}`} ref={dropdownRef}>
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label={label || placeholder}
          className={`
            px-4 py-2 pr-10 border rounded-lg bg-white text-left
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${widthStyles}
            ${className}
          `}
        >
          <span className={selectOptionClass}>{selectTextContent}</span>
        </button>
        <ChevronDown
          className={`
            w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500
            transition-transform duration-200
            ${isOpen ? 'rotate-180' : ''}
          `}
        />

        {isOpen && (
          <div
            className={`
              absolute z-50 mt-1 border border-gray-300 rounded-lg bg-white shadow-lg
              max-h-60 overflow-auto
              ${widthStyles}
            `}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-4 py-2 text-left text-gray-900 bg-white
                  hover:bg-gray-100 transition-colors
                  ${selectedValue === option.value ? 'bg-gray-100 font-medium' : ''}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {name && <input type="hidden" name={name} value={selectedValue} />}
    </div>
  );
};
