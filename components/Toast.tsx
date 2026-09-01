import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white text-gray-900 border border-gray-200 shadow-lg text-xs sm:text-sm font-medium animate-fadeIn">
      {type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
      )}
      <p className="text-gray-800">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 text-gray-400 hover:text-gray-700 transition-colors p-0.5 cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
