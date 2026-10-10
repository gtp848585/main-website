import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 pt-16">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl animate-scale-in mb-16">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 bg-white dark:bg-gray-900 rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto scrollbar-thin">
          {children}
        </div>
      </div>
    </div>
  );
}
