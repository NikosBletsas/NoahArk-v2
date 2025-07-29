import React, { createContext, useState, useContext, useMemo } from 'react';
import { THEMES } from '../../constants';
import { Theme, ThemeKey } from '../../types';

interface ThemeContextType {
  theme: Theme;
  currentThemeKey: ThemeKey;
  isMidnightTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey>('noah');

  const toggleTheme = () => {
    setCurrentThemeKey((prevTheme) => (prevTheme === 'noah' ? 'black' : 'noah'));
  };

  const theme = THEMES[currentThemeKey];
  const isMidnightTheme = currentThemeKey === 'black';

  const value = useMemo(() => ({
    theme,
    currentThemeKey,
    isMidnightTheme,
    toggleTheme,
  }), [theme, currentThemeKey, isMidnightTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
