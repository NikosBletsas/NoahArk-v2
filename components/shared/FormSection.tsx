
import React from 'react';
import { Theme } from '../../types';

interface FormSectionProps {
  title: string;
  theme: Theme;
  children: React.ReactNode;
  isSubSection?: boolean;
  isInnerSection?: boolean; // New prop
}

const FormSection: React.FC<FormSectionProps> = ({ title, theme, children, isSubSection, isInnerSection }) => {
  
  const getTitleBgClass = (accentColor: string) => {
    if (accentColor.includes('from-') && accentColor.includes('to-')) {
      return accentColor.startsWith('bg-gradient') ? accentColor : `bg-gradient-to-r ${accentColor}`;
    }
    return accentColor;
  };

  const titleElement = (
    <div className={`${getTitleBgClass(theme.accent)} ${theme.textOnAccent} p-2.5 sm:p-3 md:p-3.5 lg:p-4 rounded-t-lg sm:rounded-t-xl`}>
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">{title}</h2>
    </div>
  );

  const contentElement = (
    <div className="p-3 sm:p-4 md:p-5 lg:p-6">{children}</div>
  );

  if (isSubSection) {
    return (
      <div className="py-1.5 sm:py-2 md:py-2.5 lg:py-3">
        <h3 className={`font-semibold ${theme.textPrimary} mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3 text-sm sm:text-md md:text-lg lg:text-xl border-b ${theme.inputBorder} pb-1.5 sm:pb-2 md:pb-2.5 lg:pb-3`}>{title}</h3>
        <div>{children}</div>
      </div>
    );
  }

  if (isInnerSection) {
    return (
      <div className={`${theme.card} backdrop-blur-lg rounded-lg sm:rounded-xl shadow-lg border border-white/20 overflow-hidden`}> 
        {titleElement}
        {contentElement}
      </div>
    );
  }

  return (
    <div className={`${theme.card} backdrop-blur-lg rounded-lg sm:rounded-xl shadow-lg border border-white/20 overflow-hidden`}>
      {titleElement}
      {contentElement}
    </div>
  );
};

export default FormSection;