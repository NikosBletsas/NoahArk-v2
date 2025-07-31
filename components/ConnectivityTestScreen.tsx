
import React, { useState } from 'react';
import { Wifi, UploadCloud, TestTubeDiagonal, X, ArrowLeft, Server, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ModalScreenProps } from '../types';

interface TestItem {
  id: string;
  name: string;
  status: 'pending' | 'testing' | 'success' | 'failed';
}

const initialTestItems: TestItem[] = [
  { id: 'emr_api', name: 'Connectivity to EMR API', status: 'pending' },
  { id: 'ftp', name: 'Connectivity to FTP', status: 'pending' },
  { id: 'sip_gui', name: 'Connectivity to SIP GUI', status: 'pending' },
  { id: 'sip_proxy', name: 'Connectivity to SIP Proxy', status: 'pending' },
  { id: 'hms', name: 'Connectivity to HMS', status: 'pending' },
];

const ConnectivityTestScreen: React.FC<ModalScreenProps> = ({ 
  theme, 
  isMidnightTheme, 
  currentThemeKey,
  onClose, 
  setCurrentScreen, 
  setShowConnectionStatus 
}) => {
  const [testItems, setTestItems] = useState<TestItem[]>(initialTestItems);
  const [isTesting, setIsTesting] = useState(false);

  const runAllTests = () => {
    setIsTesting(true);
    setTestItems(items => items.map(item => ({ ...item, status: 'testing' })));
    
    setTimeout(() => {
      setTestItems(items => items.map(item => ({
        ...item,
        status: Math.random() > 0.3 ? 'success' : 'failed'
      })));
      setIsTesting(false);
    }, 2000);
  };
  
  const getStatusIcon = (status: TestItem['status']) => {
    const iconSize = "w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 lg:w-6 lg:h-6";
    switch (status) {
      case 'pending': return <Server className={`${iconSize} ${theme.textSecondary}`} aria-label="Pending" />;
      case 'testing': return <Loader2 className={`${iconSize} ${theme.icon} animate-spin`} aria-label="Testing..." />;
      case 'success': return <CheckCircle className={`${iconSize} text-green-500`} aria-label="Success" />;
      case 'failed': return <AlertCircle className={`${iconSize} text-red-500`} aria-label="Failed" />;
      default: return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 flex items-center justify-center p-3 sm:p-4" 
      onClick={onClose}
    >
      <div 
        className={`${theme.card} backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border ${isMidnightTheme || currentThemeKey === 'black' ? 'border-gray-700/50' : 'border-white/20'} w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl flex flex-col overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: 'calc(100vh - 2rem)' }}
      >
        <div className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6 flex items-center justify-between rounded-t-xl sm:rounded-t-2xl shrink-0`}>
           <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
            <TestTubeDiagonal size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">Connectivity Tests</h2>
          </div>
          <button onClick={onClose} className={`p-1 sm:p-1.5 md:p-2 lg:p-2.5 hover:bg-white/20 rounded-full transition-colors ${theme.textOnAccent}`}>
            <X size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            <div className="w-full md:w-3/5 p-3 sm:p-4 md:p-6 lg:p-8 border-b md:border-b-0 md:border-r ${isMidnightTheme ? 'border-gray-700/60' : 'border-gray-300/70'} overflow-y-auto">
                <h3 className={`text-sm sm:text-md md:text-lg lg:text-xl font-semibold ${theme.textPrimary} mb-2 sm:mb-3 lg:mb-4`}>NOAH Services:</h3>
                <div className="space-y-2 sm:space-y-3 md:space-y-3.5 max-h-60 sm:max-h-80 md:max-h-[calc(100vh - 280px)] lg:max-h-[calc(100vh-260px)] overflow-y-auto pr-1 sm:pr-2">
                    {testItems.map(item => (
                        <div key={item.id} className={`flex items-center justify-between p-2 sm:p-2.5 md:p-3 lg:p-3.5 rounded-md sm:rounded-lg ${theme.inputBackground} ${theme.textPrimary} text-xs sm:text-sm md:text-base lg:text-lg`}>
                            <span className="truncate pr-2">{item.name}</span>
                            {getStatusIcon(item.status)}
                        </div>
                    ))}
                </div>
            </div>

            <div className={`w-full md:w-2/5 p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 shrink-0 ${isMidnightTheme || currentThemeKey === 'black' ? 'bg-gray-800/40' : 'bg-slate-50/60'}`}>
                <button 
                    onClick={() => setShowConnectionStatus && setShowConnectionStatus(true)}
                    disabled={isTesting}
                    className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} transition-colors text-xs sm:text-sm md:text-base lg:text-lg ${isTesting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label="Open Wi-Fi Settings"
                    >
                    <Wifi size={16} className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span>Wifi Settings</span>
                </button>
                <button 
                    disabled={isTesting}
                    className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} ${theme.buttonSecondaryHoverBg} transition-colors text-xs sm:text-sm md:text-base lg:text-lg ${isTesting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <UploadCloud size={16} className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span>Send Log to USB</span>
                </button>
                <button 
                    onClick={runAllTests}
                    disabled={isTesting}
                    className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium bg-blue-500 hover:bg-blue-600 text-white transition-colors text-xs sm:text-sm md:text-base lg:text-lg ${isTesting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <TestTubeDiagonal size={16} className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span>{isTesting ? 'Running Tests...' : 'Run Tests'}</span>
                </button>
                <div className="flex-grow"></div>
                 <button 
                    onClick={onClose}
                    disabled={isTesting}
                    className={`w-full flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-3.5 rounded-md sm:rounded-lg font-medium bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} hover:opacity-90 transition-opacity text-xs sm:text-sm md:text-base lg:text-lg ${isTesting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                    <ArrowLeft size={16} className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    <span>Return</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectivityTestScreen;
