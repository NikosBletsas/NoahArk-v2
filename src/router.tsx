import { createBrowserRouter, Navigate } from 'react-router-dom';

import { SCREEN_NAMES } from '@/constants';
import App from '@/App';
import LoginScreen from '@/components/Screens/Login/LoginScreen';
import DashboardScreen from '@/components/Screens/Dashboard/DashboardScreen';
import PatientSearchScreen from '@/components/Screens/SearchPatient/PatientSearchScreen';
import MedicalMeasurementsScreen from '@/components/Screens/MedicalMeasurements/MedicalMeasurementsScreen';
import PatientMonitorScreen from '@/components/Screens/MedicalMeasurements/PatientMonitorScreen';
import SystemOperationsScreen from '@/components/Screens/SystemOperations/SystemOperationsScreen';
import SpirometerScreen from '@/components/Screens/MedicalMeasurements/SpirometerScreen';
import EndoscopeScreen from '@/components/Screens/MedicalMeasurements/EndoscopeScreen';
import SettingsScreen from '@/components/Screens/AdvanceSettings/SettingsScreen';
import AssignEmergencyScreen from '@/components/Screens/Emergency/AssignEmergencyScreen';
import EmergencyCaseDiagnosisScreen from '@/components/Screens/Emergency/EmergencyCaseDiagnosisScreen';
import DeviceConfigurationScreen from '@/components/Screens/DeviceSetup/DeviceConfigurationScreen';
import ConsultationsScreen from '@/components/Screens/CaseConsultations/ConsultationsScreen';

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
