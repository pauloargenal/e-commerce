import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, children, title, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <button
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
          type="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              onClose();
            }
          }}
          aria-label={title}
        />

        <div
          className={`relative bg-white rounded-lg shadow-xl w-full ${sizeStyles[size]} max-h-[90vh] overflow-y-auto`}
        >
          {title && (
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={title}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
