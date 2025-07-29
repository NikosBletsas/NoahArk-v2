import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { API_URLS } from './constants';
import { useTheme } from './src/contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ConnectionStatusScreen from './components/ConnectionStatusScreen';
import ConnectivityTestScreen from './components/ConnectivityTestScreen';
import useSignalR from './src/hooks/useSignalR';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { connectionState } = useSignalR(API_URLS.SIGNALR_HUB);
  const { theme, currentThemeKey, isMidnightTheme } = useTheme();
  const navigate = useNavigate();

  const [showConnectionStatus, setShowConnectionStatus] = useState(false);
  const [showConnectivityTest, setShowConnectivityTest] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed top-0 left-0 p-4 z-50">
        <p className="text-white">SignalR Status: {connectionState}</p>
      </div>
      <div className={`relative min-h-screen bg-gradient-to-br ${theme.background}`}>
        <ThemeToggle
          className="fixed top-4 right-4 z-[60]"
          disabled={false}
        />

        <Outlet context={{ setShowConnectionStatus, setShowConnectivityTest }} />

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
