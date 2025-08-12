---
id: router
title: Router Configuration
---

The `router.tsx` file defines the main routing configuration for the application using `react-router-dom`. It sets up all the possible routes and maps them to their corresponding components.

### Structure

The router is created using `createBrowserRouter` and consists of a single root route with nested children.

- **Root Route**:
  - `path`: `/`
  - `element`: `<App />`
  - This route renders the main `App` component, which provides the overall layout and global context for the application.

- **Child Routes**:
  - **Redirect**: The `index` route redirects the root path (`/`) to the login screen (`/login`) by default.
  - **Application Screens**: Each child route maps a specific path to a screen component. The paths are defined in the `SCREEN_NAMES` constant.

### Routes

| Path                          | Component                      | Description                                      |
| ----------------------------- | ------------------------------ | ------------------------------------------------ |
| `/`                           | `<Navigate to="/login" />`     | Redirects to the login screen.                   |
| `/login`                      | `<LoginScreen />`              | Displays the login screen.                       |
| `/dashboard`                  | `<DashboardScreen />`          | Displays the main dashboard.                     |
| `/patient-search`             | `<PatientSearchScreen />`      | Displays the patient search screen.              |
| `/measurements`               | `<MedicalMeasurementsScreen />`| Displays the medical measurements screen.        |
| `/patient-monitor`            | `<PatientMonitorScreen />`     | Displays the patient monitor screen.             |
| `/system-operations`          | `<SystemOperationsScreen />`   | Displays the system operations screen.           |
| `/spirometer`                 | `<SpirometerScreen />`         | Displays the spirometer screen.                  |
| `/endoscope`                  | `<EndoscopeScreen />`          | Displays the endoscope screen.                   |
| `/settings`                   | `<SettingsScreen />`           | Displays the settings screen.                    |
| `/assign-emergency`           | `<AssignEmergencyScreen />`    | Displays the assign emergency screen.            |
| `/emergency-case-diagnosis`   | `<EmergencyCaseDiagnosisScreen />`| Displays the emergency case diagnosis screen.    |
| `/device-configuration`       | `<DeviceConfigurationScreen />`| Displays the device configuration screen.        |
| `/consultations`              | `<ConsultationsScreen />`      | Displays the consultations screen.               |

### Code

```typescript
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { SCREEN_NAMES } from '../constants';
import App from '../App';
import LoginScreen from '../components/LoginScreen';
import DashboardScreen from '../components/DashboardScreen';
import PatientSearchScreen from '../components/PatientSearchScreen';
import MedicalMeasurementsScreen from '../components/MedicalMeasurementsScreen';
import PatientMonitorScreen from '../components/PatientMonitorScreen';
import SystemOperationsScreen from '../components/SystemOperationsScreen';
import SpirometerScreen from '../components/SpirometerScreen';
import EndoscopeScreen from '../components/EndoscopeScreen';
import SettingsScreen from '../components/SettingsScreen';
import AssignEmergencyScreen from '../components/AssignEmergencyScreen';
import EmergencyCaseDiagnosisScreen from '../components/EmergencyCaseDiagnosisScreen';
import DeviceConfigurationScreen from '../components/DeviceConfigurationScreen';
import ConsultationsScreen from '../components/ConsultationsScreen';

/**
 * The main router configuration for the application.
 * It defines all the routes and their corresponding components.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // Redirect the root path to the login screen
      { index: true, element: <Navigate to={`/${SCREEN_NAMES.LOGIN}`} replace /> },
      // Define all the application routes
      { path: SCREEN_NAMES.LOGIN, element: <LoginScreen /> },
      { path: SCREEN_NAMES.DASHBOARD, element: <DashboardScreen /> },
      { path: SCREEN_NAMES.PATIENT_SEARCH, element: <PatientSearchScreen /> },
      { path: SCREEN_NAMES.MEASUREMENTS, element: <MedicalMeasurementsScreen /> },
      { path: SCREEN_NAMES.PATIENT_MONITOR, element: <PatientMonitorScreen /> },
      { path: SCREEN_NAMES.SYSTEM_OPERATIONS, element: <SystemOperationsScreen /> },
      { path: SCREEN_NAMES.SPIROMETER, element: <SpirometerScreen /> },
      { path: SCREEN_NAMES.ENDOSCOPE, element: <EndoscopeScreen /> },
      { path: SCREEN_NAMES.SETTINGS, element: <SettingsScreen /> },
      { path: SCREEN_NAMES.ASSIGN_EMERGENCY, element: <AssignEmergencyScreen /> },
      { path: SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS, element: <EmergencyCaseDiagnosisScreen /> },
      { path: SCREEN_NAMES.DEVICE_CONFIGURATION, element: <DeviceConfigurationScreen /> },
      { path: SCREEN_NAMES.CONSULTATIONS, element: <ConsultationsScreen /> },
    ],
  },
]);
