import React from 'react';
import { FormControlProps } from '../../types';

export interface LabelledInputProps extends FormControlProps {
  type?: string;
}

export interface LabelledSelectProps extends FormControlProps {
  children: React.ReactNode;
}

export interface LabelledTextareaProps extends FormControlProps {
  rows?: number;
  smRows?: number; // Optional: specific rows for small screens and up
}

export const LabelledInput: React.FC<LabelledInputProps> = ({
  label,
  id,
  type = "text",
  value,
  defaultValue,
  placeholder,
  theme,
  onChange,
  isReadOnly,
}) => (
  <div>
    <label htmlFor={id} className={`block text-xs sm:text-sm md:text-base lg:text-lg font-medium ${theme.textSecondary} mb-1 md:mb-1.5 lg:mb-2`}>{label}</label>
    <input
      type={type}
      id={id}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
      readOnly={isReadOnly}
      className={`w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isReadOnly ? 'bg-opacity-70 cursor-default' : ''} transition-colors`}
    />
  </div>
);

export const LabelledSelect: React.FC<LabelledSelectProps> = ({
  label,
  id,
  children,
  value,
  defaultValue,
  theme,
  onChange,
  isReadOnly,
}) => (
  <div>
    <label htmlFor={id} className={`block text-xs sm:text-sm md:text-base lg:text-lg font-medium ${theme.textSecondary} mb-1 md:mb-1.5 lg:mb-2`}>{label}</label>
    <select
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
      disabled={isReadOnly}
      className={`w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isReadOnly ? 'bg-opacity-70 cursor-not-allowed' : ''} transition-colors`}
    >
      {children}
    </select>
  </div>
);

export const LabelledTextarea: React.FC<LabelledTextareaProps> = ({
  label,
  id,
  rows = 3,
  smRows, 
  value,
  defaultValue,
  placeholder,
  theme,
  onChange,
  isReadOnly,
}) => (
  <div>
    <label htmlFor={id} className={`block text-xs sm:text-sm md:text-base lg:text-lg font-medium ${theme.textSecondary} mb-1 md:mb-1.5 lg:mb-2`}>{label}</label>
    <textarea
      id={id}
      rows={smRows ? undefined : rows} 
      className={`w-full px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 text-sm sm:text-base md:text-lg lg:text-xl border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} ${theme.inputPlaceholder} rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isReadOnly ? 'bg-opacity-70 cursor-default' : ''} transition-colors resize-y ${smRows ? `sm:h-auto sm:rows-${smRows}` : ''}`}
      style={smRows ? { height: 'auto' } : {}} 
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
      readOnly={isReadOnly}
    />
  </div>
);