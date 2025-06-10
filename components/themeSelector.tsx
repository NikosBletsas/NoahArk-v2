
import React from 'react';
import { X } from 'lucide-react';
import { Theme, ThemeKey } from '../types';
import { THEMES } from '../constants';

interface ThemeSelectorProps {
  themes: Record<ThemeKey, Theme>;
  currentThemeKey: ThemeKey;
  onThemeSelect: (key: ThemeKey) => void;
  onClose: () => void;
  isMidnightTheme: boolean;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, currentThemeKey, onThemeSelect, onClose, isMidnightTheme }) => {
  const currentCardBg = THEMES[currentThemeKey].card.split(' ')[0];
  const isDarkModal = isMidnightTheme || currentThemeKey === 'black';
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div className={`${currentCardBg} backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-4xl 2xl:max-w-5xl w-full border ${isDarkModal ? 'border-gray-700/50' : 'border-white/20'}`} style={{ maxHeight: 'calc(100vh - 2rem)'}}>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${isDarkModal ? 'text-white' : 'text-slate-800'}`}>
            Choose Theme
          </h2>
          <button
            onClick={onClose}
            className={`p-1.5 sm:p-2 md:p-2.5 hover:bg-black/10 rounded-lg transition-colors ${isDarkModal ? 'text-white' : 'text-slate-600'}`}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-5 md:gap-6 max-h-[70vh] sm:max-h-[65vh] overflow-y-auto pr-1 sm:pr-2">
          {Object.entries(themes).map(([key, themeOption]) => (
            <div
              key={key}
              onClick={() => onThemeSelect(key as ThemeKey)}
              className={`cursor-pointer rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 transition-all duration-200 hover:scale-105 border-2 ${
                currentThemeKey === key 
                  ? 'border-blue-500 shadow-lg' 
                  : `border-transparent ${isDarkModal ? 'hover:border-gray-600' : 'hover:border-gray-300'}`
              }`}
            >
              <div className={`bg-gradient-to-br ${themeOption.background} rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 mb-3 sm:mb-4 h-20 sm:h-24 md:h-32 relative overflow-hidden`}>
                <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-r ${themeOption.primary} rounded-md sm:rounded-lg mb-1.5 sm:mb-2 md:mb-3`}></div>
                <div className={`w-full h-1.5 sm:h-2 md:h-3 bg-gradient-to-r ${themeOption.accent} rounded mb-1 md:mb-1.5`}></div>
                <div className={`w-3/4 h-1 sm:h-1.5 md:h-2 ${themeOption.card.includes('bg-white/10') || themeOption.card.includes('bg-gray-900') ? 'bg-gray-500/60' : 'bg-gray-300/80'} rounded`}></div>
                <div className={`w-1/2 h-1 sm:h-1.5 md:h-2 ${themeOption.card.includes('bg-white/10') || themeOption.card.includes('bg-gray-900') ? 'bg-gray-500/60' : 'bg-gray-300/80'} rounded mt-0.5 sm:mt-1 md:mt-1.5`}></div>
                
                {currentThemeKey === key && (
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px] sm:text-xs md:text-sm">✓</span>
                  </div>
                )}
              </div>
              
              <h3 className={`font-semibold text-xs sm:text-sm md:text-base lg:text-lg text-center ${isDarkModal ? 'text-white' : 'text-slate-800'}`}>
                {themeOption.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;