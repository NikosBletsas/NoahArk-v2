import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';
import { NPatient } from '../generated_api';

/**
 * Custom hook for patient search functionality
 * Handles patient search operations with proper error handling and loading states
 */
export const usePatientSearch = () => {
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<NPatient[]>([]);

  // Mutation for searching patients by name/surname
  const searchMutation = useMutation({
    mutationFn: (searchCriteria: NPatient) =>
      apiClient.api.mainSearchPatientCreate(searchCriteria),
    onSuccess: (data: any) => {
      // Store search results for display
      setSearchResults(data || []);
      setError(null);
    },
    onError: (error: any) => {
      // Handle different error types consistently
      if (error instanceof Response) {
        setError(`HTTP ${error.status}: ${error.statusText}`);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to search patients');
      }
      setSearchResults([]);
    },
  });

  // Clear search results and errors
  const clearSearch = () => {
    setSearchResults([]);
    setError(null);
  };

  return {
    searchPatient: searchMutation.mutate,
    isLoading: searchMutation.isPending,
    error,
    searchResults,
    clearSearch,
  };
};