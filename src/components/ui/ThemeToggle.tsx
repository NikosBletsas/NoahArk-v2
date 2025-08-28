import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  disabled?: boolean;
}
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  disabled = false
}) => {
  const { currentThemeKey, toggleTheme } = useTheme();
  const isDarkMode = currentThemeKey === 'black';

  const handleToggle = () => {
    if (disabled) return;
    toggleTheme();
  };

  return (
    <div className={className}>
      <label className={`
        inline-flex items-center relative group
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      `}>
        <input
          className="peer hidden"
          id="global-theme-toggle"
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
          disabled={disabled}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        />
        
        <div className={`
          relative 
          w-12 h-6 sm:w-14 sm:h-7 md:w-16 md:h-8
          bg-gray-200 peer-checked:bg-gray-700 
          rounded-full transition-all duration-300 ease-in-out
          after:absolute after:content-[''] 
          after:w-5 after:h-5 sm:after:w-6 sm:after:h-6 md:after:w-7 md:after:h-7
          after:bg-gradient-to-r after:from-orange-400 after:to-yellow-400 
          peer-checked:after:from-slate-800 peer-checked:after:to-slate-900
          after:rounded-full after:top-0.5 after:left-0.5
          after:transition-all after:duration-300 after:ease-in-out
          peer-checked:after:translate-x-6 sm:peer-checked:after:translate-x-7 md:peer-checked:after:translate-x-8
          after:shadow-sm hover:after:shadow-md
          shadow-sm hover:shadow-md
          border border-gray-300 peer-checked:border-gray-600
          ${disabled 
            ? 'opacity-50' 
            : 'hover:scale-105 active:scale-95 transform transition-transform duration-150'
          }
        `} />
        
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            fill-white peer-checked:opacity-50 
            absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5
            left-1 sm:left-1.5 md:left-1.5
            transition-opacity duration-300
            pointer-events-none
          `}
          aria-hidden="true"
        >
          <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z" />
        </svg>
        
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={`
            fill-slate-400 opacity-50 peer-checked:opacity-90 peer-checked:fill-white 
            absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5
            right-1 sm:right-1.5 md:right-1.5
            transition-all duration-300
            pointer-events-none
          `}
          aria-hidden="true"
        >
          <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127a10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2Z" />
        </svg>
        
        <div className={`
          absolute -bottom-8 sm:-bottom-9 md:-bottom-10 
          left-1/2 transform -translate-x-1/2 
          px-2 py-1 text-xs sm:text-sm
          text-white bg-gray-900 rounded-md
          opacity-0 pointer-events-none 
          transition-opacity duration-200
          group-hover:opacity-100
          whitespace-nowrap z-50
          hidden sm:block
        `}>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </label>
    </div>
  );
};

export default ThemeToggle;
