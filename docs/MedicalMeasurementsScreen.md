---
id: medical-measurements-screen
title: Medical Measurements Screen
---

The `MedicalMeasurementsScreen` component provides a user interface for selecting a medical device to perform measurements. It displays a grid of available devices, each with an icon and a label.

### Structure

- **`AppHeader`**: A reusable header component that displays the screen title and a back button.
- **`DeviceTile`**: A reusable component for displaying a clickable tile with an icon, a label, and a gradient background.
- **Device Grid**: A grid of `DeviceTile` components that represent the available medical devices.
- **Footer**: A "Return to Dashboard" button.

### Functionality

- **Navigation**: Uses `useNavigate` from `react-router-dom` to navigate to the corresponding screen for each device when a tile is clicked.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with the layout adjusting to different screen sizes.

### Devices

| Device             | Icon               | Screen                          |
| ------------------ | ------------------ | ------------------------------- |
| Patient Monitor    | `MonitorDot`       | `SCREEN_NAMES.PATIENT_MONITOR`  |
| Spirometer         | `AirVent`          | `SCREEN_NAMES.SPIROMETER`       |
| ECG                | `Activity`         | -                               |
| Blood Pressure     | `HeartPulse`       | -                               |
| Endoscope          | `ScanEye`          | `SCREEN_NAMES.ENDOSCOPE`        |
| Ultrasound         | `Radio`            | -                               |
| Oximeter           | `Fingerprint`      | -                               |
| Temperature        | `Thermometer`      | -                               |
| Blood Indicators   | `TestTubeDiagonal` | -                               |
| Weight             | `PersonStanding`   | -                               |
| Stethoscope        | `Stethoscope`      | -                               |

### Code

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MonitorDot, AirVent, Activity, HeartPulse, ScanEye, Radio, Fingerprint, Thermometer, TestTubeDiagonal, PersonStanding, Stethoscope } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

interface DeviceTileProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  gradient: string;
  borderColor: string;
}

const DeviceTile: React.FC<DeviceTileProps> = ({ icon, label, onClick, gradient, borderColor }) => {
  const { theme, currentThemeKey } = useTheme();
  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-br ${gradient} p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-center cursor-pointer hover:scale-105 transition-all duration-200 border ${borderColor} flex flex-col items-center justify-center aspect-square`}
    >
      {icon}
      <h3 className={`font-semibold ${currentThemeKey === 'black' ? 'text-slate-800' : theme.textPrimary} mt-2 text-xs sm:text-sm md:text-base lg:text-lg`}>{label}</h3>
    </div>
  );
};

const MedicalMeasurementsScreen: React.FC = () => {
  const { theme, isMidnightTheme, currentThemeKey } = useTheme();
  const navigate = useNavigate();
  const iconSize = "w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16";
  const devices = [
    { icon: <MonitorDot className={`${iconSize} mx-auto text-blue-600`} />, label: 'Patient Monitor', gradient: 'from-blue-50 to-blue-100', borderColor: 'border-blue-200', screen: SCREEN_NAMES.PATIENT_MONITOR },
    { icon: <AirVent className={`${iconSize} mx-auto text-purple-600`} />, label: 'Spirometer', gradient: 'from-purple-50 to-purple-100', borderColor: 'border-purple-200', screen: SCREEN_NAMES.SPIROMETER },
    { icon: <Activity className={`${iconSize} mx-auto text-green-600`} />, label: 'ECG', gradient: 'from-green-50 to-green-100', borderColor: 'border-green-200', screen: undefined /* TODO */ },
    { icon: <HeartPulse className={`${iconSize} mx-auto text-red-600`} />, label: 'Blood Pressure', gradient: 'from-red-50 to-red-100', borderColor: 'border-red-200', screen: undefined /* TODO */ },
    { icon: <ScanEye className={`${iconSize} mx-auto text-yellow-600`} />, label: 'Endoscope', gradient: 'from-yellow-50 to-yellow-100', borderColor: 'border-yellow-200', screen: SCREEN_NAMES.ENDOSCOPE },
    { icon: <Radio className={`${iconSize} mx-auto text-indigo-600`} />, label: 'Ultrasound', gradient: 'from-indigo-50 to-indigo-100', borderColor: 'border-indigo-200', screen: undefined /* TODO */ },
    { icon: <Fingerprint className={`${iconSize} mx-auto text-teal-600`} />, label: 'Oximeter', gradient: 'from-teal-50 to-teal-100', borderColor: 'border-teal-200', screen: undefined /* TODO */ },
    { icon: <Thermometer className={`${iconSize} mx-auto text-orange-600`} />, label: 'Temperature', gradient: 'from-orange-50 to-orange-100', borderColor: 'border-orange-200', screen: undefined /* TODO */ },
    { icon: <TestTubeDiagonal className={`${iconSize} mx-auto text-pink-600`} />, label: 'Blood Indicators', gradient: 'from-pink-50 to-pink-100', borderColor: 'border-pink-200', screen: undefined /* TODO */ },
    { icon: <PersonStanding className={`${iconSize} mx-auto text-gray-600`} />, label: 'Weight', gradient: 'from-gray-50 to-gray-100', borderColor: 'border-gray-200', screen: undefined /* TODO */ },
    { icon: <Stethoscope className={`${iconSize} mx-auto text-cyan-600`} />, label: 'Stethoscope', gradient: 'from-cyan-50 to-cyan-100', borderColor: 'border-cyan-200', screen: undefined /* TODO */ },
  ];
  
  return (
    // ... (JSX for the component)
  );
};

export default MedicalMeasurementsScreen;
