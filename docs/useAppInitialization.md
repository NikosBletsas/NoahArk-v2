---
id: useAppInitialization
title: useAppInitialization Hook Documentation
---

# useAppInitialization Hook Documentation

## Overview

The `useAppInitialization` hook manages the complete application startup sequence including login API initialization, main application initialization, session recovery, and system monitoring. It provides comprehensive functionality for application lifecycle management in the Noah Ark medical system.

## Location
`src/hooks/useAppInitialization.ts`

## Purpose
- Initialize login API with license validation
- Initialize main application with session recovery
- Manage recovery sessions from previous crashes
- Monitor system battery status
- Handle application startup errors and edge cases

## API Integration
- **Login API Init**: `GET /api/LoginAPI/Init`
- **Main App Init**: `GET /api/Main/Init`
- **Recovery Session**: `GET /api/Main/SetRecoverySession`
- **Battery Status**: `GET /api/Main/GetBatteryStatus`

## Interface

### Return Object
```typescript
{
  // Login API Initialization
  initLoginApi: () => void;
  isInitializingLoginApi: boolean;
  
  // Main App Initialization
  initMainApp: () => void;
  isInitializingMainApp: boolean;
  recoveredSessions: any[];
  
  // Recovery Session Management
  setRecoverySession: (sessionID: string) => void;
  isSettingRecoverySession: boolean;
  
  // Battery Status Monitoring
  getBatteryStatus: () => void;
  batteryStatus: any;
  isLoadingBatteryStatus: boolean;
  
  // Common State
  error: string | null;
  clearError: () => void;
  clearRecoveredSessions: () => void;
}
```

## Properties

### Login API Initialization

#### `initLoginApi`
- **Type**: `() => void`
- **Purpose**: Initialize the login API system with license validation
- **Usage**: Call during application startup before user login
- **Features**: License key validation, directory creation, configuration reading

#### `isInitializingLoginApi`
- **Type**: `boolean`
- **Purpose**: Indicates if login API initialization is in progress
- **Usage**: Show startup loading screens and prevent user interaction

### Main App Initialization

#### `initMainApp`
- **Type**: `() => void`
- **Purpose**: Initialize main application after successful login
- **Features**: Session recovery, timer startup, user status checking
- **Usage**: Call after user authentication is complete

#### `isInitializingMainApp`
- **Type**: `boolean`
- **Purpose**: Indicates if main app initialization is in progress
- **Usage**: Show post-login loading states

#### `recoveredSessions`
- **Type**: `any[]`
- **Purpose**: Contains list of recovered sessions from previous crashes
- **Usage**: Present session recovery options to user

### Recovery Session Management

#### `setRecoverySession`
- **Type**: `(sessionID: string) => void`
- **Purpose**: Set a specific recovery session as active
- **Parameters**: Session ID from recovered sessions list
- **Usage**: Restore user's previous work session

#### `isSettingRecoverySession`
- **Type**: `boolean`
- **Purpose**: Indicates if recovery session is being set
- **Usage**: Show loading state during session restoration

### Battery Status Monitoring

#### `getBatteryStatus`
- **Type**: `() => void`
- **Purpose**: Get current system battery status
- **Features**: Auto-refresh every 30 seconds when active
- **Usage**: Monitor power status for critical operations

#### `batteryStatus`
- **Type**: `any`
- **Purpose**: Contains detailed battery information
- **Data**: AC status, battery percentage, charging state, time remaining

#### `isLoadingBatteryStatus`
- **Type**: `boolean`
- **Purpose**: Indicates if battery status is being fetched
- **Usage**: Show loading indicators for battery status

### Common State

#### `error`
- **Type**: `string | null`
- **Purpose**: Contains error messages from initialization operations
- **Error Types**: License errors, connectivity issues, initialization failures

#### `clearError`
- **Type**: `() => void`
- **Purpose**: Clear error state
- **Usage**: Reset error state after user acknowledgment

#### `clearRecoveredSessions`
- **Type**: `() => void`
- **Purpose**: Clear recovered sessions list
- **Usage**: Clean up after session recovery is complete

## Usage Examples

### Application Startup Sequence
```typescript
import { useAppInitialization } from '../src/hooks/useAppInitialization';

const AppStartup = () => {
  const { 
    initLoginApi, 
    isInitializingLoginApi, 
    error, 
    clearError 
  } = useAppInitialization();

  const [startupPhase, setStartupPhase] = useState('initializing');

  useEffect(() => {
    // Start initialization sequence
    initLoginApi();
  }, [initLoginApi]);

  // Handle initialization completion
  useEffect(() => {
    if (!isInitializingLoginApi && !error) {
      setStartupPhase('ready');
    }
  }, [isInitializingLoginApi, error]);

  if (startupPhase === 'initializing') {
    return (
      <div className="startup-screen">
        <div className="logo">
          <img src="/logo.png" alt="Noah Ark" />
        </div>
        
        {isInitializingLoginApi ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Initializing application...</p>
          </div>
        ) : error ? (
          <div className="error">
            <h3>Initialization Failed</h3>
            <p>{error}</p>
            <button onClick={clearError}>Retry</button>
          </div>
        ) : (
          <div className="ready">
            <p>Application ready</p>
          </div>
        )}
      </div>
    );
  }

  return <LoginScreen />;
};
```

### Post-Login Initialization
```typescript
const PostLoginInitialization = ({ onComplete }) => {
  const { 
    initMainApp, 
    isInitializingMainApp, 
    recoveredSessions,
    setRecoverySession,
    isSettingRecoverySession,
    error 
  } = useAppInitialization();

  const [showRecoveryOptions, setShowRecoveryOptions] = useState(false);

  useEffect(() => {
    // Initialize main app after login
    initMainApp();
  }, [initMainApp]);

  // Handle recovered sessions
  useEffect(() => {
    if (recoveredSessions.length > 0) {
      setShowRecoveryOptions(true);
    } else if (!isInitializingMainApp && !error) {
      onComplete();
    }
  }, [recoveredSessions, isInitializingMainApp, error, onComplete]);

  const handleRecoveryChoice = (sessionId) => {
    if (sessionId) {
      setRecoverySession(sessionId);
    } else {
      // Skip recovery
      onComplete();
    }
  };

  // Handle recovery completion
  useEffect(() => {
    if (!isSettingRecoverySession && !showRecoveryOptions) {
      onComplete();
    }
  }, [isSettingRecoverySession, showRecoveryOptions, onComplete]);

  if (isInitializingMainApp) {
    return (
      <div className="post-login-init">
        <div className="loading">
          <div className="spinner"></div>
          <p>Setting up your workspace...</p>
        </div>
      </div>
    );
  }

  if (showRecoveryOptions) {
    return (
      <div className="recovery-screen">
        <h2>Session Recovery</h2>
        <p>We found {recoveredSessions.length} unsaved session(s) from your previous work.</p>
        
        <div className="recovery-options">
          {recoveredSessions.map(session => (
            <div key={session.id} className="session-option">
              <h3>{session.name || `Session ${session.id}`}</h3>
              <p>Last modified: {new Date(session.lastModified).toLocaleString()}</p>
              <p>Files: {session.fileCount}</p>
              <button 
                onClick={() => handleRecoveryChoice(session.id)}
                disabled={isSettingRecoverySession}
              >
                Restore This Session
              </button>
            </div>
          ))}
        </div>

        <div className="recovery-actions">
          <button 
            onClick={() => handleRecoveryChoice(null)}
            disabled={isSettingRecoverySession}
            className="skip-recovery"
          >
            Start Fresh
          </button>
        </div>

        {isSettingRecoverySession && (
          <div className="restoring">
            <div className="spinner"></div>
            <p>Restoring session...</p>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="init-error">
        <h3>Initialization Error</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Restart Application
        </button>
      </div>
    );
  }

  return null;
};
```

### Battery Status Monitor
```typescript
const BatteryStatusMonitor = () => {
  const { 
    getBatteryStatus, 
    batteryStatus, 
    isLoadingBatteryStatus 
  } = useAppInitialization();

  const [showBatteryWarning, setShowBatteryWarning] = useState(false);

  useEffect(() => {
    // Start battery monitoring
    getBatteryStatus();
  }, [getBatteryStatus]);

  // Monitor battery level
  useEffect(() => {
    if (batteryStatus) {
      const { batteryPercentage, isACOnline, isCritical, isLow } = batteryStatus;
      
      if (isCritical || (batteryPercentage < 10 && !isACOnline)) {
        setShowBatteryWarning(true);
      } else if (batteryPercentage > 20 || isACOnline) {
        setShowBatteryWarning(false);
      }
    }
  }, [batteryStatus]);

  if (!batteryStatus && !isLoadingBatteryStatus) {
    return null; // No battery or desktop system
  }

  return (
    <div className="battery-monitor">
      {showBatteryWarning && (
        <div className="battery-warning">
          <div className="warning-content">
            <h3>Low Battery Warning</h3>
            <p>
              Battery level: {batteryStatus.batteryPercentage}%
              {!batteryStatus.isACOnline && ' (Not charging)'}
            </p>
            <p>Please connect to power to avoid data loss.</p>
            <button onClick={() => setShowBatteryWarning(false)}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="battery-status">
        {isLoadingBatteryStatus ? (
          <div className="battery-loading">⚡</div>
        ) : (
          <div className={`battery-indicator ${batteryStatus.isCharging ? 'charging' : ''}`}>
            <div 
              className="battery-level"
              style={{ width: `${batteryStatus.batteryPercentage}%` }}
            ></div>
            <span className="battery-text">
              {batteryStatus.batteryPercentage}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
```

### Complete App Initialization Flow
```typescript
const AppInitializationManager = ({ children }) => {
  const { 
    initLoginApi,
    isInitializingLoginApi,
    initMainApp,
    isInitializingMainApp,
    recoveredSessions,
    setRecoverySession,
    isSettingRecoverySession,
    getBatteryStatus,
    error,
    clearError,
    clearRecoveredSessions
  } = useAppInitialization();

  const [initPhase, setInitPhase] = useState('startup');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Phase 1: Startup initialization
  useEffect(() => {
    if (initPhase === 'startup') {
      initLoginApi();
    }
  }, [initPhase, initLoginApi]);

  // Handle startup completion
  useEffect(() => {
    if (initPhase === 'startup' && !isInitializingLoginApi) {
      if (error) {
        setInitPhase('startup-error');
      } else {
        setInitPhase('login');
      }
    }
  }, [initPhase, isInitializingLoginApi, error]);

  // Phase 2: Post-login initialization
  useEffect(() => {
    if (isLoggedIn && initPhase === 'login') {
      setInitPhase('post-login');
      initMainApp();
      getBatteryStatus(); // Start battery monitoring
    }
  }, [isLoggedIn, initPhase, initMainApp, getBatteryStatus]);

  // Handle post-login completion
  useEffect(() => {
    if (initPhase === 'post-login' && !isInitializingMainApp) {
      if (error) {
        setInitPhase('post-login-error');
      } else if (recoveredSessions.length > 0) {
        setInitPhase('recovery');
      } else {
        setInitPhase('ready');
      }
    }
  }, [initPhase, isInitializingMainApp, error, recoveredSessions]);

  // Handle recovery completion
  useEffect(() => {
    if (initPhase === 'recovery' && !isSettingRecoverySession) {
      setInitPhase('ready');
      clearRecoveredSessions();
    }
  }, [initPhase, isSettingRecoverySession, clearRecoveredSessions]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRecoverySession = (sessionId) => {
    if (sessionId) {
      setRecoverySession(sessionId);
    } else {
      setInitPhase('ready');
      clearRecoveredSessions();
    }
  };

  const handleRetry = () => {
    clearError();
    if (initPhase === 'startup-error') {
      setInitPhase('startup');
    } else if (initPhase === 'post-login-error') {
      setInitPhase('post-login');
    }
  };

  // Render based on initialization phase
  switch (initPhase) {
    case 'startup':
      return (
        <StartupScreen 
          isLoading={isInitializingLoginApi}
          error={error}
          onRetry={handleRetry}
        />
      );

    case 'startup-error':
      return (
        <ErrorScreen 
          title="Startup Failed"
          message={error}
          onRetry={handleRetry}
        />
      );

    case 'login':
      return <LoginScreen onLogin={handleLogin} />;

    case 'post-login':
      return (
        <PostLoginScreen 
          isLoading={isInitializingMainApp}
          error={error}
        />
      );

    case 'post-login-error':
      return (
        <ErrorScreen 
          title="Initialization Failed"
          message={error}
          onRetry={handleRetry}
        />
      );

    case 'recovery':
      return (
        <RecoveryScreen 
          sessions={recoveredSessions}
          onSelectSession={handleRecoverySession}
          isLoading={isSettingRecoverySession}
        />
      );

    case 'ready':
      return (
        <>
          <BatteryStatusMonitor />
          {children}
        </>
      );

    default:
      return <div>Unknown initialization state</div>;
  }
};
```

## Battery Status Data Structure

### Battery Status Object
```typescript
interface BatteryStatus {
  isACOnline: boolean;           // AC power connected
  batteryPercentage: number;     // Battery level (0-100)
  batteryLifeRemaining: number | null;  // Minutes remaining
  batteryFullLifeTime: number | null;   // Full battery life
  status: number;                // Battery status code
  isBatteryPresent: boolean;     // Battery detected
  isCharging: boolean;           // Currently charging
  isCritical: boolean;           // Critical battery level
  isLow: boolean;                // Low battery level
  isHigh: boolean;               // High battery level
  statusDescription: string;     // Human-readable status
}
```

## Error Handling

### License Validation Errors
```typescript
if (error.status === 401) {
  setError('Invalid license key - please check your license');
}
```

### Connectivity Errors
```typescript
else if (error.status === 503) {
  setError('No connectivity to EMR API - check network connection');
}
```

### Session Recovery Errors
```typescript
if (error.status === 501) {
  setError('Please log in to set recovery session');
} else if (error.status === 503) {
  setError('Failed to set recovery session');
}
```

## State Management

### Initialization Flow
1. `initLoginApi()` called during app startup
2. `isInitializingLoginApi` becomes `true`
3. License validation and setup occurs
4. On success: ready for login; On error: show error screen

### Post-Login Flow
1. `initMainApp()` called after successful login
2. `isInitializingMainApp` becomes `true`
3. Session recovery and app setup occurs
4. `recoveredSessions` populated if sessions found
5. User chooses recovery option or starts fresh

### Battery Monitoring Flow
1. `getBatteryStatus()` called
2. `isLoadingBatteryStatus` becomes `true`
3. Battery data retrieved with auto-refresh
4. `batteryStatus` updated every 30 seconds
5. UI shows battery warnings when needed

## Performance Considerations

### Startup Optimization
```typescript
// Parallel initialization where possible
const initializeApp = async () => {
  const [loginResult, configResult] = await Promise.allSettled([
    initLoginApi(),
    loadConfiguration()
  ]);
  
  // Handle results
};
```

### Battery Monitoring Optimization
```typescript
// Reduce battery polling when on AC power
const batteryRefreshInterval = useMemo(() => {
  if (batteryStatus?.isACOnline) {
    return 60000; // 1 minute when on AC
  }
  return 30000; // 30 seconds when on battery
}, [batteryStatus?.isACOnline]);
```

## Security Considerations

### License Validation
- Secure license key storage and validation
- Handle license expiration gracefully
- Log license validation attempts

### Session Recovery
- Validate session data integrity
- Secure session storage
- Clear sensitive data from recovered sessions

## Testing

### Unit Tests
```typescript
describe('useAppInitialization', () => {
  it('should initialize login API', async () => {
    const { result } = renderHook(() => useAppInitialization());
    
    act(() => {
      result.current.initLoginApi();
    });
    
    await waitFor(() => {
      expect(result.current.isInitializingLoginApi).toBe(false);
    });
  });

  it('should handle recovery sessions', async () => {
    const { result } = renderHook(() => useAppInitialization());
    
    act(() => {
      result.current.initMainApp();
    });
    
    await waitFor(() => {
      expect(result.current.recoveredSessions).toBeDefined();
    });
  });
});
```

## Dependencies

### Required Packages
- `@tanstack/react-query`: Query and mutation management
- `../api`: API client instance
- System APIs for battery status

## Troubleshooting

### Common Issues
1. **License validation fails**: Check license key and network connectivity
2. **Session recovery fails**: Verify session data integrity
3. **Battery status unavailable**: Normal on desktop systems
4. **Initialization hangs**: Check API endpoint availability

### Debug Tips
- Check license key validity and format
- Verify network connectivity to EMR API
- Test with minimal session data
- Use React Query DevTools for state inspection