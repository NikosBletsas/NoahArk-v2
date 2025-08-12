---
id: themecontext
title: ThemeContext
---

The `ThemeContext` provides the theme for the application. It manages the current theme and provides a function to toggle it.

### Structure

- **`ThemeContext`**: The context object that provides the theme data.
- **`ThemeProvider`**: A component that provides the theme context to its children.
- **`useTheme`**: A custom hook to access the theme context.

### Functionality

- **`theme`**: The current theme object.
- **`currentThemeKey`**: The key of the current theme.
- **`isMidnightTheme`**: A boolean that indicates whether the current theme is the "midnight" theme.
- **`toggleTheme`**: A function to toggle the theme between "noah" and "black".

### Code

```typescript
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

/**
 * Provides the theme context to the application.
 * It manages the current theme and provides a function to toggle it.
 */
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

/**
 * A custom hook to access the theme context.
 * It provides the current theme, theme key, and a function to toggle the theme.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
