---
id: API-Integration
title: API Integration Documentation
---

# API Integration Documentation

## Overview

The Noah Ark medical application uses a comprehensive API integration system built with React Query and custom hooks. This system provides secure, efficient, and maintainable access to backend services while following clean code principles.

## Architecture

### Core Components

1. **Generated API Client** (`src/generated_api.ts`)
   - Auto-generated from Swagger/OpenAPI specification
   - Type-safe API calls with TypeScript interfaces
   - Centralized API endpoint definitions

2. **API Client Instance** (`src/api/index.ts`)
   - Singleton pattern for consistent API access
   - Configurable base URL
   - Shared across all hooks

3. **Custom Hooks** (`src/hooks/`)
   - Domain-specific API operations
   - Consistent error handling patterns
   - Loading state management
   - Data transformation and caching

## API Hooks

### Patient Management

#### `usePatientSearch`
**Purpose:** Search for patients using various criteria

**Features:**
- Search by name, surname, or combined criteria
- Results caching and state management
- Clear search functionality
- Error handling with user-friendly messages

**Usage:**
```typescript
const { searchPatient, isLoading, error, searchResults, clearSearch } = usePatientSearch();

// Execute search
searchPatient({ name: "John", surname: "Doe" });

// Clear results
clearSearch();
```

**API Endpoint:** `POST /api/Main/SearchPatient`

#### `usePatientManagement`
**Purpose:** Add new patients to the system

**Features:**
- Patient creation with validation
- Specific error handling for duplicate patients
- Success state tracking
- Form validation support

**Usage:**
```typescript
const { addPatient, isLoading, error, addedPatient, resetAddedPatient } = usePatientManagement();

// Add new patient
addPatient(patientData);
```

**API Endpoint:** `POST /api/Main/AddPatient`

### Emergency Case Management

#### `useEmergencyCase`
**Purpose:** Handle emergency case submissions and doctor availability

**Features:**
- Emergency case submission
- Doctor availability queries
- Case state tracking
- Comprehensive error handling

**Usage:**
```typescript
const { 
  submitCase, 
  isSubmitting, 
  getDoctorAvailability, 
  isLoadingAvailability,
  doctorAvailability,
  error,
  submittedCase 
} = useEmergencyCase();

// Submit emergency case
submitCase(emergencyCaseData);

// Get doctor availability
getDoctorAvailability();
```

**API Endpoints:**
- `POST /api/Main/NewEmergencyCase`
- `GET /api/Main/GetEfimeries`

### Device Operations

#### `useDeviceOperations`
**Purpose:** Manage medical device interactions

**Features:**
- Patient monitor initialization
- Blood pressure data retrieval with auto-refresh
- Data transmission capabilities
- Device state management

**Usage:**
```typescript
const {
  initPatientMonitor,
  isInitializingMonitor,
  getBloodPressureData,
  bloodPressureData,
  isLoadingBloodPressure,
  sendBloodPressureData,
  isSendingData,
  error
} = useDeviceOperations();

// Initialize patient monitor
initPatientMonitor();

// Get blood pressure data (with auto-refresh)
getBloodPressureData();
```

**API Endpoints:**
- `GET /api/Devices/PatientMonitor/Init`
- `GET /api/Devices/BloodPressure/GetDeviceData`
- `GET /api/Devices/BloodPressure/SendData`

### System Operations

#### `useSystemOperations`
**Purpose:** Handle system-level operations

**Features:**
- File upload with progress tracking
- Document scanning
- Case reset functionality
- Recovery session file management

**Usage:**
```typescript
const {
  uploadData,
  isUploading,
  scanDocument,
  isScanning,
  scannedDocument,
  resetCase,
  isResetting,
  addMoreFiles,
  isAddingFiles,
  error
} = useSystemOperations();

// Upload files
uploadData();

// Scan document
scanDocument();

// Reset current case
resetCase();
```

**API Endpoints:**
- `GET /api/Main/SendData`
- `GET /api/Main/ScanDocument`
- `POST /api/Main/ResetCase`
- `GET /api/Main/AddMoreFiles`

### Configuration Management

#### `useConfiguration`
**Purpose:** Manage application configuration

**Features:**
- Configuration retrieval with caching
- Configuration updates
- Automatic cache invalidation
- Initialization error handling

**Usage:**
```typescript
const {
  configuration,
  isLoadingConfiguration,
  updateConfiguration,
  isUpdatingConfiguration,
  refreshConfiguration,
  error
} = useConfiguration();

// Update configuration
updateConfiguration(newConfigData);

// Manual refresh
refreshConfiguration();
```

**API Endpoints:**
- `GET /api/Configuration/GetConfiguration`
- `POST /api/Configuration/SetConfiguration`

### Application Initialization

#### `useAppInitialization`
**Purpose:** Handle application startup and initialization

**Features:**
- Login API initialization with license validation
- Main application initialization
- Session recovery management
- Battery status monitoring

**Usage:**
```typescript
const {
  initLoginApi,
  isInitializingLoginApi,
  initMainApp,
  isInitializingMainApp,
  recoveredSessions,
  setRecoverySession,
  getBatteryStatus,
  batteryStatus,
  error
} = useAppInitialization();

// Initialize login API (app startup)
initLoginApi();

// Initialize main app (after login)
initMainApp();

// Set recovery session
setRecoverySession(sessionId);
```

**API Endpoints:**
- `GET /api/LoginAPI/Init`
- `GET /api/Main/Init`
- `GET /api/Main/SetRecoverySession`
- `GET /api/Main/GetBatteryStatus`

## Error Handling

### Consistent Error Patterns

All hooks follow a consistent error handling pattern:

```typescript
onError: (error: any) => {
  if (error instanceof Response) {
    // Handle HTTP errors with specific status codes
    if (error.status === 501) {
      setError('Please log in to access this feature');
    } else if (error.status === 502) {
      setError('Validation error or duplicate entry');
    } else {
      setError(`HTTP ${error.status}: ${error.statusText}`);
    }
  } else if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('An unexpected error occurred');
  }
}
```

### Common HTTP Status Codes

- **200**: Success
- **400**: Bad Request (wrong credentials)
- **401**: Unauthorized (invalid license)
- **501**: Not Initialized/Not Logged In
- **502**: Validation Error/Duplicate Entry
- **503**: Service Error/No Connectivity

## Security Considerations

### Credential Protection
- Login credentials are never logged to console
- Sensitive data is handled securely in request bodies
- Error messages don't expose sensitive information

### Authentication State
- All API calls check for authentication status
- Proper error handling for unauthenticated requests
- Session management with recovery capabilities

## Performance Optimizations

### Caching Strategy
- React Query provides automatic caching
- Stale-while-revalidate pattern for configuration
- Manual cache invalidation when needed

### Auto-refresh Patterns
- Blood pressure data refreshes every 5 seconds when active
- Battery status refreshes every 30 seconds when active
- Configuration cached for 5 minutes

### Loading States
- Granular loading states for different operations
- Disabled UI elements during API calls
- Visual feedback for long-running operations

## Integration Examples

### PatientSearchScreen Integration

```typescript
// Hook usage
const { searchPatient, isLoading, error, searchResults, clearSearch } = usePatientSearch();

// Search execution
const handleSearch = () => {
  if (searchTerm.trim()) {
    const searchCriteria: NPatient = {
      name: searchTerm.includes(' ') ? searchTerm.split(' ')[0] : searchTerm,
      surname: searchTerm.includes(' ') ? searchTerm.split(' ')[1] : searchTerm,
    };
    searchPatient(searchCriteria);
  } else {
    clearSearch();
  }
};

// UI integration
<button
  onClick={handleSearch}
  disabled={isLoading}
  className="search-button"
>
  {isLoading ? 'Searching...' : 'Search API'}
</button>

{error && (
  <div className="error-message">
    <AlertCircle className="error-icon" />
    <span>{error}</span>
  </div>
)}
```

## Best Practices

### Hook Design
1. **Single Responsibility**: Each hook handles one domain
2. **Consistent Interface**: Similar return patterns across hooks
3. **Error Boundaries**: Comprehensive error handling
4. **Loading States**: Clear loading indicators
5. **Data Transformation**: Convert API data to UI-friendly formats

### Usage Guidelines
1. **Import Patterns**: Use named imports for hooks
2. **Error Display**: Always show error states to users
3. **Loading UX**: Disable actions during API calls
4. **Data Validation**: Validate data before API calls
5. **Cleanup**: Clear states when components unmount

### Testing Considerations
1. **Mock API Responses**: Use mock data for development
2. **Error Scenarios**: Test all error conditions
3. **Loading States**: Verify loading indicators work
4. **Data Flow**: Test data transformation logic
5. **Integration**: Test hook integration with components

## Migration Guide

### From Direct API Calls
1. Replace direct API calls with appropriate hooks
2. Update error handling to use hook error states
3. Replace loading logic with hook loading states
4. Update data access patterns

### Adding New Endpoints
1. Update Swagger specification
2. Regenerate API client: `npm run generate-api`
3. Create or update relevant hook
4. Add comprehensive error handling
5. Update documentation

## Troubleshooting

### Common Issues
1. **401 Errors**: Check license key and initialization
2. **501 Errors**: Ensure user is logged in
3. **503 Errors**: Check network connectivity
4. **Loading States**: Verify hook integration

### Debug Tools
1. React Query DevTools for cache inspection
2. Network tab for API call monitoring
3. Console for error logging (non-sensitive only)
4. Hook state inspection with React DevTools