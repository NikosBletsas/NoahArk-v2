import React, { useState } from 'react';
import { THEMES, SCREEN_NAMES, THEME_KEYS } from './constants';
import { ThemeKey, ScreenName, Theme } from './types';
import ThemeToggle from './components/ThemeToggle';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import PatientSearchScreen from './components/PatientSearchScreen';
import MedicalMeasurementsScreen from './components/MedicalMeasurementsScreen';
import SystemOperationsScreen from './components/SystemOperationsScreen';
import SpirometerScreen from './components/SpirometerScreen';
import EndoscopeScreen from './components/EndoscopeScreen';
import SettingsScreen from './components/SettingsScreen';
import AssignEmergencyScreen from './components/AssignEmergencyScreen';
import EmergencyCaseDiagnosisScreen from './components/EmergencyCaseDiagnosisScreen';
import DeviceConfigurationScreen from './components/DeviceConfigurationScreen';
import ConnectionStatusScreen from './components/ConnectionStatusScreen';
import ConnectivityTestScreen from './components/ConnectivityTestScreen';
import ConsultationsScreen from './components/ConsultationScreen';

/**
 * Main application component.
 * Manages the current screen, theme, and global modals.
 */
const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(SCREEN_NAMES.LOGIN);
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>('noah');
  const [showConnectionStatus, setShowConnectionStatus] = useState(false);
  const [showConnectivityTest, setShowConnectivityTest] = useState(false);
  const theme: Theme = THEMES[currentThemeKey];
  const isMidnightTheme = currentThemeKey === 'black';

  /**
   * Handles theme changes - restricted to light ('noah') and dark ('black') modes
   * @param themeKey 
   */
  const handleThemeChange = (themeKey: string) => {
    
    if (themeKey === 'noah' || themeKey === 'black') {
      setCurrentThemeKey(themeKey as ThemeKey);
    }
  };

  /**
   * Handles setting the current screen and ensures modals are closed
   * when transitioning between main screens.
   * @param screen 
   */
  const handleSetCurrentScreen = (screen: ScreenName) => {
    
    if (screen !== SCREEN_NAMES.DEVICE_CONFIGURATION && screen !== SCREEN_NAMES.LOGIN) {
        setShowConnectionStatus(false);
        setShowConnectivityTest(false);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
   
    const shouldPassModalSetters = 
      currentScreen === SCREEN_NAMES.DEVICE_CONFIGURATION ||
      currentScreen === SCREEN_NAMES.LOGIN;

    const commonScreenProps = { 
        theme, 
        setCurrentScreen: handleSetCurrentScreen, 
        isMidnightTheme, 
        currentThemeKey: currentThemeKey as string,
        onThemeChange: handleThemeChange,
        setShowConnectionStatus: shouldPassModalSetters ? setShowConnectionStatus : undefined,
        setShowConnectivityTest: shouldPassModalSetters ? setShowConnectivityTest : undefined,
      };

    switch (currentScreen) {
      case SCREEN_NAMES.LOGIN:
        return <LoginScreen {...commonScreenProps} />;
      case SCREEN_NAMES.DASHBOARD:
        return <DashboardScreen {...commonScreenProps} />;
      case SCREEN_NAMES.PATIENT_SEARCH:
        return <PatientSearchScreen {...commonScreenProps} />;
      case SCREEN_NAMES.MEASUREMENTS:
        return <MedicalMeasurementsScreen {...commonScreenProps} />;
      case SCREEN_NAMES.SYSTEM_OPERATIONS:
        return <SystemOperationsScreen {...commonScreenProps} />;
      case SCREEN_NAMES.SPIROMETER:
        return <SpirometerScreen {...commonScreenProps} />;
      case SCREEN_NAMES.ENDOSCOPE:
        return <EndoscopeScreen {...commonScreenProps} />;
      case SCREEN_NAMES.SETTINGS:
        return <SettingsScreen {...commonScreenProps} />;
      case SCREEN_NAMES.ASSIGN_EMERGENCY:
        return <AssignEmergencyScreen {...commonScreenProps} />;
      case SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS:
        return <EmergencyCaseDiagnosisScreen {...commonScreenProps} />;
      case SCREEN_NAMES.DEVICE_CONFIGURATION:
        return <DeviceConfigurationScreen {...commonScreenProps} />;
      case SCREEN_NAMES.CASE_CONSULTATIONS: 
        return <ConsultationsScreen {...commonScreenProps} />;
      default:
        return <LoginScreen {...commonScreenProps} />;
    }
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${theme.background}`}>
      
      {/* Global Theme Toggle - With proper spacing and z-index */}
      <ThemeToggle
        currentThemeKey={currentThemeKey}
        onThemeChange={handleThemeChange}
        className="fixed top-4 right-4 z-[60]"
        disabled={false}
      />

      {/* Main screen content - no extra padding, screens handle their own spacing */}
      {renderScreen()}

      {/* Connection Status Modal */}
      {showConnectionStatus && (
        <ConnectionStatusScreen
          theme={theme}
          isMidnightTheme={isMidnightTheme}
          currentThemeKey={currentThemeKey}
          setCurrentScreen={handleSetCurrentScreen} 
          onClose={() => setShowConnectionStatus(false)}
          setShowConnectivityTest={setShowConnectivityTest}
        />
      )}

      {/* Connectivity Test Modal */}
      {showConnectivityTest && (
        <ConnectivityTestScreen
          theme={theme}
          isMidnightTheme={isMidnightTheme}
          currentThemeKey={currentThemeKey}
          setCurrentScreen={handleSetCurrentScreen}
          onClose={() => setShowConnectivityTest(false)}
          setShowConnectionStatus={setShowConnectionStatus}
        />
      )}
    </div>
  );
};

export default App;