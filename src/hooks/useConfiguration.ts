import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../api';

/**
 * Custom hook for application configuration management
 * Handles getting and setting system configuration with proper caching
 */
export const useConfiguration = () => {
  const [error, setError] = useState<string | null>(null);

  // Query for getting current configuration
  const configurationQuery = useQuery({
    queryKey: ['configuration'],
    queryFn: () => apiClient.api.configurationGetConfigurationList(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });

  // Mutation for updating configuration
  const updateConfigurationMutation = useMutation({
    mutationFn: (configData: any) =>
      apiClient.api.configurationSetConfigurationCreate(),
    onSuccess: () => {
      setError(null);
      // Invalidate and refetch configuration after successful update
      configurationQuery.refetch();
    },
    onError: (error: any) => {
      // Handle configuration update errors
      if (error instanceof Response) {
        if (error.status === 501) {
          setError('Application not initialized - please restart');
        } else if (error.status === 503) {
          setError('Configuration save failed - please try again');
        } else {
          setError(`Configuration update failed: HTTP ${error.status}`);
        }
      } else if (error instanceof Error) {
        setError(`Configuration error: ${error.message}`);
      } else {
        setError('Failed to update configuration');
      }
    },
  });

  return {
    // Configuration data and loading state
    configuration: configurationQuery.data,
    isLoadingConfiguration: configurationQuery.isLoading,
    isConfigurationError: configurationQuery.isError,
    
    // Configuration update operations
    updateConfiguration: updateConfigurationMutation.mutate,
    isUpdatingConfiguration: updateConfigurationMutation.isPending,
    
    // Manual refresh capability
    refreshConfiguration: configurationQuery.refetch,
    
    // Error handling
    error: error || (configurationQuery.error as any)?.message,
    clearError: () => setError(null),
  };
};