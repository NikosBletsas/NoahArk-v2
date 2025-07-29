
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, RotateCcw, RefreshCw, Power } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';

interface OperationButtonProps {
  icon: React.ReactElement<{ className?: string }>;
  label: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  onClick?: () => void;
}

const OperationButton: React.FC<OperationButtonProps> = ({ icon, label, gradient, borderColor, textColor, onClick }) => {
  const { theme } = useTheme();
  return (
  <div
    onClick={onClick}
    className={`bg-gradient-to-br ${gradient} p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl sm:rounded-2xl text-center cursor-pointer hover:scale-105 transition-all duration-200 border ${borderColor} flex flex-col items-center justify-center aspect-square`}
  >
    {React.cloneElement(icon, { 
      className: `w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 mx-auto mb-2 sm:mb-3 md:mb-4 ${textColor}` 
    })}
    <h3 className={`font-semibold ${textColor} text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl`}>{label}</h3>
  </div>
  );
};


const SystemOperationsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${theme.background} bg-opacity-80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-30`} onClick={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}>
      <div
        className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-3xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl mb-4 sm:mb-6 md:mb-8 flex items-center justify-between`}>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">System Operations</h2>
          <button
            onClick={() => navigate(`/${SCREEN_NAMES.DASHBOARD}`)}
            className={`p-1.5 sm:p-2 md:p-2.5 lg:p-3 hover:bg-white/20 rounded-md sm:rounded-lg transition-colors ${theme.textOnAccent}`}
            aria-label="Close system operations"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
           <OperationButton
            icon={<RotateCcw />}
            label="Reset"
            gradient="from-blue-50 to-blue-100"
            borderColor="border-blue-200"
            textColor="text-blue-700"
          />
          <OperationButton
            icon={<RefreshCw />}
            label="Restart"
            gradient="from-green-50 to-green-100"
            borderColor="border-green-200"
            textColor="text-green-700"
          />
          <OperationButton
            icon={<Power />}
            label="Shutdown"
            gradient="from-red-50 to-red-100"
            borderColor="border-red-200"
            textColor="text-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default SystemOperationsScreen;
