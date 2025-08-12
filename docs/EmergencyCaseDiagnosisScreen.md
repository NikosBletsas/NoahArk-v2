---
id: emergency-case-diagnosis-screen
title: Emergency Case Diagnosis Screen
---

The `EmergencyCaseDiagnosisScreen` component provides a multi-step form for diagnosing an emergency case. It guides the user through a series of steps, each with its own form, to collect all the necessary information.

### Structure

- **Sidebar**: A navigation sidebar that displays the diagnosis steps. The current step is highlighted.
- **Main Content**: The main content area displays the form for the current step.
- **Progress Bar**: A progress bar that shows the user's progress through the diagnosis steps.
- **Form Step**: The component for the current step is rendered in the main content area.
- **Action Buttons**: A set of buttons for navigating through the steps and submitting the form:
  - **Cancel**: Cancels the diagnosis and returns to the dashboard.
  - **Submit**: Submits the diagnosis data and returns to the dashboard.
  - **Next**: Moves to the next step in the diagnosis process.

### Diagnosis Steps

1.  **Patient Info**: Collects basic patient information.
2.  **History/Trauma/Vitals/Skin**: Collects information about the patient's history, trauma, vitals, and skin.
3.  **General Signs**: Collects information about the patient's general signs.
4.  **Surgical/Neurologic Signs**: Collects information about the patient's surgical and neurologic signs.
5.  **Neurologic Signs**: Collects more detailed information about the patient's neurologic signs.
6.  **Cardioresp./Psych. Signs**: Collects information about the patient's cardiorespiratory and psychological signs.

### Functionality

- **State Management**: Uses `useState` to manage the current step, the mobile menu, and the form's modified state.
- **Navigation**: Uses `useNavigate` to navigate between screens.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with a sidebar for desktop and a collapsible menu for mobile.

### Code

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { DiagnosisStep } from '../types';
import { SCREEN_NAMES } from '../constants';
import PatientInfoForm from './diagnosisForms/PatientInfoForm';
import HistoryTraumaVitalsSkinForm from './diagnosisForms/HistoryTraumaVitalsSkinForm';
import GeneralSignsForm from './diagnosisForms/GeneralSignsForm';
import SurgicalNeurologicSignsForm from './diagnosisForms/SurgicalNeurologicSignsForm';
import NeurologicSignsForm from './diagnosisForms/NeurologicSignsForm';
import CardiorespPsychSignsForm from './diagnosisForms/CardiorespPsychSignsForm';
import ClearButton from './shared/ClearButton';

const DIAGNOSIS_STEPS_CONFIG: DiagnosisStep[] = [
  { key: 'patientInfo', label: 'Patient Info', component: PatientInfoForm },
  { key: 'historyTraumaVitalsSkin', label: 'History/Trauma/Vitals/Skin', component: HistoryTraumaVitalsSkinForm },
  { key: 'generalSigns', label: 'General Signs', component: GeneralSignsForm },
  { key: 'surgicalNeurologicSigns', label: 'Surgical/Neurologic Signs', component: SurgicalNeurologicSignsForm },
  { key: 'neurologicSigns', label: 'Neurologic Signs', component: NeurologicSignsForm },
  { key: 'cardiorespPsychSigns', label: 'Cardioresp./Psych. Signs', component: CardiorespPsychSignsForm },
];

const EmergencyCaseDiagnosisScreen: React.FC = () => {
  // ... (component implementation)
};

export default EmergencyCaseDiagnosisScreen;
