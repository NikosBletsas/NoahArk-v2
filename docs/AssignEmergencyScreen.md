---
id: assign-emergency-screen
title: Assign Emergency Screen
---

The `AssignEmergencyScreen` component provides a user interface for assigning an emergency case to a doctor. It displays a list of available doctors and allows the user to send the emergency data to a selected doctor.

### Structure

- **`AppHeader`**: A reusable header component that displays the screen title and a back button.
- **Doctors Table**: A table that displays a list of available doctors with the following columns:
  - ID
  - Available From
  - Available Until
  - Doctor Name
  - Speciality
  - Hospital
- **Date-Time Input**: A date-time input for checking the availability of doctors from a specific date and time.
- **Action Buttons**: A set of buttons for performing various actions:
  - **Send Data to DrTMA**: Sends the emergency data to the selected doctor.
  - **Refresh List**: Refreshes the list of available doctors.
  - **Return**: Navigates back to the dashboard.

### Functionality

- **State Management**: Uses `useState` to manage the date-time value for checking availability.
- **Navigation**: Uses `useNavigate` from `react-router-dom` to navigate back to the dashboard.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with the layout adjusting to different screen sizes.

### Code

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Send } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

const AssignEmergencyScreen: React.FC = () => {
  const { theme, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const [dateTimeValue, setDateTimeValue] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });

  const tableRows = Array(10).fill(null).map((_, index) => ({
    id: `${index + 1}`,
    availableFrom: '',
    availableUntil: '',
    doctorName: '',
    speciality: '',
    hospital: '',
  }));

  const tableHeaders = ["ID", "Available From", "Available Until", "Doctor Name", "Speciality", "Hospital"];

  return (
    // ... (JSX for the component)
  );
};

export default AssignEmergencyScreen;
