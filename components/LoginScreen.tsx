import React, { useState } from 'react';
import { Activity, Monitor, Wifi, ShieldCheck, Eye, EyeOff } from 'lucide-react'; 
import { BaseScreenProps } from '../types';
import { SCREEN_NAMES } from '../constants';
import ThemeToggleSwitch from './ThemeSelector'; // ADD THIS IMPORT

// Local IconButton component for Login Screen specific styling
interface IconButtonProps {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  onClick?: () => void;
  theme: BaseScreenProps['theme'];
  bgColorClass: string;
  iconColorClass?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick, theme, bgColorClass, iconColorClass = 'text-white' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 sm:space-y-1.5 p-2 rounded-lg transition-colors duration-150 hover:bg-gray-500/10 w-24 sm:w-28`}
      aria-label={label}
    >
      <div className={`p-3 sm:p-3.5 rounded-lg ${bgColorClass}`}>
        {React.cloneElement(icon, { className: `w-5 h-5 sm:w-6 sm:h-6 ${iconColorClass}` })}
      </div>
      <span className={`text-xs sm:text-sm font-medium ${theme.textSecondary}`}>{label}</span>
    </button>
  );
};

const LoginScreen: React.FC<BaseScreenProps> = ({ 
  theme, 
  setCurrentScreen, 
  setShowThemeSelector, 
  onThemeChange, 
  isMidnightTheme,
  currentThemeKey,
  setShowConnectionStatus,
  setShowConnectivityTest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center p-4 sm:p-6 relative`}>
      {/* REPLACE THE OLD BUTTON WITH THIS: */}
      {onThemeChange ? (
        <ThemeToggleSwitch
          currentThemeKey={currentThemeKey}
          onThemeChange={onThemeChange}
          className="absolute top-4 right-4 z-20"
        />
      ) : setShowThemeSelector ? (
        <button
          onClick={() => setShowThemeSelector(true)}
          className={`absolute top-4 right-4 p-2 sm:p-3 md:p-3.5 ${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg border border-white/20 hover:scale-105 transition-all duration-200`}
          title="Change Theme"
        >
          <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-gradient-to-r ${theme.primary} rounded-md sm:rounded-lg`}></div>
        </button>
      ) : null}

      <div className={`${theme.card} backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md md:max-w-lg border border-white/20`}>
        <div className="text-center mb-8">
          <div className="flex flex-col items-center space-y-6 mb-4">
            {/* NOAH logo - ALREADY UPDATED */}
            <div className="w-40 h-24 sm:w-44 sm:h-26 md:w-48 md:h-28 flex items-center justify-center">
              <img 
                src={currentThemeKey === 'black'
                  ? "/assets/NoA.H. Logo Horizontal white.svg"
                  : "/assets/NoA.H. Logo Horizontal blue-black.svg" 
                }
                alt="NOAH Logo" 
                className="w-full h-full object-contain max-w-40 max-h-24 sm:max-w-44 sm:max-h-26 md:max-w-48 md:max-h-28" 
              />
            </div>
          </div>
          <h2 className={`text-xl font-semibold ${isMidnightTheme ? theme.textPrimary : 'text-slate-700'}`}>Hi, Welcome back!</h2>
        </div>

        {/* FORM REMAINS THE SAME */}
        <div className="space-y-4 md:space-y-5">
          <input
            type="email"
            placeholder="Username"
            className={`w-full px-4 py-2.5 sm:py-3 md:px-5 md:py-3.5 ${theme.inputBackground} ${theme.inputBorder} ${theme.textPrimary} ${theme.inputPlaceholder} border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base md:text-lg`}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`w-full px-4 py-2.5 sm:py-3 md:px-5 md:py-3.5 ${theme.inputBackground} ${theme.inputBorder} ${theme.textPrimary} ${theme.inputPlaceholder} border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base md:text-lg pr-10 sm:pr-11 md:pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? 
                <EyeOff className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.textSecondary}`} /> : 
                <Eye className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.textSecondary}`} />}
            </button>
          </div>
          <div className="text-right mt-1">
            <button 
              onClick={() => console.log("Forgot password clicked")}
              className={`text-xs sm:text-sm ${theme.textSecondary} hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500 rounded`}
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-3 sm:pt-4">
            <button
              onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
              className={`w-full bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-200 font-medium text-sm sm:text-base md:text-lg`}
            >
              Login
            </button>
          </div>
        </div>

        {/* CONNECTIVITY BUTTONS REMAIN THE SAME */}
        <div className={`mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t ${isMidnightTheme ? 'border-gray-700/50' : 'border-slate-200/80'}`}>
          <div className="flex justify-center items-center space-x-4 sm:space-x-6 md:space-x-8">
            <IconButton
              icon={<Wifi />} 
              label="Connectivity"
              theme={theme}
              bgColorClass="bg-blue-500"
              onClick={() => {
                if (setShowConnectionStatus) setShowConnectionStatus(true);
                else console.log("Connectivity clicked - setShowConnectionStatus not available");
              }}
            />
            <IconButton
              icon={<ShieldCheck />}
              label="Diagnostics"
              theme={theme}
              bgColorClass="bg-green-500"
              onClick={() => {
                if (setShowConnectivityTest) setShowConnectivityTest(true);
                else console.log("Diagnostics clicked - setShowConnectivityTest not available");
              }}
            />
          </div>
        </div>

        {/* UPDATE TMA LOGO TO BE DYNAMIC */}
        <div className={`text-center mt-6 sm:mt-8 text-xs ${isMidnightTheme ? 'text-gray-400' : 'text-slate-500'} flex flex-col items-center justify-center space-y-2`}>
          <span className="text-xs sm:text-sm">POWERED BY</span>
          <div className="h-8 sm:h-10 flex items-center justify-center">
            <img 
              src= 'assets/TMA Logo Horizontal RGB.svg'
              alt="TMA Logo" 
              className="h-6 sm:h-8 w-auto object-contain max-w-32 sm:max-w-40" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;