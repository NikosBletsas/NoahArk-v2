import React from 'react';
import { ArrowLeft, Activity } from 'lucide-react';
import { AppHeaderProps } from '../../types';

const AppHeader: React.FC<AppHeaderProps> = ({
 theme,
 title,
 onBack,
 showThemeButton,
 onShowThemeSelector,
 isMidnightTheme,
 currentThemeKey, // Προσθήκη για dynamic logo
}) => {
 return (
   <div className={`${theme.card} backdrop-blur-lg border-b border-white/20 p-3 sm:p-4 md:p-5 lg:p-6 flex items-center justify-between sticky top-0 z-10`}>
     <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
       {onBack && (
         <button
           onClick={onBack}
           className={`p-1.5 sm:p-2 md:p-2.5 lg:p-3 ${isMidnightTheme ? 'hover:bg-white/10' : 'hover:bg-slate-100'} rounded-md sm:rounded-lg transition-colors`}
           aria-label="Go back"
         >
           <ArrowLeft className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 ${isMidnightTheme ? 'text-slate-300' : 'text-slate-600'}`} />
         </button>
       )}
       <div className="w-36 h-20 sm:w-40 sm:h-22 md:w-44 md:h-24 flex items-center justify-start">
         <img 
           src={currentThemeKey === 'black' || isMidnightTheme
             ? "/assets/NoA.H. Logo Horizontal white.svg"
             : "/assets/NoA.H. Logo Horizontal blue-black.svg"
           }
           alt="NOAH Logo"
           className="w-full h-full object-contain max-w-36 max-h-20 sm:max-w-40 sm:max-h-22 md:max-w-44 md:max-h-24"
         />
       </div>
     </div>

     {/* Title */}
     <div className={`text-xs sm:text-sm md:text-base lg:text-lg ${theme.textPrimary} font-semibold text-center flex-1`}>
       {title}
     </div>

     {showThemeButton && onShowThemeSelector && (
        <button
           onClick={onShowThemeSelector}
           className={`p-2 sm:p-3 md:p-3.5 lg:p-4 ${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg border border-white/20 hover:scale-105 transition-all duration-200`}
           title="Change Theme"
         >
         <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r ${theme.primary} rounded-md sm:rounded-lg`}></div>
       </button>
     )}
   </div>
 );
};

export default AppHeader;