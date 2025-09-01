import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// Remove these imports - no longer needed:
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { API_URLS } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ConnectionStatusScreen from '@/components/Screens/DeviceSetup/ConnectionStatusScreen';
import ConnectivityTestScreen from '@/components/Screens/DeviceSetup/ConnectivityTestScreen';
import { useUIStore } from '@/stores/uiStore';

// Remove this line - we'll use the one from queryClient.ts:
// const queryClient = new QueryClient();

/**
 * The main application component.
 * This component sets up the main layout, routing, and global providers.
 * QueryClientProvider is now in index.tsx to avoid duplication
 */
const App: React.FC = () => {
  const { theme, currentThemeKey, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const {
    showConnectionStatus,
    setShowConnectionStatus,
    showConnectivityTest,
    setShowConnectivityTest,
  } = useUIStore();

  return (
    <>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;


// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import { API_URLS } from '@/constants';
// import { useTheme } from '@/contexts/ThemeContext';
// import ThemeToggle from '@/components/ui/ThemeToggle';
// import ConnectionStatusScreen from '@/components/Screens/DeviceSetup/ConnectionStatusScreen';
// import ConnectivityTestScreen from '@/components/Screens/DeviceSetup/ConnectivityTestScreen';
// import { useUIStore } from '@/stores/uiStore';

// const queryClient = new QueryClient();

// /**
//  * The main application component.
//  * This component sets up the main layout, routing, and global providers.
//  */
// const App: React.FC = () => {
//   const { theme, currentThemeKey, isMidnightTheme } = useTheme();
//   const navigate = useNavigate();
//   const {
//     showConnectionStatus,
//     setShowConnectionStatus,
//     showConnectivityTest,
//     setShowConnectivityTest,
//   } = useUIStore();

//   return (
//     <QueryClientProvider client={queryClient}>
//       {/* Main application container */}
//       <div className={`relative min-h-screen bg-gradient-to-br ${theme.background}`}>
//         {/* Theme toggle button */}
//         <ThemeToggle
//           className="fixed top-4 right-4 z-[60]"
//           disabled={false}
//         />

//         {/* Render the current route's component */}
//         <Outlet context={{ setShowConnectionStatus, setShowConnectivityTest }} />

//         {/* Connection status modal */}
//         {showConnectionStatus && (
//           <ConnectionStatusScreen
//             theme={theme}
//             isMidnightTheme={isMidnightTheme}
//             currentThemeKey={currentThemeKey}
//             setCurrentScreen={(screen) => navigate(`/${screen}`)}
//             onClose={() => setShowConnectionStatus(false)}
//             setShowConnectivityTest={setShowConnectivityTest}
//           />
//         )}

//         {/* Connectivity test modal */}
//         {showConnectivityTest && (
//           <ConnectivityTestScreen
//             theme={theme}
//             isMidnightTheme={isMidnightTheme}
//             currentThemeKey={currentThemeKey}
//             setCurrentScreen={(screen) => navigate(`/${screen}`)}
//             onClose={() => setShowConnectivityTest(false)}
//             setShowConnectionStatus={setShowConnectionStatus}
//           />
//         )}
//       </div>
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// };

// export default App;
