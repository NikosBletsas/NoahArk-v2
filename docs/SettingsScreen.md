---
id: settings-screen
title: Settings Screen
---

The `SettingsScreen` component provides a user interface for configuring various settings of the application. It includes a sidebar for navigation and a main content area with different settings sections.

### Structure

- **`SidebarNavItem`**: A reusable component for displaying a navigation item in the sidebar.
- **Sidebar**: A navigation sidebar with the following items:
  - Save
  - Restart
  - Devices
  - Advanced
- **Main Content**: The main content area is divided into several sections:
  - **EMR**: Settings for the Electronic Medical Record system.
  - **Video Settings**: Settings for the video stream.
  - **Software Activation**: Settings for software activation, including the system ID and activation key.
  - **FTP**: Settings for FTP, including host, port, username, password, and folder paths.
  - **Video Call Settings**: Settings for the video call service.
  - **Drug List Settings**: Settings for the drug list API.

### Functionality

- **Navigation**: Uses `useNavigate` from `react-router-dom` to navigate to the dashboard.
- **State Management**: Uses `useState` to manage the visibility of the FTP password and the mobile menu.
- **Theming**: Uses the `useTheme` hook to apply the current theme to the component.
- **Layout**: The screen is designed to be responsive, with a sidebar for desktop and a collapsible menu for mobile.

### Code

```typescript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Save, RefreshCw, Monitor as DeviceMonitor, Settings as SettingsIcon, Eye, EyeOff, FolderOpen, Copy, CheckCircle, Menu as MenuIcon, X } from 'lucide-react';
import { useTheme } from '../src/contexts/ThemeContext';
import { SCREEN_NAMES } from '../constants';
import FormSection from './shared/FormSection';
import InputWithIconButton from './shared/InputWithIconButton';
import { LabelledInput } from './shared/FormControls';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ icon, label, isActive, onClick }) => {
  // ... (SidebarNavItem component implementation)
};

const SettingsScreen: React.FC = () => {
  const { theme, isMidnightTheme, currentThemeKey, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showFtpPassword, setShowFtpPassword] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarContent = (isMobile?: boolean) => (
    // ... (sidebarContent implementation)
  );

  return (
    // ... (JSX for the component)
  );
};

export default SettingsScreen;
