
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Monitor, X, ArrowLeft, Activity } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';


const SpirometerScreen: React.FC = () => {
  const { theme, isMidnightTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader
        title="Respirometer Data"
        onBack={() => navigate(`/${SCREEN_NAMES.MEASUREMENTS}`)}
        showThemeButton={true}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12`}>
          <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl mb-4 sm:mb-6 md:mb-8`}>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">Obtain Test Results from Respirometer</h2>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
            <div className="flex-1">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-10 h-full">
                <div className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-5 lg:mb-6 inline-block">T Text</div>
                <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-sm sm:text-base md:text-lg lg:text-xl">
                  <div className="bg-blue-100 border border-blue-300 p-2 sm:p-3 md:p-4 lg:p-5 rounded-md sm:rounded-lg">
                    <span className="font-medium text-blue-800">Connect to Device</span>
                  </div>
                  <div className="text-slate-700 p-2 sm:p-3 md:p-4 lg:p-5">Obtain Data</div>
                  <div className="text-slate-700 p-2 sm:p-3 md:p-4 lg:p-5">Generate Report</div>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <button className={`w-full bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg lg:text-xl`}>
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                <span className="font-medium">Start Data Acquisition</span>
              </button>
              
              <button className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg lg:text-xl`}>
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                <span className="font-medium">Generate Report</span>
              </button>
              
              <button className={`w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg lg:text-xl`}>
                <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                <span className="font-medium">Clear Device Memory</span>
              </button>
              
              <button
                onClick={() => navigate(`/${SCREEN_NAMES.MEASUREMENTS}`)}
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg lg:text-xl"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                <span className="font-medium">Return</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpirometerScreen;
