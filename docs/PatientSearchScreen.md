---
id: patient-search-screen
title: Patient Search Screen
---

The `PatientSearchScreen` component provides a user interface for searching, filtering, and managing patient records. It includes both basic and advanced search functionalities, a table to display search results, and a modal form for editing patient information.

### Structure

- **`AppHeader`**: A reusable header component that displays the screen title and a back button.
- **Search and Filter Section**:
  - **Basic Search**: A search input for quickly finding patients by name, ID, SSN, or System ID.
  - **Advanced Search**: A collapsible panel with additional filters for SSN, System ID, and gender.
  - **Add New Patient**: A button that navigates to the `EmergencyCaseDiagnosisScreen` to add a new patient.
- **Results Table**: A table that displays the filtered patient records with columns for Patient ID, Surname, Name, Date of Birth, Gender, SSN, and System ID.
- **Edit Patient**: An "Edit" button in each row of the table that opens the `PatientEditForm` modal.
- **`PatientEditForm`**: A modal form for editing the details of a selected patient. It includes fields for basic information, contact details, address, emergency contact, and medical/insurance information.
- **Footer**: A "Return to Dashboard" button.

### Functionality

- **State Management**: Uses `useState` to manage the search term, advanced filters, patient data, and the visibility of the advanced search panel and edit form.
- **Filtering**: Filters the list of patients based on the search term and advanced filters.
- **Patient Data**: Initializes with a set of mock patient data.
- **Editing Patients**:
  - The `handleEditPatient` function opens the edit form with the selected patient's data.
  - The `handleSavePatient` function updates the patient's information in the state.
  - The `handleCloseEditForm` function closes the edit form.
- **Navigation**: Uses `useNavigate` to navigate back to the dashboard or to the "Add New Patient" screen.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.

### Code

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, UserPlus, Filter, Edit, X, Save, User, Phone, Mail, MapPin, Heart, Shield, FileText } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';
import AppHeader from './shared/AppHeader';

// ... (Patient interface and PatientEditForm component)

const PatientSearchScreen: React.FC = () => {
  const { theme, isMidnightTheme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState({
    ssn: '',
    sid: '',
    gender: '',
    dobFrom: '',
    dobTo: ''
  });

  // ... (useEffect to initialize mock patients)

  const filteredPatients = patients.filter(patient => {
    // ... (filtering logic)
  });

  const tableHeaders = ["Patient ID", "Surname", "Name", "Date of Birth", "Gender", "SSN", "System ID"];

  const handleAdvancedFilterChange = (field: string, value: string) => {
    setAdvancedFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      ssn: '',
      sid: '',
      gender: '',
      dobFrom: '',
      dobTo: ''
    });
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowEditForm(true);
  };

  const handleSavePatient = (updatedPatient: Patient) => {
    setPatients(prev => 
      prev.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
    alert('Patient information updated successfully!');
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedPatient(null);
  };

  return (
    // ... (JSX for the component)
  );
};

export default PatientSearchScreen;
