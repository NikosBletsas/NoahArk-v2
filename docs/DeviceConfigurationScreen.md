---
id: device-configuration-screen
title: Device Configuration Screen
---

The `DeviceConfigurationScreen` component provides a user interface for configuring various medical devices and network settings.

### Structure

- **Header**: Displays the NOAH logo.
- **HMS Section**: Settings for the Health Monitoring System (HMS), including local address, port, and oximeter configuration.
- **Device Manufacturer Section**: A list of device manufacturers for different types of medical devices.
- **Network & Connectivity Section**: Buttons for opening network settings and running connectivity tests.
- **Footer**: Action buttons for saving the configuration, returning to the dashboard, and accessing advanced settings.

### Functionality

- **Navigation**: Uses `useNavigate` from `react-router-dom` to navigate to the dashboard and advanced settings.
- **State Management**: Uses `useUIStore` to control the visibility of the connection status and connectivity test modals.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with the layout adjusting to different screen sizes.

### Code

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Settings as SettingsIcon, Wifi, TestTubeDiagonal, HardDrive, Search, Zap } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { useUIStore } from '../src/stores/uiStore';
import { SCREEN_NAMES } from '../constants';
import FormSection from './shared/FormSection';
import { LabelledInput, LabelledSelect } from './shared/FormControls';


const DeviceManufacturerRow: React.FC<{label: string; idPrefix: string;}> = ({label, idPrefix}) => {
  // ... (DeviceManufacturerRow component implementation)
};

const DeviceConfigurationScreen: React.FC = () => {
  const { theme, isMidnightTheme, currentThemeKey } = useTheme();
  const navigate = useNavigate();
  const { setShowConnectionStatus, setShowConnectivityTest } = useUIStore();
  
  const deviceManufacturers = [
    { label: "ECG", idPrefix: "ecg" },
    { label: "Blood Pressure Meter", idPrefix: "bp" },
    { label: "Respirometer", idPrefix: "respirometer" },
    { label: "Glucose/Urine/Cholesterol", idPrefix: "glucose" },
    { label: "Temperature Meter", idPrefix: "temp" },
    { label: "Weight Scale", idPrefix: "weight" },
  ];

  const baseButtonStyles = "justify-center px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm md:text-base lg:text-lg font-medium flex items-center space-x-2 md:space-x-2.5 transition-all duration-150 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    // ... (JSX for the component)
  );
};

export default DeviceConfigurationScreen;
