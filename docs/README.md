---
id: README
title: Noah Ark Medical Application Documentation
---

# Noah Ark Medical Application Documentation

## Overview

The Noah Ark medical application is a comprehensive healthcare management system built with React, TypeScript, and modern web technologies. This documentation covers the complete architecture, API integration, and usage patterns for the application.

## Table of Contents

### Core Architecture
- [Application Overview](./App.md)
- [Router Configuration](./Router.md)
- [Theme System](./ThemeContext.md)
- [UI State Management](./uiStore.md)

### API Integration
- [API Integration Overview](./API-Integration.md) - **NEW: Comprehensive API system**
- [Generated API Client](../src/generated_api.ts)

### Custom Hooks

#### Authentication & Initialization
- [useLogin](./useLogin.md) - **UPDATED: Enhanced security features**
- [useAppInitialization](./useAppInitialization.md) - **NEW: App startup management**

#### Patient Management
- [usePatientSearch](./usePatientSearch.md) - **NEW: Patient search functionality**
- [usePatientManagement](./usePatientManagement.md) - **NEW: Patient creation/management**

#### Emergency & Medical Operations
- [useEmergencyCase](./useEmergencyCase.md) - **NEW: Emergency case handling**
- [useDeviceOperations](./useDeviceOperations.md) - **NEW: Medical device integration**

#### System Operations
- [useSystemOperations](./useSystemOperations.md) - **NEW: File upload, scanning, case management**
- [useConfiguration](./useConfiguration.md) - **NEW: Application configuration**

#### Legacy Hooks
- [useDashboardData](./useDashboardData.md)
- [useSignalR](./useSignalR.md) - **UPDATED: Fixed double negotiation issue**

### Screen Components

#### Core Screens
- [LoginScreen](./LoginScreen.md)
- [DashboardScreen](./DashboardScreen.md)
- [PatientSearchScreen](./PatientSearchScreen.md) - **UPDATED: API integration**

#### Medical Screens
- [MedicalMeasurementsScreen](./MedicalMeasurementsScreen.md)
- [PatientMonitorScreen](./PatientMonitorScreen.md)
- [EmergencyCaseDiagnosisScreen](./EmergencyCaseDiagnosisScreen.md)
- [AssignEmergencyScreen](./AssignEmergencyScreen.md)

#### System Screens
- [SystemOperationsScreen](./SystemOperationsScreen.md)
- [DeviceConfigurationScreen](./DeviceConfigurationScreen.md)
- [SettingsScreen](./SettingsScreen.md)

#### Specialized Screens
- [SpirometerScreen](./SpirometerScreen.md)
- [EndoscopeScreen](./EndoscopeScreen.md)
- [ConsultationsScreen](./ConsultationsScreen.md)

## Recent Updates

### Version 2.0 - API Integration Overhaul

#### New Features
✅ **Comprehensive API Integration System**
- 7 new custom hooks for API operations
- Consistent error handling patterns
- Loading state management
- Data transformation and caching

✅ **Enhanced Security**
- Removed credential logging from login operations
- Sanitized error messages
- Secure credential transmission
- Fixed SignalR double negotiation issue

✅ **Patient Management**
- Advanced patient search with API integration
- Patient creation with validation
- Fallback to mock data when API unavailable

✅ **Emergency Case Management**
- Complete emergency case submission workflow
- Doctor availability queries
- Multi-step form integration

✅ **Device Operations**
- Patient monitor initialization
- Blood pressure monitoring with auto-refresh
- Device data transmission

✅ **System Operations**
- File upload with progress tracking
- Document scanning integration
- Case reset and recovery session management

✅ **Configuration Management**
- Application settings with caching
- Device configuration screens
- Automatic cache invalidation

✅ **Application Initialization**
- License validation and startup sequence
- Session recovery from crashes
- Battery status monitoring

#### Technical Improvements
- **React Query Integration**: All API calls use React Query for caching and state management
- **TypeScript Safety**: Full type safety with generated API interfaces
- **Error Boundaries**: Comprehensive error handling throughout the application
- **Performance Optimization**: Auto-refresh patterns and memory management
- **Security Enhancements**: No sensitive data logging, secure error handling

## Architecture Overview

### Technology Stack
- **Frontend**: React 19.1.0 with TypeScript
- **State Management**: Zustand + React Query
- **Routing**: React Router DOM 7.7.1
- **API Client**: Auto-generated from Swagger/OpenAPI
- **Real-time**: SignalR for live updates
- **Styling**: Tailwind CSS with custom theme system
- **Build Tool**: Vite 5.4.19

### Project Structure
```
src/
├── hooks/                 # Custom React hooks
│   ├── useLogin.ts       # Authentication (enhanced security)
│   ├── usePatientSearch.ts    # Patient search operations
│   ├── usePatientManagement.ts # Patient creation/management
│   ├── useEmergencyCase.ts    # Emergency case handling
│   ├── useDeviceOperations.ts # Medical device integration
│   ├── useSystemOperations.ts # System-level operations
│   ├── useConfiguration.ts    # App configuration
│   ├── useAppInitialization.ts # App startup management
│   ├── useDashboardData.ts   # Dashboard data
│   └── useSignalR.ts         # Real-time communication
├── api/
│   └── index.ts          # API client instance
├── generated_api.ts      # Auto-generated API client
├── contexts/
│   └── ThemeContext.tsx  # Theme management
├── stores/
│   └── uiStore.ts        # UI state management
└── router.tsx            # Application routing

components/
├── shared/               # Reusable components
├── diagnosisForms/      # Medical form components
└── [ScreenName].tsx     # Screen components

docs/                     # Documentation
├── README.md            # This file
├── API-Integration.md   # API system overview
└── [ComponentName].md   # Individual component docs
```

### API Integration Pattern

All API operations follow a consistent pattern:

```typescript
// 1. Import the hook
import { usePatientSearch } from '../src/hooks/usePatientSearch';

// 2. Use in component
const { searchPatient, isLoading, error, searchResults } = usePatientSearch();

// 3. Handle operations
const handleSearch = () => {
  searchPatient({ name: 'John', surname: 'Doe' });
};

// 4. Handle UI states
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <ResultsList results={searchResults} />;
```

### Error Handling Strategy

All hooks implement consistent error handling:

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

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Generate API client from Swagger
npm run generate-api

# Start development server
npm run dev
```

### Development Workflow

1. **API Updates**: When backend APIs change, run `npm run generate-api` to update the client
2. **New Features**: Create custom hooks following the established patterns
3. **Testing**: Test with both API and mock data scenarios
4. **Documentation**: Update relevant documentation files

## Security Considerations

### Implemented Security Measures
- ✅ No credential logging in production
- ✅ Sanitized error messages
- ✅ Secure API credential transmission
- ✅ Input validation and sanitization
- ✅ Rate limiting support
- ✅ Session management with recovery

### Best Practices
- Always validate user input
- Use HTTPS for all API communications
- Implement proper authentication checks
- Handle sensitive medical data according to regulations
- Log security events for audit purposes

## Performance Optimizations

### Caching Strategy
- **React Query**: Automatic caching with stale-while-revalidate
- **Configuration**: 5-minute cache for app settings
- **Device Data**: Auto-refresh every 5 seconds when active
- **Battery Status**: 30-second refresh interval

### Memory Management
- Automatic cleanup of unused queries
- Component unmount handling
- Resource cleanup for device operations

## Testing Strategy

### Unit Testing
- Hook functionality testing
- Error handling verification
- State management validation

### Integration Testing
- API endpoint testing
- Component integration
- User workflow testing

### Security Testing
- Credential handling verification
- Error message sanitization
- Input validation testing

## Deployment

### Build Process
```bash
# Production build
npm run build

# Preview build
npm run preview
```

### Environment Configuration
- API base URLs
- Feature flags
- Security settings
- Device configurations

## Contributing

### Code Standards
- Follow TypeScript best practices
- Use consistent naming conventions
- Implement comprehensive error handling
- Add appropriate documentation
- Follow security guidelines

### Pull Request Process
1. Update API client if needed
2. Add/update relevant documentation
3. Test with both API and mock data
4. Verify security measures
5. Update changelog

## Troubleshooting

### Common Issues

#### API Connection Problems
- Verify API endpoint availability
- Check network connectivity
- Validate authentication status
- Review error logs

#### Device Integration Issues
- Check device drivers and connections
- Verify device initialization
- Test with device simulators
- Review device configuration

#### Performance Issues
- Check React Query cache settings
- Verify auto-refresh intervals
- Monitor memory usage
- Review component re-renders

### Debug Tools
- React Query DevTools
- Browser Network tab
- React DevTools
- Application logs

## Support

### Documentation
- Individual component documentation in `/docs`
- API integration guide
- Security best practices
- Performance optimization guide

### Resources
- [React Query Documentation](https://tanstack.com/query/latest)
- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated**: December 2024  
**Version**: 2.0.0  
**Maintainer**: Noah Ark Development Team