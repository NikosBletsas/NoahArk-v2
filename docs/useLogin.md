---
id: uselogin
title: useLogin Hook
---

The `useLogin` hook provides the functionality for user authentication, including both online and offline login.

### Structure

- **`loginMutation`**: A mutation that handles online login by calling the `apiClient.api.loginApiLoginList` function.
- **`loginOfflineMutation`**: A mutation that simulates a successful offline login.
- **`error`**: A state variable that holds any error messages that occur during the login process.

### Functionality

- **`login`**: A function that triggers the `loginMutation` to perform an online login.
- **`loginOffline`**: A function that triggers the `loginOfflineMutation` to perform an offline login.
- **`isLoading`**: A boolean that indicates whether either the online or offline login is in progress.
- **`error`**: A string that contains any error messages that occurred during the login process.

### Code

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';
import { SCREEN_NAMES } from '../../constants';

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: (credentials: { user?: string; password?: string }) =>
      apiClient.api.loginApiLoginList(credentials),
    onSuccess: () => {
      navigate(`/${SCREEN_NAMES.DASHBOARD}`);
    },
    onError: (error: any) => {
      console.error('Login error:', error);
      if (error instanceof Response) {
        setError(`HTTP ${error.status}: ${error.statusText}`);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    },
  });

  const loginOfflineMutation = useMutation({
    mutationFn: async () => {
      // Simulate a successful offline login
      return Promise.resolve();
    },
    onSuccess: () => {
      navigate(`/${SCREEN_NAMES.DASHBOARD}`);
    },
    onError: (error: any) => {
      console.error('Login offline error:', error);
      if (error instanceof Response) {
        setError(`HTTP ${error.status}: ${error.statusText}`);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    },
  });

  return {
    login: loginMutation.mutate,
    loginOffline: loginOfflineMutation.mutate,
    isLoading: loginMutation.isPending || loginOfflineMutation.isPending,
    error,
  };
};
