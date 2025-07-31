import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { API_URLS } from './constants';
import { useTheme } from './src/contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ConnectionStatusScreen from './components/ConnectionStatusScreen';
import ConnectivityTestScreen from './components/ConnectivityTestScreen';
import useSignalR from './src/hooks/useSignalR';
import { useUIStore } from './src/stores/uiStore';

const queryClient = new QueryClient();

/**
 * The main application component.
 * This component sets up the main layout, routing, and global providers.
 */
const App: React.FC = () => {
  const { connectionState } = useSignalR(API_URLS.SIGNALR_HUB);
  const { theme, currentThemeKey, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const {
    showConnectionStatus,
    setShowConnectionStatus,
    showConnectivityTest,
    setShowConnectivityTest,
  } = useUIStore();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Display SignalR connection status */}
      <div className="fixed top-0 left-0 p-4 z-50">
        <p className="text-white">SignalR Status: {connectionState}</p>
      </div>
      {/* Main application container */}
      <div className={`relative min-h-screen bg-gradient-to-br ${theme.background}`}>
        {/* Theme toggle button */}
        <ThemeToggle
          className="fixed top-4 right-4 z-[60]"
          disabled={false}
        />

        {/* Render the current route's component */}
        <Outlet context={{ setShowConnectionStatus, setShowConnectivityTest }} />

        {/* Connection status modal */}
        {showConnectionStatus && (
          <ConnectionStatusScreen
            theme={theme}
            isMidnightTheme={isMidnightTheme}
            currentThemeKey={currentThemeKey}
            setCurrentScreen={(screen) => navigate(`/${screen}`)}
            onClose={() => setShowConnectionStatus(false)}
            setShowConnectivityTest={setShowConnectivityTest}
          />
        )}

        {/* Connectivity test modal */}
        {showConnectivityTest && (
          <ConnectivityTestScreen
            theme={theme}
            isMidnightTheme={isMidnightTheme}
            currentThemeKey={currentThemeKey}
            setCurrentScreen={(screen) => navigate(`/${screen}`)}
            onClose={() => setShowConnectivityTest(false)}
            setShowConnectionStatus={setShowConnectionStatus}
          />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
