# Design Document

## Overview

The device connection workflow enhancement will improve the existing medical device integration by implementing the proper API workflow sequence as documented in the official NoAH API specification. The design focuses on creating a reliable, user-friendly device connection experience with proper error handling, status management, and real-time data visualization.

## Architecture

### Component Structure
```
DeviceConnectionScreen
├── ConnectionStatusHeader (SignalR status)
├── DeviceGrid
│   ├── PatientMonitorCard (with Init + View Monitor)
│   ├── BloodPressureCard (Read-only)
│   ├── TemperatureCard (Read-only)
│   └── BloodGlucoseCard (Read-only)
├── RealTimeDataSection
└── NavigationFooter
```

### State Management
- **Device Status**: Track connection states for each device type
- **SignalR Connection**: Monitor real-time connection health
- **Error States**: Manage and display device-specific errors
- **Loading States**: Handle async operations with proper feedback
- **Real-time Data**: Store and update live measurements

## Components and Interfaces

### Enhanced DeviceCard Component
```typescript
interface DeviceCardProps {
  title: string;
  icon: React.ReactNode;
  status: DeviceStatus;
  onConnect?: () => void;
  onRead?: () => void;
  onViewMonitor?: () => void; // New for Patient Monitor
  isLoading: boolean;
  gradient: string;
  data?: DeviceData;
  errorMessage?: string; // New for error display
  requiresInit: boolean; // New to distinguish device types
}
```

### Device Status Types
```typescript
type DeviceStatus = 
  | 'idle' 
  | 'initializing' 
  | 'connected' 
  | 'reading' 
  | 'ready' 
  | 'error' 
  | 'requires-emergency-case'; // New status
```

### Error Handling Strategy
1. **Connection Errors**: Network/SignalR issues
2. **Permission Errors**: Admin rights required
3. **Device Errors**: Hardware not available/pingable
4. **Workflow Errors**: Missing emergency case
5. **Data Errors**: Invalid/corrupted device data

## Data Models

### Enhanced Device Data Interface
```typescript
interface DeviceData {
  // Patient Monitor Data (NHmsData from workflow)
  heartRate?: number;
  systolicBP?: number;
  diastolicBP?: number;
  meanBP?: number;
  temperature?: number;
  oxygenSaturation?: number;
  respiratoryRate?: number;
  timestamp?: string;
  
  // Blood Pressure specific
  bloodPressureReading?: {
    systolic: number;
    diastolic: number;
    pulse: number;
    timestamp: string;
  };
  
  // Temperature specific
  temperatureReading?: {
    value: number;
    unit: string;
    timestamp: string;
  };
  
  // Blood Glucose specific
  bloodGlucoseReading?: {
    value: number;
    unit: string;
    timestamp: string;
  };
}
```

### Connection Status Interface
```typescript
interface ConnectionStatus {
  signalR: 'connected' | 'connecting' | 'disconnected' | 'error';
  emergencyCaseActive: boolean;
  backendElevated: boolean; // For Patient Monitor
  lastHeartbeat?: Date;
}
```

## Error Handling

### Error Categories and Responses
1. **No Emergency Case**: Display modal with option to create new case
2. **SignalR Disconnected**: Show reconnection attempts with retry button
3. **Admin Rights Required**: Display elevation prompt for Patient Monitor
4. **Device Not Available**: Show troubleshooting steps
5. **Invalid Data**: Log error and show user-friendly message

### Error Display Strategy
- **Toast Notifications**: For temporary errors and status updates
- **Inline Errors**: Within device cards for device-specific issues
- **Modal Dialogs**: For critical errors requiring user action
- **Status Indicators**: Visual cues in the connection header

## Testing Strategy

### Unit Tests
- Device status state transitions
- Data formatting and validation
- Error handling logic
- SignalR event processing

### Integration Tests
- Full device connection workflow
- SignalR event handling
- Navigation between screens
- Error recovery scenarios

### User Acceptance Tests
- Complete Patient Monitor workflow (Init → Connect → View)
- Blood Pressure reading workflow
- Temperature reading workflow
- Blood Glucose reading workflow
- Error handling and recovery

## Implementation Phases

### Phase 1: Enhanced Device Status Management
- Implement proper device status states
- Add emergency case validation
- Enhance error handling and display

### Phase 2: Workflow-Compliant Device Connections
- Implement Patient Monitor initialization sequence
- Add proper SignalR event discrimination
- Enhance real-time data processing

### Phase 3: Improved User Experience
- Add Patient Monitor navigation
- Implement connection status indicators
- Add troubleshooting guidance

### Phase 4: Testing and Validation
- Comprehensive testing of all workflows
- Error scenario validation
- Performance optimization

## Security Considerations

- Validate all incoming SignalR data
- Sanitize error messages before display
- Ensure proper authentication for device access
- Handle sensitive medical data appropriately

## Performance Considerations

- Optimize SignalR connection management
- Implement efficient real-time data updates
- Minimize re-renders during data updates
- Cache device status to reduce API calls