import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../api';

/**
 * Custom hook for medical device operations
 * Handles patient monitor initialization and blood pressure data retrieval
 */
export const useDeviceOperations = () => {
  const [error, setError] = useState<string | null>(null);

  // Mutation for initializing the patient monitor
  const initPatientMonitorMutation = useMutation({
    mutationFn: () => apiClient.api.devicesPatientMonitorInitList(),
    onSuccess: () => {
      setError(null);
    },
    onError: (error: any) => {
      // Handle patient monitor initialization errors
      if (error instanceof Response) {
        setError(`Failed to initialize patient monitor: HTTP ${error.status}`);
      } else if (error instanceof Error) {
        setError(`Monitor initialization error: ${error.message}`);
      } else {
        setError('Failed to initialize patient monitor');
      }
    },
  });

  // Query for blood pressure device data
  const bloodPressureQuery = useQuery({
    queryKey: ['bloodPressureData'],
    queryFn: () => apiClient.api.devicesBloodPressureGetDeviceDataList(),
    enabled: false, // Only fetch when explicitly requested
    retry: 2,
    refetchInterval: 5000, // Auto-refresh every 5 seconds when active
  });

  // Mutation for sending blood pressure data
  const sendBloodPressureDataMutation = useMutation({
    mutationFn: () => apiClient.api.devicesBloodPressureSendDataList(),
    onSuccess: () => {
      setError(null);
      // Refresh blood pressure data after sending
      bloodPressureQuery.refetch();
    },
    onError: (error: any) => {
      if (error instanceof Response) {
        setError(`Failed to send blood pressure data: HTTP ${error.status}`);
      } else if (error instanceof Error) {
        setError(`Data transmission error: ${error.message}`);
      } else {
        setError('Failed to send blood pressure data');
      }
    },
  });

  return {
    // Patient Monitor operations
    initPatientMonitor: initPatientMonitorMutation.mutate,
    isInitializingMonitor: initPatientMonitorMutation.isPending,
    
    // Blood Pressure operations
    getBloodPressureData: bloodPressureQuery.refetch,
    bloodPressureData: bloodPressureQuery.data,
    isLoadingBloodPressure: bloodPressureQuery.isFetching,
    sendBloodPressureData: sendBloodPressureDataMutation.mutate,
    isSendingData: sendBloodPressureDataMutation.isPending,
    
    // Common error state
    error,
    clearError: () => setError(null),
  };
};