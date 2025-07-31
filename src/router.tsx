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
