import { THEME_KEYS, SCREEN_NAMES, DIAGNOSIS_STEP_KEYS } from './constants';
import React from 'react';

export interface Theme {
  name: string;
  background: string;
  primary: string;
  accent: string;
  card: string;
  icon: string;
  textPrimary: string;
  textSecondary: string;
  textOnAccent: string;
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  buttonSecondaryBorder: string;
  buttonSecondaryText: string;
  buttonSecondaryHoverBg: string;
}

export type ThemeKey = typeof THEME_KEYS[number];

export type ScreenName = typeof SCREEN_NAMES[keyof typeof SCREEN_NAMES];

export type DiagnosisStepKey = typeof DIAGNOSIS_STEP_KEYS[number];

export interface AppHeaderProps {
  theme: any;
  title: string;
  onBack: () => void;
  showThemeButton?: boolean;
  onShowThemeSelector?: () => void;
  onThemeChange?: (themeKey: string) => void;
  isMidnightTheme: boolean;
  currentThemeKey?: string;
}

export interface BaseScreenProps {
  theme: any;
  setCurrentScreen: (screen: ScreenName) => void; // Changed from string to ScreenName
  isMidnightTheme: boolean;
  currentThemeKey: string;
  setShowThemeSelector?: (show: boolean) => void;
  onThemeChange?: (themeKey: string) => void;
  setShowConnectionStatus?: (show: boolean) => void;
  setShowConnectivityTest?: (show: boolean) => void;
}

export interface ModalScreenProps { 
  theme: Theme;
  isMidnightTheme: boolean;
  currentThemeKey: ThemeKey;
  setCurrentScreen: (screen: ScreenName) => void; 
  onClose: () => void;
  setShowConnectionStatus?: (show: boolean) => void;
  setShowConnectivityTest?: (show: boolean) => void; 
}

export interface DiagnosisStep {
  key: DiagnosisStepKey;
  label: string;
  component: React.FC<DiagnosisFormStepProps>;
}

export interface DiagnosisFormStepProps {
  theme: Theme;
  isMidnightTheme: boolean;
  onFormChange?: () => void;
}

export interface LoginRequest {
  username?: string | null;
  password?: string | null;
}

export interface LoginResponse {
  success?: boolean;
  message?: string | null;
  token?: string | null;
}

export interface InitResponse {
  someData?: string | null;
}
