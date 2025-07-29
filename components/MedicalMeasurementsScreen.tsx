import React from 'react';
import { ArrowLeft, MonitorDot, AirVent, Activity, HeartPulse, ScanEye, Radio, Fingerprint, Thermometer, TestTubeDiagonal, PersonStanding, Stethoscope } from 'lucide-react';
import { BaseScreenProps, ThemeKey } from '../types';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

interface DeviceTileProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  gradient: string;
  borderColor: string;
  theme: BaseScreenProps['theme'];
  currentThemeKey: string; // Change from ThemeKey to string
}

const DeviceTile: React.FC<DeviceTileProps> = ({ icon, label, onClick, gradient, borderColor, theme, currentThemeKey }) => (
  <div
    onClick={onClick}
    className={`bg-gradient-to-br ${gradient} p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center cursor-pointer hover:scale-105 transition-all duration-200 border ${borderColor} flex flex-col items-center justify-center aspect-square`}
  >
    {icon}
    <h3 className={`font-semibold ${currentThemeKey === 'black' ? 'text-slate-800' : theme.textPrimary} mt-2 text-xs sm:text-sm md:text-base lg:text-lg`}>{label}</h3>
  </div>
);

interface MedicalMeasurementsScreenProps extends BaseScreenProps {
  setShowThemeSelector?: (show: boolean) => void;
}

const MedicalMeasurementsScreen: React.FC<MedicalMeasurementsScreenProps> = ({ 
  theme, 
  setCurrentScreen, 
  setShowThemeSelector, 
  isMidnightTheme, 
  currentThemeKey 
}) => {
  const iconSize = "w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16";
  const devices = [
    { icon: <MonitorDot className={`${iconSize} mx-auto text-blue-600`} />, label: 'Patient Monitor', gradient: 'from-blue-50 to-blue-100', borderColor: 'border-blue-200', screen: SCREEN_NAMES.PATIENT_MONITOR },
    { icon: <AirVent className={`${iconSize} mx-auto text-purple-600`} />, label: 'Spirometer', gradient: 'from-purple-50 to-purple-100', borderColor: 'border-purple-200', screen: SCREEN_NAMES.SPIROMETER },
    { icon: <Activity className={`${iconSize} mx-auto text-green-600`} />, label: 'ECG', gradient: 'from-green-50 to-green-100', borderColor: 'border-green-200', screen: undefined /* TODO */ },
    { icon: <HeartPulse className={`${iconSize} mx-auto text-red-600`} />, label: 'Blood Pressure', gradient: 'from-red-50 to-red-100', borderColor: 'border-red-200', screen: undefined /* TODO */ },
    { icon: <ScanEye className={`${iconSize} mx-auto text-yellow-600`} />, label: 'Endoscope', gradient: 'from-yellow-50 to-yellow-100', borderColor: 'border-yellow-200', screen: SCREEN_NAMES.ENDOSCOPE },
    { icon: <Radio className={`${iconSize} mx-auto text-indigo-600`} />, label: 'Ultrasound', gradient: 'from-indigo-50 to-indigo-100', borderColor: 'border-indigo-200', screen: undefined /* TODO */ },
    { icon: <Fingerprint className={`${iconSize} mx-auto text-teal-600`} />, label: 'Oximeter', gradient: 'from-teal-50 to-teal-100', borderColor: 'border-teal-200', screen: undefined /* TODO */ },
    { icon: <Thermometer className={`${iconSize} mx-auto text-orange-600`} />, label: 'Temperature', gradient: 'from-orange-50 to-orange-100', borderColor: 'border-orange-200', screen: undefined /* TODO */ },
    { icon: <TestTubeDiagonal className={`${iconSize} mx-auto text-pink-600`} />, label: 'Blood Indicators', gradient: 'from-pink-50 to-pink-100', borderColor: 'border-pink-200', screen: undefined /* TODO */ },
    { icon: <PersonStanding className={`${iconSize} mx-auto text-gray-600`} />, label: 'Weight', gradient: 'from-gray-50 to-gray-100', borderColor: 'border-gray-200', screen: undefined /* TODO */ },
    { icon: <Stethoscope className={`${iconSize} mx-auto text-cyan-600`} />, label: 'Stethoscope', gradient: 'from-cyan-50 to-cyan-100', borderColor: 'border-cyan-200', screen: undefined /* TODO */ },
  ];
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <AppHeader 
        theme={theme} 
        title="NOAH - Medical Devices" 
        onBack={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
        showThemeButton={false}
        isMidnightTheme={isMidnightTheme}
      />

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow">
        <div className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12`}>
          <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl mb-4 sm:mb-6 md:mb-8`}>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">Choose Medical Device</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-7">
            {devices.map(device => (
              <DeviceTile 
                key={device.label} 
                icon={device.icon} 
                label={device.label}
                gradient={device.gradient}
                borderColor={device.borderColor}
                onClick={device.screen ? () => setCurrentScreen(device.screen) : undefined}
                theme={theme}
                currentThemeKey={currentThemeKey}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={`sticky bottom-0 left-0 right-0 bg-gradient-to-r ${theme.accent} p-3 sm:p-4 md:p-5 lg:p-6 border-t ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-600' : 'border-white/10'}`}>
        <div className="flex justify-center">
          <button
            onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
            className={`flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 bg-white/20 ${currentThemeKey === 'black' ? 'text-slate-800' : theme.textOnAccent} px-4 py-2 sm:px-6 sm:py-2.5 md:px-7 md:py-3 lg:px-8 lg:py-3.5 rounded-lg sm:rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm sm:text-base md:text-lg lg:text-xl`}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalMeasurementsScreen;
