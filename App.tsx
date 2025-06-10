import React, { useState } from 'react';
import { THEMES, SCREEN_NAMES, THEME_KEYS } from './constants';
import { ThemeKey, ScreenName, Theme } from './types';
import ThemeSelector from './components/ThemeSelector';
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

/**
 * Main application component.
 * Manages the current screen, theme, and global modals.
 */
const App: React.FC = () => {
  // State for the currently displayed screen
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(SCREEN_NAMES.LOGIN);
  // State for the currently selected theme key
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>(THEME_KEYS[0]);
  // State for ThemeSelector modal visibility
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  // State for ConnectionStatus modal visibility
  const [showConnectionStatus, setShowConnectionStatus] = useState(false);
  // State for ConnectivityTest modal visibility
  const [showConnectivityTest, setShowConnectivityTest] = useState(false);


  // Get the full theme object based on the current key
  const theme: Theme = THEMES[currentThemeKey];
  // Helper boolean for dark themes (Midnight or Deep Black)
  const isMidnightTheme = currentThemeKey === 'midnight' || currentThemeKey === 'black';

  /**
   * Handles setting the current screen and ensures modals are closed
   * when transitioning between main screens.
   * @param screen - The name of the screen to navigate to.
   */
  const handleSetCurrentScreen = (screen: ScreenName) => {
    // Hide modals when changing main screen to prevent them from persisting incorrectly,
    // unless the target screen is one that might trigger them (like Device Configuration or Login)
    if (screen !== SCREEN_NAMES.DEVICE_CONFIGURATION && screen !== SCREEN_NAMES.LOGIN) {
        setShowConnectionStatus(false);
        setShowConnectivityTest(false);
    }
    setCurrentScreen(screen);
  };

  /**
   * Renders the currently active screen based on `currentScreen` state.
   * Passes down necessary props to each screen.
   */
  const renderScreen = () => {
    // Determine if modal setters should be passed to the current screen
    const shouldPassModalSetters = 
      currentScreen === SCREEN_NAMES.DEVICE_CONFIGURATION ||
      currentScreen === SCREEN_NAMES.LOGIN;

    // Common props passed to all main screens
    const commonScreenProps = { 
        theme, 
        setCurrentScreen: handleSetCurrentScreen, 
        setShowThemeSelector, 
        isMidnightTheme, 
        currentThemeKey,
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
        // SystemOperationsScreen is modal-like but managed as a main screen for now
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
      // Note: ConnectionStatus and ConnectivityTest are modals, rendered conditionally below,
      // not as primary screens via this switch statement.
      default:
        // Fallback to LoginScreen if an unknown screen name is encountered
        return <LoginScreen {...commonScreenProps} />;
    }
  };

  return (
    // Global font is applied via index.html <style> tag.
    // Root div for the application.
    <div>
      {renderScreen()}

      {/* Theme Selector Modal */}
      {showThemeSelector && (
        <ThemeSelector
          themes={THEMES}
          currentThemeKey={currentThemeKey}
          onThemeSelect={(key) => {
            setCurrentThemeKey(key);
            setShowThemeSelector(false);
          }}
          onClose={() => setShowThemeSelector(false)}
          isMidnightTheme={isMidnightTheme} // Used for modal's own text styling
        />
      )}

      {/* Connection Status Modal (conditionally rendered if its state is true) */}
      {showConnectionStatus && (
        <ConnectionStatusScreen
          theme={theme}
          isMidnightTheme={isMidnightTheme}
          currentThemeKey={currentThemeKey}
          setCurrentScreen={handleSetCurrentScreen} 
          onClose={() => setShowConnectionStatus(false)}
          setShowConnectivityTest={setShowConnectivityTest} // Allow opening one modal from another
        />
      )}

      {/* Connectivity Test Modal (conditionally rendered if its state is true) */}
      {showConnectivityTest && (
        <ConnectivityTestScreen
          theme={theme}
          isMidnightTheme={isMidnightTheme}
          currentThemeKey={currentThemeKey}
          setCurrentScreen={handleSetCurrentScreen}
          onClose={() => setShowConnectivityTest(false)}
          setShowConnectionStatus={setShowConnectionStatus} // Allow opening one modal from another
        />
      )}
    </div>
  );
};

export default App;