import { Theme, ThemeKey } from './types';

export const THEME_KEYS = ['noah','black',] as const;

export const THEMES: Record<ThemeKey, Theme> = {  noah: {
    name: 'NOAH Official',
    background: 'from-slate-100 via-gray-50 to-white', 
    primary: 'from-[#4cbfd4] to-[#2a797f]', 
    accent: 'from-slate-700 via-slate-800 to-slate-900', 
    card: 'bg-white/90 backdrop-blur-md border border-gray-200/50', 
    icon: 'text-[#2a797f]',
    textPrimary: 'text-slate-800', 
    textSecondary: 'text-slate-600',
    textOnAccent: 'text-white', 
    inputBackground: 'bg-white/80',
    inputBorder: 'border-gray-300',
    inputPlaceholder: 'placeholder-gray-400',
    buttonSecondaryBorder: 'border-gray-300',
    buttonSecondaryText: 'text-slate-700',
    buttonSecondaryHoverBg: 'hover:bg-gray-50',
  },
  black: {
    name: 'Deep Black',
    background: 'from-black via-black to-black',
    primary: 'from-cyan-600 to-blue-700',
    accent: 'from-slate-800 to-slate-900', 
    card: 'bg-gray-900/80 backdrop-blur-md border border-gray-700/60', 
    icon: 'text-cyan-400', 
    textPrimary: 'text-gray-100', 
    textSecondary: 'text-gray-400', 
    textOnAccent: 'text-gray-100',
    inputBackground: 'bg-gray-800/60', 
    inputBorder: 'border-gray-700', 
    inputPlaceholder: 'placeholder-gray-500', 
    buttonSecondaryBorder: 'border-gray-600',
    buttonSecondaryText: 'text-gray-300',
    buttonSecondaryHoverBg: 'hover:bg-gray-700/40', 
  }
};

export const SCREEN_NAMES = {
  LOGIN: 'login',
  DASHBOARD: 'dashboard',
  PATIENT_SEARCH: 'patient-search',
  MEASUREMENTS: 'measurements',
  SYSTEM_OPERATIONS: 'system-operations',
  SPIROMETER: 'spirometer',
  ENDOSCOPE: 'endoscope',
  SETTINGS: 'settings',
  ASSIGN_EMERGENCY: 'assign-emergency',
  EMERGENCY_CASE_DIAGNOSIS: 'emergency-case-diagnosis',
  DEVICE_CONFIGURATION: 'device-configuration',
  CONNECTION_STATUS: 'connection-status',
  CONNECTIVITY_TEST: 'connectivity-test',
  CASE_CONSULTATIONS: 'case-consultations'
} as const;

export const DIAGNOSIS_STEP_KEYS = [
  'patientInfo',
  'historyTraumaVitalsSkin',
  'generalSigns',
  'surgicalNeurologicSigns',
  'neurologicSigns',
  'cardiorespPsychSigns'
] as const;