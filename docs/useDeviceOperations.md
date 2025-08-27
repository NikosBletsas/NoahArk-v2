---
id: useDeviceOperations
title: useDeviceOperations Hook Documentation
---

# useDeviceOperations Hook Documentation

## Overview

The `useDeviceOperations` hook manages medical device interactions including patient monitor initialization, blood pressure data retrieval, and device data transmission. It provides a unified interface for all device-related operations in the Noah Ark medical system.

## Location
`src/hooks/useDeviceOperations.ts`

## Purpose
- Initialize and manage patient monitoring devices
- Retrieve blood pressure measurements with auto-refresh
- Handle device data transmission
- Provide real-time device status updates

## API Integration
- **Patient Monitor Init**: `GET /api/Devices/PatientMonitor/Init`
- **Blood Pressure Data**: `GET /api/Devices/BloodPressure/GetDeviceData`
- **Send Device Data**: `GET /api/Devices/BloodPressure/SendData`

## Interface

### Return Object
```typescript
{
  // Patient Monitor Operations
  initPatientMonitor: () => void;
  isInitializingMonitor: boolean;
  
  // Blood Pressure Operations
  getBloodPressureData: () => void;
  bloodPressureData: any;
  isLoadingBloodPressure: boolean;
  sendBloodPressureData: () => void;
  isSendingData: boolean;
  
  // Common State
  error: string | null;
  clearError: () => void;
}
```

## Properties

### Patient Monitor Operations

#### `initPatientMonitor`
- **Type**: `() => void`
- **Purpose**: Initialize the patient monitoring device
- **Usage**: Call when setting up patient monitoring session

#### `isInitializingMonitor`
- **Type**: `boolean`
- **Purpose**: Indicates if monitor initialization is in progress
- **Usage**: Show loading states during device setup

### Blood Pressure Operations

#### `getBloodPressureData`
- **Type**: `() => void`
- **Purpose**: Retrieve current blood pressure measurements
- **Features**: Auto-refresh every 5 seconds when active
- **Usage**: Start blood pressure monitoring

#### `bloodPressureData`
- **Type**: `any`
- **Purpose**: Contains current blood pressure readings
- **Data**: Systolic, diastolic, pulse rate, timestamp

#### `isLoadingBloodPressure`
- **Type**: `boolean`
- **Purpose**: Indicates if blood pressure data is being fetched
- **Usage**: Show loading indicators for measurements

#### `sendBloodPressureData`
- **Type**: `() => void`
- **Purpose**: Transmit blood pressure data to server
- **Features**: Auto-refreshes data after successful transmission
- **Usage**: Save measurements to patient record

#### `isSendingData`
- **Type**: `boolean`
- **Purpose**: Indicates if data transmission is in progress
- **Usage**: Show transmission status

### Common State

#### `error`
- **Type**: `string | null`
- **Purpose**: Contains error messages from device operations
- **Error Types**: Device connection issues, authentication errors, transmission failures

#### `clearError`
- **Type**: `() => void`
- **Purpose**: Clear error state
- **Usage**: Reset error state after user acknowledgment

## Usage Examples

### Basic Patient Monitor Setup
```typescript
import { useDeviceOperations } from '../src/hooks/useDeviceOperations';

const PatientMonitorScreen = () => {
  const { 
    initPatientMonitor, 
    isInitializingMonitor, 
    error, 
    clearError 
  } = useDeviceOperations();

  const handleInitializeMonitor = () => {
    clearError(); // Clear any previous errors
    initPatientMonitor();
  };

  return (
    <div>
      <h2>Patient Monitor</h2>
      
      {error && (
        <div className="error-alert">
          <span>{error}</span>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}
      
      <button 
        onClick={handleInitializeMonitor}
        disabled={isInitializingMonitor}
      >
        {isInitializingMonitor ? 'Initializing...' : 'Initialize Monitor'}
      </button>
    </div>
  );
};
```

### Blood Pressure Monitoring
```typescript
const BloodPressureMonitor = () => {
  const { 
    getBloodPressureData,
    bloodPressureData,
    isLoadingBloodPressure,
    sendBloodPressureData,
    isSendingData,
    error
  } = useDeviceOperations();

  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = () => {
    setIsMonitoring(true);
    getBloodPressureData(); // Starts auto-refresh cycle
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    // Auto-refresh will stop when component unmounts or query is disabled
  };

  const saveReading = () => {
    if (bloodPressureData) {
      sendBloodPressureData();
    }
  };

  return (
    <div>
      <h3>Blood Pressure Monitor</h3>
      
      <div className="monitor-controls">
        <button 
          onClick={startMonitoring}
          disabled={isMonitoring || isLoadingBloodPressure}
        >
          Start Monitoring
        </button>
        
        <button 
          onClick={stopMonitoring}
          disabled={!isMonitoring}
        >
          Stop Monitoring
        </button>
      </div>

      {isLoadingBloodPressure && (
        <div className="loading">Reading blood pressure...</div>
      )}

      {bloodPressureData && (
        <div className="bp-reading">
          <h4>Current Reading</h4>
          <p>Systolic: {bloodPressureData.systolic} mmHg</p>
          <p>Diastolic: {bloodPressureData.diastolic} mmHg</p>
          <p>Pulse: {bloodPressureData.pulse} bpm</p>
          <p>Time: {new Date(bloodPressureData.timestamp).toLocaleTimeString()}</p>
          
          <button 
            onClick={saveReading}
            disabled={isSendingData}
          >
            {isSendingData ? 'Saving...' : 'Save Reading'}
          </button>
        </div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}
    </div>
  );
};
```

### Complete Medical Measurements Screen
```typescript
const MedicalMeasurementsScreen = () => {
  const { 
    initPatientMonitor,
    isInitializingMonitor,
    getBloodPressureData,
    bloodPressureData,
    isLoadingBloodPressure,
    sendBloodPressureData,
    isSendingData,
    error,
    clearError
  } = useDeviceOperations();

  const [monitorInitialized, setMonitorInitialized] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  // Initialize monitor on component mount
  useEffect(() => {
    initPatientMonitor();
  }, [initPatientMonitor]);

  // Track monitor initialization success
  useEffect(() => {
    if (!isInitializingMonitor && !error) {
      setMonitorInitialized(true);
    }
  }, [isInitializingMonitor, error]);

  // Save measurement to local history
  const saveMeasurement = () => {
    if (bloodPressureData) {
      const measurement = {
        ...bloodPressureData,
        id: Date.now(),
        savedAt: new Date().toISOString()
      };
      
      setMeasurements(prev => [measurement, ...prev]);
      sendBloodPressureData();
    }
  };

  return (
    <div className="measurements-screen">
      <h2>Medical Measurements</h2>

      {/* Monitor Status */}
      <div className="monitor-status">
        {isInitializingMonitor && (
          <div className="status initializing">
            Initializing patient monitor...
          </div>
        )}
        
        {monitorInitialized && (
          <div className="status ready">
            Patient monitor ready
          </div>
        )}
        
        {error && (
          <div className="status error">
            {error}
            <button onClick={clearError}>Retry</button>
          </div>
        )}
      </div>

      {/* Blood Pressure Section */}
      {monitorInitialized && (
        <div className="bp-section">
          <h3>Blood Pressure</h3>
          
          <button 
            onClick={getBloodPressureData}
            disabled={isLoadingBloodPressure}
          >
            {isLoadingBloodPressure ? 'Reading...' : 'Take Reading'}
          </button>

          {bloodPressureData && (
            <div className="current-reading">
              <h4>Current Reading</h4>
              <div className="reading-values">
                <span className="systolic">{bloodPressureData.systolic}</span>
                <span className="separator">/</span>
                <span className="diastolic">{bloodPressureData.diastolic}</span>
                <span className="unit">mmHg</span>
                <span className="pulse">{bloodPressureData.pulse} bpm</span>
              </div>
              
              <button 
                onClick={saveMeasurement}
                disabled={isSendingData}
                className="save-btn"
              >
                {isSendingData ? 'Saving...' : 'Save Reading'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Measurement History */}
      <div className="measurement-history">
        <h3>Recent Measurements</h3>
        {measurements.length === 0 ? (
          <p>No measurements recorded</p>
        ) : (
          <div className="measurements-list">
            {measurements.map(measurement => (
              <div key={measurement.id} className="measurement-item">
                <span className="values">
                  {measurement.systolic}/{measurement.diastolic} mmHg
                </span>
                <span className="pulse">{measurement.pulse} bpm</span>
                <span className="time">
                  {new Date(measurement.savedAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

## Auto-Refresh Configuration

### Blood Pressure Auto-Refresh
The hook automatically refreshes blood pressure data every 5 seconds when active:

```typescript
// In useDeviceOperations.ts
const bloodPressureQuery = useQuery({
  queryKey: ['bloodPressureData'],
  queryFn: () => apiClient.api.devicesBloodPressureGetDeviceDataList(),
  enabled: false, // Only fetch when explicitly requested
  retry: 2,
  refetchInterval: 5000, // Auto-refresh every 5 seconds when active
});
```

### Controlling Auto-Refresh
```typescript
const BloodPressureComponent = () => {
  const { getBloodPressureData } = useDeviceOperations();
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    if (autoRefresh) {
      getBloodPressureData(); // Starts the auto-refresh cycle
    }
  }, [autoRefresh, getBloodPressureData]);

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={autoRefresh}
          onChange={(e) => setAutoRefresh(e.target.checked)}
        />
        Auto-refresh readings
      </label>
    </div>
  );
};
```

## Error Handling

### Device Connection Errors
```typescript
if (error instanceof Response) {
  setError(`Failed to initialize patient monitor: HTTP ${error.status}`);
}
```

### Authentication Errors
```typescript
if (error.status === 501) {
  setError('Please log in to access medical devices');
}
```

### Network Issues
```typescript
else {
  setError('Device communication error - check connections');
}
```

## State Management

### Monitor Initialization Flow
1. `initPatientMonitor()` called
2. `isInitializingMonitor` becomes `true`
3. API call executes
4. On success: `isInitializingMonitor` becomes `false`, monitor ready
5. On error: `error` populated with specific message

### Blood Pressure Monitoring Flow
1. `getBloodPressureData()` called
2. `isLoadingBloodPressure` becomes `true`
3. API call executes with auto-refresh
4. On success: `bloodPressureData` updated, continues auto-refresh
5. On error: `error` populated, auto-refresh stops

### Data Transmission Flow
1. `sendBloodPressureData()` called
2. `isSendingData` becomes `true`
3. API call executes
4. On success: `isSendingData` becomes `false`, data refreshed
5. On error: `error` populated with transmission failure

## Performance Considerations

### Memory Management
```typescript
// Stop auto-refresh when component unmounts
useEffect(() => {
  return () => {
    // React Query automatically stops queries when component unmounts
  };
}, []);
```

### Battery Optimization
```typescript
// Reduce refresh rate when on battery power
const { batteryStatus } = useAppInitialization();

const refreshInterval = useMemo(() => {
  if (batteryStatus?.isACOnline === false && batteryStatus?.batteryPercentage < 20) {
    return 10000; // 10 seconds when low battery
  }
  return 5000; // 5 seconds when on AC power
}, [batteryStatus]);
```

## Security Considerations

### Device Authentication
- Ensure proper device authentication before initialization
- Validate device responses for tampering
- Secure transmission of medical data

### Data Integrity
- Verify measurement data integrity
- Implement checksums for critical readings
- Log device interactions for audit trails

## Testing

### Unit Tests
```typescript
describe('useDeviceOperations', () => {
  it('should initialize patient monitor', async () => {
    const { result } = renderHook(() => useDeviceOperations());
    
    act(() => {
      result.current.initPatientMonitor();
    });
    
    await waitFor(() => {
      expect(result.current.isInitializingMonitor).toBe(false);
    });
  });

  it('should fetch blood pressure data', async () => {
    const { result } = renderHook(() => useDeviceOperations());
    
    act(() => {
      result.current.getBloodPressureData();
    });
    
    await waitFor(() => {
      expect(result.current.bloodPressureData).toBeTruthy();
    });
  });
});
```

### Integration Tests
- Test with actual device simulators
- Verify auto-refresh functionality
- Test error handling with device disconnection
- Validate data transmission accuracy

## Dependencies

### Required Packages
- `@tanstack/react-query`: Query management with auto-refresh
- `../api`: API client instance
- Device drivers (if applicable)

## Troubleshooting

### Common Issues
1. **Monitor won't initialize**: Check device connections and power
2. **No blood pressure data**: Verify device is properly connected
3. **Auto-refresh stopped**: Check for errors or network issues
4. **Data transmission failed**: Verify authentication and network

### Debug Tips
- Check device physical connections
- Verify API endpoints are responding
- Use React Query DevTools to inspect query states
- Test with device simulators for development