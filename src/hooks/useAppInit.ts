import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../api';

/**
 * Custom hook for application initialization
 * Handles login API initialization and main app initialization with session recovery
 */
export const useAppInitialization = () => {
  const [error, setError] = useState<string | null>(null);
  const [recoveredSessions, setRecoveredSessions] = useState<any[]>([]);

  // Mutation for initializing the login API (app startup)
  const initLoginApiMutation = useMutation({
    mutationFn: () => apiClient.api.loginApiInitList(),
    onSuccess: () => {
      setError(null);
    },
    onError: (error: any) => {
      // Handle login API initialization errors
      if (error instanceof Response) {
        if (error.status === 401) {
          setError('Invalid license key - please check your license');
        } else if (error.status === 503) {
          setError('No connectivity to EMR API - check network connection');
        } else {
          setError(`Initialization failed: HTTP ${error.status}`);
        }
      } else if (error instanceof Error) {
        setError(`Initialization error: ${error.message}`);
      } else {
        setError('Failed to initialize application');
      }
    },
  });

  // Mutation for main application initialization (after login)
  const initMainAppMutation = useMutation({
    mutationFn: () => apiClient.api.mainInitList(),
    onSuccess: (data: any) => {
      setError(null);
      // Store any recovered sessions if present
      if (data && Array.isArray(data)) {
        setRecoveredSessions(data);
      }
    },
    onError: (error: any) => {
      if (error instanceof Response) {
        setError(`Main app initialization failed: HTTP ${error.status}`);
      } else if (error instanceof Error) {
        setError(`Main app error: ${error.message}`);
      } else {
        setError('Failed to initialize main application');
      }
      setRecoveredSessions([]);
    },
  });

  // Mutation for setting a recovery session
  const setRecoverySessionMutation = useMutation({
    mutationFn: (sessionID: string) =>
      apiClient.api.mainSetRecoverySessionList({ sessionID }),
    onSuccess: () => {
      setError(null);
    },
    onError: (error: any) => {
      if (error instanceof Response) {
        if (error.status === 501) {
          setError('Please log in to set recovery session');
        } else if (error.status === 503) {
          setError('Failed to set recovery session');
        } else {
          setError(`Recovery session error: HTTP ${error.status}`);
        }
      } else if (error instanceof Error) {
        setError(`Recovery session error: ${error.message}`);
      } else {
        setError('Failed to set recovery session');
      }
    },
  });

  // Query for battery status (for system monitoring)
  const batteryStatusQuery = useQuery({
    queryKey: ['batteryStatus'],
    queryFn: () => apiClient.api.mainGetBatteryStatusList(),
    enabled: false, // Only fetch when explicitly requested
    refetchInterval: 30000, // Refresh every 30 seconds when active
    retry: 1,
  });

  return {
    // Login API initialization
    initLoginApi: initLoginApiMutation.mutate,
    isInitializingLoginApi: initLoginApiMutation.isPending,
    
    // Main app initialization
    initMainApp: initMainAppMutation.mutate,
    isInitializingMainApp: initMainAppMutation.isPending,
    recoveredSessions,
    
    // Recovery session management
    setRecoverySession: setRecoverySessionMutation.mutate,
    isSettingRecoverySession: setRecoverySessionMutation.isPending,
    
    // Battery status monitoring
    getBatteryStatus: batteryStatusQuery.refetch,
    batteryStatus: batteryStatusQuery.data,
    isLoadingBatteryStatus: batteryStatusQuery.isFetching,
    
    // Common state
    error,
    clearError: () => setError(null),
    clearRecoveredSessions: () => setRecoveredSessions([]),
  };
};