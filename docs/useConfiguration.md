---
id: useConfiguration
title: useConfiguration Hook Documentation
---

# useConfiguration Hook Documentation

## Overview

The `useConfiguration` hook manages application configuration settings with caching, automatic updates, and comprehensive error handling. It provides a clean interface for reading and updating system configuration in the Noah Ark medical application.

## Location
`src/hooks/useConfiguration.ts`

## Purpose
- Retrieve current application configuration with caching
- Update configuration settings with validation
- Handle configuration initialization errors
- Provide automatic cache invalidation and refresh

## API Integration
- **Get Configuration**: `GET /api/Configuration/GetConfiguration`
- **Set Configuration**: `POST /api/Configuration/SetConfiguration`
- **Caching**: 5-minute stale time with automatic refresh

## Interface

### Return Object
```typescript
{
  // Configuration Data
  configuration: any;
  isLoadingConfiguration: boolean;
  isConfigurationError: boolean;
  
  // Configuration Updates
  updateConfiguration: (configData: any) => void;
  isUpdatingConfiguration: boolean;
  
  // Manual Control
  refreshConfiguration: () => void;
  
  // Error Handling
  error: string | null;
  clearError: () => void;
}
```

## Properties

### Configuration Data

#### `configuration`
- **Type**: `any`
- **Purpose**: Contains current application configuration object
- **Caching**: Cached for 5 minutes, then considered stale
- **Usage**: Access configuration settings throughout the application

#### `isLoadingConfiguration`
- **Type**: `boolean`
- **Purpose**: Indicates if configuration is being loaded initially
- **Usage**: Show loading states during app initialization

#### `isConfigurationError`
- **Type**: `boolean`
- **Purpose**: Indicates if configuration loading failed
- **Usage**: Show error states and retry options

### Configuration Updates

#### `updateConfiguration`
- **Type**: `(configData: any) => void`
- **Purpose**: Update application configuration settings
- **Features**: Automatic cache invalidation after successful update
- **Parameters**: Configuration object with updated settings

#### `isUpdatingConfiguration`
- **Type**: `boolean`
- **Purpose**: Indicates if configuration update is in progress
- **Usage**: Show saving states and disable form controls

### Manual Control

#### `refreshConfiguration`
- **Type**: `() => void`
- **Purpose**: Manually refresh configuration from server
- **Usage**: Force reload configuration when needed

### Error Handling

#### `error`
- **Type**: `string | null`
- **Purpose**: Contains error messages from configuration operations
- **Error Types**: Initialization errors, update failures, network issues

#### `clearError`
- **Type**: `() => void`
- **Purpose**: Clear error state
- **Usage**: Reset error state after user acknowledgment

## Usage Examples

### Basic Configuration Access
```typescript
import { useConfiguration } from '../src/hooks/useConfiguration';

const SettingsScreen = () => {
  const { 
    configuration, 
    isLoadingConfiguration, 
    isConfigurationError,
    error 
  } = useConfiguration();

  if (isLoadingConfiguration) {
    return <div>Loading configuration...</div>;
  }

  if (isConfigurationError) {
    return (
      <div className="error">
        <p>Failed to load configuration</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Application Settings</h2>
      <pre>{JSON.stringify(configuration, null, 2)}</pre>
    </div>
  );
};
```

### Configuration Update Form
```typescript
const ConfigurationForm = () => {
  const { 
    configuration, 
    updateConfiguration, 
    isUpdatingConfiguration,
    error,
    clearError
  } = useConfiguration();

  const [formData, setFormData] = useState({});

  // Initialize form with current configuration
  useEffect(() => {
    if (configuration) {
      setFormData(configuration);
    }
  }, [configuration]);

  const handleSubmit = (e) => {
    e.preventDefault();
    clearError();
    updateConfiguration(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Configuration Settings</h2>
      
      {error && (
        <div className="error-alert">
          <span>{error}</span>
          <button type="button" onClick={clearError}>Dismiss</button>
        </div>
      )}

      {/* Server Settings */}
      <fieldset>
        <legend>Server Settings</legend>
        
        <label>
          Server URL:
          <input
            type="url"
            value={formData.serverUrl || ''}
            onChange={(e) => handleInputChange('serverUrl', e.target.value)}
            disabled={isUpdatingConfiguration}
          />
        </label>

        <label>
          API Timeout (seconds):
          <input
            type="number"
            value={formData.apiTimeout || 30}
            onChange={(e) => handleInputChange('apiTimeout', parseInt(e.target.value))}
            disabled={isUpdatingConfiguration}
          />
        </label>
      </fieldset>

      {/* Device Settings */}
      <fieldset>
        <legend>Device Settings</legend>
        
        <label>
          <input
            type="checkbox"
            checked={formData.autoConnectDevices || false}
            onChange={(e) => handleInputChange('autoConnectDevices', e.target.checked)}
            disabled={isUpdatingConfiguration}
          />
          Auto-connect to medical devices
        </label>

        <label>
          Scanner Resolution:
          <select
            value={formData.scannerResolution || '300'}
            onChange={(e) => handleInputChange('scannerResolution', e.target.value)}
            disabled={isUpdatingConfiguration}
          >
            <option value="150">150 DPI</option>
            <option value="300">300 DPI</option>
            <option value="600">600 DPI</option>
          </select>
        </label>
      </fieldset>

      {/* UI Settings */}
      <fieldset>
        <legend>User Interface</legend>
        
        <label>
          Theme:
          <select
            value={formData.theme || 'light'}
            onChange={(e) => handleInputChange('theme', e.target.value)}
            disabled={isUpdatingConfiguration}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="midnight">Midnight</option>
          </select>
        </label>

        <label>
          Language:
          <select
            value={formData.language || 'en'}
            onChange={(e) => handleInputChange('language', e.target.value)}
            disabled={isUpdatingConfiguration}
          >
            <option value="en">English</option>
            <option value="el">Greek</option>
            <option value="fr">French</option>
          </select>
        </label>
      </fieldset>

      <div className="form-actions">
        <button 
          type="submit" 
          disabled={isUpdatingConfiguration}
        >
          {isUpdatingConfiguration ? 'Saving...' : 'Save Configuration'}
        </button>
        
        <button 
          type="button" 
          onClick={() => setFormData(configuration)}
          disabled={isUpdatingConfiguration}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
```

### Device Configuration Screen
```typescript
const DeviceConfigurationScreen = () => {
  const { 
    configuration, 
    updateConfiguration, 
    isLoadingConfiguration,
    isUpdatingConfiguration,
    refreshConfiguration,
    error 
  } = useConfiguration();

  const [deviceSettings, setDeviceSettings] = useState({});

  useEffect(() => {
    if (configuration?.devices) {
      setDeviceSettings(configuration.devices);
    }
  }, [configuration]);

  const updateDeviceConfig = (deviceType, settings) => {
    const updatedConfig = {
      ...configuration,
      devices: {
        ...configuration.devices,
        [deviceType]: {
          ...configuration.devices[deviceType],
          ...settings
        }
      }
    };
    
    updateConfiguration(updatedConfig);
  };

  const handleRefresh = () => {
    refreshConfiguration();
  };

  if (isLoadingConfiguration) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading device configuration...</p>
      </div>
    );
  }

  return (
    <div className="device-config">
      <div className="header">
        <h2>Device Configuration</h2>
        <button onClick={handleRefresh}>Refresh</button>
      </div>

      {error && (
        <div className="error-banner">{error}</div>
      )}

      {/* Patient Monitor Configuration */}
      <div className="device-section">
        <h3>Patient Monitor</h3>
        <div className="device-controls">
          <label>
            <input
              type="checkbox"
              checked={deviceSettings.patientMonitor?.enabled || false}
              onChange={(e) => updateDeviceConfig('patientMonitor', {
                enabled: e.target.checked
              })}
              disabled={isUpdatingConfiguration}
            />
            Enable Patient Monitor
          </label>

          <label>
            Refresh Rate (seconds):
            <input
              type="number"
              min="1"
              max="60"
              value={deviceSettings.patientMonitor?.refreshRate || 5}
              onChange={(e) => updateDeviceConfig('patientMonitor', {
                refreshRate: parseInt(e.target.value)
              })}
              disabled={isUpdatingConfiguration}
            />
          </label>
        </div>
      </div>

      {/* Blood Pressure Monitor Configuration */}
      <div className="device-section">
        <h3>Blood Pressure Monitor</h3>
        <div className="device-controls">
          <label>
            <input
              type="checkbox"
              checked={deviceSettings.bloodPressure?.enabled || false}
              onChange={(e) => updateDeviceConfig('bloodPressure', {
                enabled: e.target.checked
              })}
              disabled={isUpdatingConfiguration}
            />
            Enable Blood Pressure Monitor
          </label>

          <label>
            Auto-save readings:
            <input
              type="checkbox"
              checked={deviceSettings.bloodPressure?.autoSave || false}
              onChange={(e) => updateDeviceConfig('bloodPressure', {
                autoSave: e.target.checked
              })}
              disabled={isUpdatingConfiguration}
            />
          </label>
        </div>
      </div>

      {/* Scanner Configuration */}
      <div className="device-section">
        <h3>Document Scanner</h3>
        <div className="device-controls">
          <label>
            Default Resolution:
            <select
              value={deviceSettings.scanner?.resolution || '300'}
              onChange={(e) => updateDeviceConfig('scanner', {
                resolution: e.target.value
              })}
              disabled={isUpdatingConfiguration}
            >
              <option value="150">150 DPI</option>
              <option value="300">300 DPI</option>
              <option value="600">600 DPI</option>
            </select>
          </label>

          <label>
            Color Mode:
            <select
              value={deviceSettings.scanner?.colorMode || 'color'}
              onChange={(e) => updateDeviceConfig('scanner', {
                colorMode: e.target.value
              })}
              disabled={isUpdatingConfiguration}
            >
              <option value="color">Color</option>
              <option value="grayscale">Grayscale</option>
              <option value="blackwhite">Black & White</option>
            </select>
          </label>
        </div>
      </div>

      {isUpdatingConfiguration && (
        <div className="saving-overlay">
          <div className="saving-message">
            <div className="spinner"></div>
            <p>Saving configuration...</p>
          </div>
        </div>
      )}
    </div>
  );
};
```

## Configuration Structure

### Typical Configuration Object
```typescript
interface AppConfiguration {
  // Server Settings
  server: {
    url: string;
    timeout: number;
    retryAttempts: number;
  };
  
  // Device Settings
  devices: {
    patientMonitor: {
      enabled: boolean;
      refreshRate: number;
      autoConnect: boolean;
    };
    bloodPressure: {
      enabled: boolean;
      autoSave: boolean;
      units: 'mmHg' | 'kPa';
    };
    scanner: {
      resolution: '150' | '300' | '600';
      colorMode: 'color' | 'grayscale' | 'blackwhite';
      autoSave: boolean;
    };
  };
  
  // UI Settings
  ui: {
    theme: 'light' | 'dark' | 'midnight';
    language: string;
    fontSize: 'small' | 'medium' | 'large';
    animations: boolean;
  };
  
  // Security Settings
  security: {
    sessionTimeout: number;
    requireStrongPasswords: boolean;
    enableAuditLog: boolean;
  };
  
  // Data Settings
  data: {
    autoBackup: boolean;
    backupInterval: number;
    retentionPeriod: number;
  };
}
```

## Error Handling

### Initialization Errors
```typescript
if (error.status === 501) {
  setError('Application not initialized - please restart');
}
```

### Update Errors
```typescript
else if (error.status === 503) {
  setError('Configuration save failed - please try again');
}
```

### Network Errors
```typescript
else if (error instanceof Error) {
  setError(`Configuration error: ${error.message}`);
}
```

## Caching Strategy

### Automatic Caching
```typescript
// In useConfiguration.ts
const configurationQuery = useQuery({
  queryKey: ['configuration'],
  queryFn: () => apiClient.api.configurationGetConfigurationList(),
  staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  retry: 2,
});
```

### Cache Invalidation
```typescript
// After successful update
onSuccess: () => {
  setError(null);
  // Invalidate and refetch configuration after successful update
  configurationQuery.refetch();
}
```

## Performance Considerations

### Lazy Loading
```typescript
// Only load configuration when needed
const ConfigurationProvider = ({ children }) => {
  const { configuration, isLoadingConfiguration } = useConfiguration();
  
  if (isLoadingConfiguration) {
    return <LoadingScreen />;
  }
  
  return (
    <ConfigurationContext.Provider value={configuration}>
      {children}
    </ConfigurationContext.Provider>
  );
};
```

### Debounced Updates
```typescript
// Debounce configuration updates
const debouncedUpdate = useCallback(
  debounce((config) => updateConfiguration(config), 1000),
  [updateConfiguration]
);
```

## Security Considerations

### Sensitive Settings
- Don't expose sensitive configuration in client-side code
- Validate configuration changes on server
- Log configuration changes for audit

### Access Control
- Verify user permissions before allowing configuration changes
- Implement role-based configuration access
- Secure configuration endpoints

## Testing

### Unit Tests
```typescript
describe('useConfiguration', () => {
  it('should load configuration', async () => {
    const { result } = renderHook(() => useConfiguration());
    
    await waitFor(() => {
      expect(result.current.configuration).toBeTruthy();
    });
  });

  it('should update configuration', async () => {
    const { result } = renderHook(() => useConfiguration());
    
    act(() => {
      result.current.updateConfiguration({ theme: 'dark' });
    });
    
    await waitFor(() => {
      expect(result.current.isUpdatingConfiguration).toBe(false);
    });
  });
});
```

## Dependencies

### Required Packages
- `@tanstack/react-query`: Query and caching management
- `../api`: API client instance

## Troubleshooting

### Common Issues
1. **Configuration not loading**: Check API endpoint and authentication
2. **Updates not saving**: Verify user permissions and network connectivity
3. **Stale configuration**: Use `refreshConfiguration()` to force reload
4. **Cache issues**: Clear React Query cache if needed

### Debug Tips
- Use React Query DevTools to inspect cache state
- Check network tab for API call details
- Verify configuration object structure
- Test with minimal configuration changes first