
import React from 'react';
import { Theme, ThemeKey } from '../../types';

interface InputWithIconButtonProps {
  label: string;
  id: string;
  theme: Theme;
  currentThemeKey: ThemeKey;
  icon: React.ReactNode;
  onIconClick: () => void;
  buttonTitle?: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
}

const InputWithIconButton: React.FC<InputWithIconButtonProps> = ({
  label,
  id,
  theme,
  currentThemeKey,
  icon,
  onIconClick,
  buttonTitle,
  type = "text",
  value,
  defaultValue,
  placeholder,
  onChange,
  isReadOnly,
}) => {
  return (
    <div>
      <label htmlFor={id} className={`block text-xs sm:text-sm md:text-base lg:text-lg font-medium ${theme.textSecondary} mb-1 md:mb-1.5 lg:mb-2`}>
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type={type}
          id={id}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={isReadOnly}
          className={`w-full px-3 py-2 text-sm sm:text-base md:text-lg lg:text-xl md:px-4 md:py-2.5 lg:px-5 lg:py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isReadOnly ? 'bg-opacity-70 cursor-default' : ''} pr-9 sm:pr-10 md:pr-11 lg:pr-12`}
        />
        <button
          type="button"
          title={buttonTitle}
          onClick={onIconClick}
          className={`absolute right-0 top-0 h-full px-2.5 sm:px-3 md:px-3.5 lg:px-4 flex items-center justify-center ${theme.textSecondary} hover:opacity-75 transition-opacity rounded-r-md sm:rounded-r-lg focus:outline-none`}
          aria-label={buttonTitle || 'Input action'}
        >
          {/* Icon size typically handled by its definition, or cloneElement if needed */}
          {icon} 
        </button>
      </div>
    </div>
  );
};

export default InputWithIconButton;