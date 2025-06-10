
import React, { useState } from 'react';
import { Activity, RefreshCw, Wifi, Eye, EyeOff, X, Link2, Link2Off, ArrowLeft } from 'lucide-react';
import { ModalScreenProps } from '../types'; 
import { SCREEN_NAMES } from '../constants';
import InputWithIconButton from './shared/InputWithIconButton';

interface AccessPoint {
  name: string;
  signal: number;
}

const ConnectionStatusScreen: React.FC<ModalScreenProps> = ({ 
  theme, 
  isMidnightTheme, 
  currentThemeKey, 
  onClose, 
  setCurrentScreen, 
  setShowConnectivityTest 
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<AccessPoint | null>(null);

  const mockAccessPoints: AccessPoint[] = [
    { name: 'TMA Wifi', signal: 84 },
    { name: 'TMA Guest Wifi', signal: 82 },
    { name: 'NeighborNet_5G', signal: 65 },
    { name: 'MyHotspot', signal: 90 },
    { name: 'OfficeNetwork_2.4GHz', signal: 70 },
    { name: 'CafeWifiFree', signal: 55 },
  ];

  const currentConnection = "NOAH SecureNet";

  const handleConnect = () => {
    if(selectedNetwork) {
        console.log(`Connecting to ${selectedNetwork.name} with password: ${password}`);
    } else {
        console.log("No network selected to connect.");
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex items-center justify-center p-3 sm:p-4" 
      onClick={onClose}
    >
      <div 
        className={`${theme.card} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-700/50' : 'border-white/20'} w-full max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl flex flex-col overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl shrink-0`}>
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
            <Wifi size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">Connection Status</h2>
          </div>
          <button onClick={onClose} className={`p-1 sm:p-1.5 md:p-2 lg:p-2.5 hover:bg-white/20 rounded-full transition-colors ${theme.textOnAccent}`}>
            <X size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          <div className="w-full md:w-3/5 p-3 sm:p-4 md:p-6 lg:p-8 border-b md:border-b-0 md:border-r ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-300/70'} overflow-y-auto">
            <h3 className={`text-sm sm:text-md md:text-lg lg:text-xl font-semibold ${theme.textPrimary} mb-1 md:mb-1.5 lg:mb-2`}>Connected to:</h3>
            <p className={`px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 mb-3 sm:mb-4 md:mb-5 lg:mb-6 rounded-md sm:rounded-lg ${theme.inputBackground} ${theme.inputBorder} ${theme.textPrimary} text-xs sm:text-sm md:text-base lg:text-lg truncate`}>
                {currentConnection}
            </p>
            
            <h3 className={`text-sm sm:text-md md:text-lg lg:text-xl font-semibold ${theme.textPrimary} mb-2 sm:mb-3 lg:mb-4`}>Available Access Points:</h3>
            <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 max-h-48 sm:max-h-60 md:max-h-[calc(100vh - 320px)] lg:max-h-[calc(100vh-300px)] overflow-y-auto pr-1 sm:pr-2">
              {mockAccessPoints.map((ap) => (
                <div
                  key={ap.name}
                  onClick={() => setSelectedNetwork(ap)}
                  className={`flex justify-between items-center p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-md sm:rounded-lg cursor-pointer transition-colors text-xs sm:text-sm md:text-base lg:text-lg
                    ${selectedNetwork?.name === ap.name 
                      ? `bg-gradient-to-r ${theme.primary} ${theme.textOnAccent}` 
                      : `${theme.inputBackground} ${theme.textPrimary} hover:bg-gray-500/20`}
                  `}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && setSelectedNetwork(ap)}
                >
                  <span className="truncate pr-2">{ap.name}</span>
                  <div className="flex items-center space-x-1 shrink-0">
                    <Wifi size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span>{ap.signal}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`w-full md:w-2/5 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 shrink-0 ${isMidnightTheme ? 'bg-gray-800/40' : 'bg-slate-50/60'}`}>
            <button className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} transition-colors text-xs sm:text-sm md:text-base lg:text-lg`}>
              <RefreshCw size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span>Refresh List</span>
            </button>
            <InputWithIconButton
                label="Password"
                id="wifi-password"
                type={showPassword ? 'text' : 'password'}
                theme={theme}
                currentThemeKey={currentThemeKey}
                placeholder="Enter Wi-Fi password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={showPassword ? <EyeOff size={16} className={`sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${theme.textSecondary}`} /> : <Eye size={16} className={`sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ${theme.textSecondary}`} />}
                onIconClick={() => setShowPassword(!showPassword)}
                buttonTitle={showPassword ? "Hide password" : "Show password"}
            />
            <button 
                onClick={handleConnect}
                disabled={!selectedNetwork}
                className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium bg-green-500 hover:bg-green-600 text-white transition-colors text-xs sm:text-sm md:text-base lg:text-lg ${!selectedNetwork ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Link2 size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span>Connect</span>
            </button>
            <button className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white transition-colors text-xs sm:text-sm md:text-base lg:text-lg`}>
              <Link2Off size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span>Disconnect</span>
            </button>
            <div className="flex-grow"></div>
            <button 
              onClick={onClose}
              className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} hover:opacity-90 transition-opacity text-xs sm:text-sm md:text-base lg:text-lg`}
            >
              <ArrowLeft size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span>Return</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatusScreen;