import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import {ClearWarningModalProps, ClearButtonProps} from '../../types';


const ClearWarningModal: React.FC<ClearWarningModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  sectionName, 
  theme 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${theme.card} backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 max-w-md w-full p-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme.textPrimary}`}>
          Clear Form Section
        </h3>
        <p className={`text-sm ${theme.textSecondary} mb-6`}>
          Are you sure you want to clear all data in the <strong>"{sectionName}"</strong> section? This action cannot be undone.
        </p>
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Clear Section
          </button>
        </div>
      </div>
    </div>
  );
};

const ClearButton: React.FC<ClearButtonProps> = ({
  theme,
  isMidnightTheme = false,
  isVisible,
  sectionName,
  onClear,
  position = 'header',
  size = 'xs'
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClearRequest = () => {
    setShowModal(true);
  };

  const handleConfirmClear = () => {
    onClear();
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Size variants
  const sizeClasses = {
    xs: 'px-2 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5'
  };

  // Position variants
  const positionClasses = {
    header: 'inline-flex items-center space-x-1.5',
    floating: 'fixed top-4 right-4 z-40 inline-flex items-center space-x-1.5 shadow-lg'
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <>
      <button
        onClick={handleClearRequest}
        className={`
          ${positionClasses[position]}
          ${sizeClasses[size]}
          bg-red-500 hover:bg-red-600 text-white rounded-lg 
          hover:scale-105 transition-all duration-200
          ${position === 'floating' ? 'shadow-lg' : ''}
        `}
        title={`Clear ${sectionName}`}
      >
        <RotateCcw className={iconSizes[size]} />
        <span>Clear</span>
      </button>

      <ClearWarningModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmClear}
        sectionName={sectionName}
        theme={theme}
      />
    </>
  );
};

export default ClearButton;