---
id: consultations-screen
title: Consultations Screen
---

The `ConsultationsScreen` component provides a user interface for viewing and managing medical consultations. It displays a list of consultations and allows the user to view the details of each one.

### Structure

- **`AppHeader`**: A reusable header component that displays the screen title and a back button.
- **`ConsultationList`**: A component that displays a list of consultations.
- **`ConsultationDetail`**: A component that displays the details of a selected consultation.
- **Action Buttons**: A set of buttons for performing various actions:
  - **Delete Advice**: Deletes the selected consultation.
  - **Refresh List**: Refreshes the list of consultations.
  - **Return**: Navigates back to the dashboard.

### Functionality

- **State Management**: Uses `useState` to manage the selected consultation.
- **Navigation**: Uses `useNavigate` from `react-router-dom` to navigate back to the dashboard.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with a split view for desktop and a single view for mobile.

### Code

```typescript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../src/contexts/ThemeContext';
import { Consultation } from '../types';
import { SCREEN_NAMES } from '../constants';
import { Trash2, RefreshCw, ArrowLeft, X } from 'lucide-react';
import AppHeader from './shared/AppHeader';
import ConsultationList from './ConsultationList';
import ConsultationDetail from './ConsultationDetail';

const ConsultationsScreen: React.FC = () => {
  const { theme, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  // ... (consultations data)

  useEffect(() => {
    if (consultations.length > 0 && !selectedConsultation) {
      setSelectedConsultation(consultations[0]);
    }
  }, [consultations, selectedConsultation]);

  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
  };

  const handleCloseDetails = () => {
    setSelectedConsultation(null);
  };

  return (
    // ... (JSX for the component)
  );
};

export default ConsultationsScreen;
