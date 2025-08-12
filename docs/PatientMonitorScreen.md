---
id: patient-monitor-screen
title: Patient Monitor Screen
---

The `PatientMonitorScreen` component provides a real-time display of a patient's vital signs and a system log. It is designed to give a quick and clear overview of the patient's current status.

### Structure

- **Header**: A modern header that displays the screen title.
- **`VitalSignCard`**: A reusable component for displaying a single vital sign with its value and label.
- **Vital Signs Grid**: A grid of `VitalSignCard` components that display the patient's vital signs, including:
  - Heart Rate
  - SpO2
  - Temperature
  - Respiratory Rate
  - Blood Sugar
  - Systolic Pressure
  - Mean Pressure
  - Diastolic Pressure
  - Last Check Time
- **System Log**: A log that displays system messages, such as initialization, sensor calibration, and data acquisition updates.
- **Progress Bar**: A progress bar that shows the data acquisition progress.
- **Footer**: A "Return to Devices" button.

### Functionality

- **Real-time Data Simulation**: Uses `useEffect` and `setInterval` to simulate real-time updates of vital signs and system logs.
- **State Management**: Uses `useState` to manage the vital signs, system logs, and data acquisition progress.
- **Navigation**: Uses `useNavigate` to navigate back to the medical devices screen.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with the layout adjusting to different screen sizes.

### Code

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Database, ArrowLeft } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';

const VitalSignCard = ({ value, label, index }: { value: string, label: string, index: number }) => {
  // ... (VitalSignCard component implementation)
};

const PatientMonitorScreen: React.FC = () => {
  const { theme, currentThemeKey } = useTheme();
  const navigate = useNavigate();
    const [progress, setProgress] = useState(65);
    const [logs, setLogs] = useState([
        { time: new Date().toLocaleString(), message: 'System initialized', type: 'info' },
        { time: new Date(Date.now() - 30000).toLocaleString(), message: 'Sensor calibration complete', type: 'success' },
        { time: new Date(Date.now() - 60000).toLocaleString(), message: 'Data acquisition started', type: 'info' },
        { time: new Date(Date.now() - 90000).toLocaleString(), message: 'All sensors online', type: 'success' },
    ]);

    const [vitalSigns, setVitalSigns] = useState({
        heartRate: 72,
        spO2: 98,
        temperature: 36.5,
        respiratoryRate: 16,
        bloodSugar: 95,
        systolicPressure: 120,
        meanPressure: 85,
        diastolicPressure: 80,
        checkTime: new Date().toLocaleTimeString()
    });

    // ... (useEffect for real-time data simulation)

    const vitalSignsData = [
        { value: `${vitalSigns.heartRate}`, label: 'Heart Rate', unit: 'bpm' },
        { value: `${vitalSigns.spO2}`, label: 'SpO2', unit: '%' },
        { value: `${vitalSigns.temperature}`, label: 'Temperature', unit: '°C' },
        { value: `${vitalSigns.respiratoryRate}`, label: 'Respiratory Rate', unit: 'bpm' },
        { value: `${vitalSigns.bloodSugar}`, label: 'Blood Sugar', unit: 'mg/dL' },
        { value: `${vitalSigns.systolicPressure}`, label: 'Systolic Pressure', unit: 'mmHg' },
        { value: `${vitalSigns.meanPressure}`, label: 'Mean Pressure', unit: 'mmHg' },
        { value: `${vitalSigns.diastolicPressure}`, label: 'Diastolic Pressure', unit: 'mmHg' },
        { value: vitalSigns.checkTime, label: 'Last Check', unit: '' }
    ];

    return (
        // ... (JSX for the component)
    );
};

export default PatientMonitorScreen;
