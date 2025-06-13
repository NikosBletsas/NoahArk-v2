import React from 'react';
import { Activity, Save, ArrowLeft, Settings as SettingsIcon, Wifi, TestTubeDiagonal, HardDrive, Search, Zap } from 'lucide-react';
import { BaseScreenProps } from '../types';
import { SCREEN_NAMES } from '../constants';
import FormSection from './shared/FormSection';
import { LabelledInput, LabelledSelect } from './shared/FormControls';

const DeviceManufacturerRow: React.FC<{label: string; idPrefix: string; theme: BaseScreenProps['theme']; isMidnightTheme?: boolean}> = ({label, idPrefix, theme, isMidnightTheme}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-end">
        <LabelledSelect label={`${label} Brand`} id={`${idPrefix}-brand`} theme={theme}>
            <option value="">Select Brand</option>
            <option value="contec">Contec</option>
            <option value="omron">Omron</option>
            <option value="choiceMMed">ChoiceMMed</option>
            <option value="other">Other</option>
        </LabelledSelect>
        <label htmlFor={`${idPrefix}-exists`} className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 cursor-pointer mt-2 md:mt-0 md:mb-1.5 sm:md:mb-2.5 lg:mb-3">
            <input type="checkbox" id={`${idPrefix}-exists`} className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded border focus:ring-blue-500 ${isMidnightTheme ? 'border-gray-700 bg-gray-800 text-blue-400' : 'border-gray-300 bg-white text-blue-500'}`} />
            <span className={`text-xs sm:text-sm md:text-base lg:text-lg ${isMidnightTheme ? 'text-gray-100' : 'text-gray-900'}`}>{label} Device Exists</span>
        </label>
    </div>
);

interface DeviceConfigurationScreenProps extends BaseScreenProps {
  setShowThemeSelector?: (show: boolean) => void;
  setShowConnectionStatus?: (show: boolean) => void;
  setShowConnectivityTest?: (show: boolean) => void;
}

const DeviceConfigurationScreen: React.FC<DeviceConfigurationScreenProps> = ({ 
  theme, 
  setCurrentScreen, 
  setShowThemeSelector, 
  isMidnightTheme, 
  currentThemeKey, 
  setShowConnectionStatus, 
  setShowConnectivityTest 
}) => {
  
  const deviceManufacturers = [
    { label: "ECG", idPrefix: "ecg" },
    { label: "Blood Pressure Meter", idPrefix: "bp" },
    { label: "Respirometer", idPrefix: "respirometer" },
    { label: "Glucose/Urine/Cholesterol", idPrefix: "glucose" },
    { label: "Temperature Meter", idPrefix: "temp" },
    { label: "Weight Scale", idPrefix: "weight" },
  ];

  const baseButtonStyles = "justify-center px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm md:text-base lg:text-lg font-medium flex items-center space-x-2 md:space-x-2.5 transition-all duration-150 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex flex-col`}>
      <div className={`p-3 sm:p-4 md:p-5 lg:p-6 ${theme.card} backdrop-blur-lg border-b ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-700/50' : 'border-white/20'} shadow-sm sticky top-0 z-20`}>
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 max-w-7xl mx-auto">
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
          <div className="flex-grow"></div>
             {setShowThemeSelector && (
                 <button
                    onClick={() => setShowThemeSelector(true)}
                    className={`p-2 sm:p-3 md:p-3.5 lg:p-4 ${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-lg border ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-700/50' : 'border-white/20'} hover:scale-105 transition-all duration-200`}
                    title="Change Theme"
                  >
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-gradient-to-r ${theme.primary} rounded-md sm:rounded-lg`}></div>
                </button>
            )}
        </div>
      </div>

      <div className="flex-grow p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          <FormSection title="HMS" theme={theme}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <LabelledInput label="Local Address" id="hms-local-address" placeholder="e.g., 192.168.1.100" theme={theme} />
              <LabelledInput label="Local Port" id="hms-local-port" placeholder="e.g., 8080" theme={theme} />
            </div>
            <label htmlFor="hms-device-exists" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 cursor-pointer mb-4 sm:mb-6 md:mb-7 lg:mb-8">
                <input type="checkbox" id="hms-device-exists" className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded border focus:ring-blue-500 ${isMidnightTheme ? 'border-gray-700 bg-gray-800 text-blue-400' : 'border-gray-300 bg-white text-blue-500'}`} />
                <span className={`text-xs sm:text-sm md:text-base lg:text-lg ${isMidnightTheme ? 'text-gray-100' : 'text-gray-900'}`}>HMS Device Exists</span>
            </label>

            <FormSection title="HMS Oximeter" theme={theme} isSubSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                    <LabelledSelect label="Oximeter Brand" id="hms-oximeter-brand" theme={theme}>
                        <option value="">Select Brand</option>
                        <option value="contec">Contec</option>
                        <option value="choiceMMed">ChoiceMMed</option>
                        <option value="other">Other</option>
                    </LabelledSelect>
                    <LabelledSelect label="Port" id="hms-oximeter-port" theme={theme}>
                        <option value="">Select Port</option>
                        <option value="COM1">COM1</option>
                        <option value="COM2">COM2</option>
                        <option value="USB0">USB0</option>
                    </LabelledSelect>
                </div>
                 <label htmlFor="hms-oximeter-exists" className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 cursor-pointer my-3 sm:my-4 md:my-5 lg:my-6">
                    <input type="checkbox" id="hms-oximeter-exists" className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded border focus:ring-blue-500 ${isMidnightTheme ? 'border-gray-700 bg-gray-800 text-blue-400' : 'border-gray-300 bg-white text-blue-500'}`} />
                    <span className={`text-xs sm:text-sm md:text-base lg:text-lg ${isMidnightTheme ? 'text-gray-100' : 'text-gray-900'}`}>Oximeter Device Exists</span>
                </label>
                <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-3 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                    <button className={`${baseButtonStyles} w-full sm:flex-1 bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500`}>
                        <Search size={16} className="md:size-5 lg:size-6"/><span>Find All Ports</span>
                    </button>
                    <button className={`${baseButtonStyles} w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white focus:ring-green-500`}>
                        <Zap size={16} className="md:size-5 lg:size-6"/><span>Test Connection</span>
                    </button>
                    <button className={`${baseButtonStyles} w-full sm:flex-1 bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500`}>
                        <HardDrive size={16} className="md:size-5 lg:size-6"/><span>Auto Detect</span>
                    </button>
                </div>
            </FormSection>
          </FormSection>

          <FormSection title="Device Manufacturer" theme={theme}>
            <div className="space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">
              {deviceManufacturers.map(device => (
                <DeviceManufacturerRow key={device.idPrefix} label={device.label} idPrefix={device.idPrefix} theme={theme} isMidnightTheme={isMidnightTheme} />
              ))}
            </div>
          </FormSection>

          <FormSection title="Network & Connectivity" theme={theme}>
             <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3">
                 <button 
                    onClick={() => setShowConnectionStatus && setShowConnectionStatus(true)}
                    className={`${baseButtonStyles} w-full sm:flex-1 bg-gradient-to-r ${theme.primary} ${theme.textOnAccent} hover:opacity-90 focus:ring-violet-500`} 
                    aria-label="Open Network Settings"
                    >
                    <Wifi size={16} className="md:size-5 lg:size-6" />
                    <span>Network Settings</span>
                </button>
                <button 
                    onClick={() => setShowConnectivityTest && setShowConnectivityTest(true)}
                    className={`${baseButtonStyles} w-full sm:flex-1 bg-green-500 hover:bg-green-600 text-white focus:ring-green-500`}
                    aria-label="Run Connectivity Tests"
                    >
                    <TestTubeDiagonal size={16} className="md:size-5 lg:size-6" />
                    <span>Run Connectivity Tests</span>
                </button>
            </div>
          </FormSection>
        </div>
      </div>

      <div className={`sticky bottom-0 left-0 right-0 bg-gradient-to-r ${theme.accent} p-3 md:p-4 lg:p-5 shadow-top z-10 border-t ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-600' : 'border-white/10'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
          <button 
            onClick={() => console.log("Save Device Configuration action")}
            className={`${baseButtonStyles} bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500`}
          >
            <Save size={16} className="md:size-5 lg:size-6" />
            <span>Save</span>
          </button>
          <button
            onClick={() => setCurrentScreen(SCREEN_NAMES.DASHBOARD)}
            className={`${baseButtonStyles} ${isMidnightTheme ? 'border-gray-600 text-white bg-gray-700 hover:bg-gray-600' : 'border-gray-700 text-gray-900 bg-white hover:bg-gray-50'} focus:ring-gray-400`}
          >
            <ArrowLeft size={16} className="md:size-5 lg:size-6" />
            <span>Return</span>
          </button>
          <button
            onClick={() => setCurrentScreen(SCREEN_NAMES.SETTINGS)}
            className={`${baseButtonStyles} ${isMidnightTheme ? 'border-gray-600 text-white bg-gray-700 hover:bg-gray-600' : 'border-gray-700 text-gray-900 bg-white hover:bg-gray-50'} focus:ring-gray-400`}
          >
            <SettingsIcon size={16} className="md:size-5 lg:size-6" />
            <span>Advanced</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceConfigurationScreen;