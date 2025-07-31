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
