import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import {ClearWarningModalProps, ClearButtonProps} from "@/types";

const ClearWarningModal: React.FC<ClearWarningModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  sectionName, 
  theme 
}) => {
  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    // Full-screen backdrop with blur effect
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

// Main ClearButton component with smart form data detection
const ClearButton: React.FC<ClearButtonProps> = ({
  theme,
  isVisible, 
  sectionName,
  onClear,
  position = 'header',
  size = 'xs'
}) => {
 
  const [showModal, setShowModal] = useState(false)
  const [actuallyHasData, setActuallyHasData] = useState(false);

  const checkFormData = () => {
    
    const formContainer = document.querySelector('[data-form-section="true"], .form-section, .diagnosis-form');
    if (!formContainer) {
      const inputs = document.querySelectorAll('input, select, textarea');
      
      for (const input of inputs) {
        const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
        
        if (!element.offsetParent || element.disabled) continue;
      
        switch (element.type) {
          case 'checkbox':
          case 'radio':   
            if ((element as HTMLInputElement).checked) {
              return true;
            }
            break;
          case 'text':
          case 'email':
          case 'number':
          case 'tel':
          case 'url':
          case 'password':
            if (element.value.trim() !== '') {
              return true;
            }
            break;
          case 'select-one':
          case 'select-multiple':

            const select = element as HTMLSelectElement;
            if (select.selectedIndex > 0 || (select.value && select.value !== '' && select.value !== select.options[0]?.value)) {
              return true;
            }
            break;
          default:

            if (element.tagName === 'TEXTAREA' && element.value.trim() !== '') {
              return true;
            }
            if (element.value && element.value.trim() !== '') {
              return true;
            }
            break;
        }
      }
      return false;
    }
    const inputs = formContainer.querySelectorAll('input, select, textarea');
    
    for (const input of inputs) {
      const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    
      switch (element.type) {
        case 'checkbox':
        case 'radio':
          if ((element as HTMLInputElement).checked) {
            return true;
          }
          break;
        case 'text':
        case 'email':
        case 'number':
        case 'tel':
        case 'url':
        case 'password':
          if (element.value.trim() !== '') {
            return true;
          }
          break;
        case 'select-one':
        case 'select-multiple':
          const select = element as HTMLSelectElement;
          if (select.selectedIndex > 0 || (select.value && select.value !== '' && select.value !== select.options[0]?.value)) {
            return true;
          }
          break;
        default:
          if (element.tagName === 'TEXTAREA' && element.value.trim() !== '') {
            return true;
          }
          if (element.value && element.value.trim() !== '') {
            return true;
          }
          break;
      }
    }
    return false; 
  };

 
  useEffect(() => {
    if (isVisible) {
      const hasData = checkFormData();
      setActuallyHasData(hasData);
    }
  }, [isVisible]);

  
  useEffect(() => {
    
    if (!isVisible) return;


    const interval = setInterval(() => {
      const hasData = checkFormData();
      setActuallyHasData(hasData);
    }, 500); 


    return () => clearInterval(interval);
  }, [isVisible]);


  const handleClearRequest = () => {

    const hasData = checkFormData();
    if (!hasData) {
      return; 
    }
    setShowModal(true); 
  };

 
  const handleConfirmClear = () => {
    onClear();
    setShowModal(false);
    setActuallyHasData(false); 
  };

  
  const handleCloseModal = () => {
    setShowModal(false); 
  };

  
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

  
  const positionClasses = {
    header: 'inline-flex items-center space-x-1.5', 
    floating: 'fixed top-4 right-4 z-40 inline-flex items-center space-x-1.5 shadow-lg' 
  };


  if (!isVisible || !actuallyHasData) return null;

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