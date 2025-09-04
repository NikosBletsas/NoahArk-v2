import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Theme } from '@/types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  theme: Theme;
  isMidnightTheme: boolean;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  theme,
  isMidnightTheme,
  isLoading = false
}) => {
  const handleClose = onClose || onCancel;
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className={`${theme.card} backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 w-full max-w-md`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-4 rounded-t-xl flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className={`p-1 rounded-md hover:bg-white/20 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className={`${theme.textPrimary} text-base leading-relaxed mb-6`}>
            {message}
          </p>

          {/* Actions */}
          <div className="flex space-x-3 justify-end">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isMidnightTheme 
                  ? 'bg-white/10 text-gray-300 border border-gray-600 hover:bg-white/20' 
                  : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-medium bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
            >
              {isLoading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              <span>{isLoading ? 'Submitting...' : confirmText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;