import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../api';
import { NEmergencyCase } from '../generated_api';

/**
 * Custom hook for emergency case management
 * Handles emergency case submission and doctor availability queries
 */
export const useEmergencyCase = () => {
  const [error, setError] = useState<string | null>(null);
  const [submittedCase, setSubmittedCase] = useState<NEmergencyCase | null>(null);

  // Mutation for submitting a new emergency case
  const submitCaseMutation = useMutation({
    mutationFn: (emergencyCase: NEmergencyCase) =>
      apiClient.api.mainNewEmergencyCaseCreate(emergencyCase),
    onSuccess: (data: any) => {
      // Store the submitted case for confirmation
      setSubmittedCase(data);
      setError(null);
    },
    onError: (error: any) => {
      // Handle emergency case submission errors
      if (error instanceof Response) {
        if (error.status === 501) {
          setError('Please log in to submit emergency cases');
        } else {
          setError(`HTTP ${error.status}: ${error.statusText}`);
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to submit emergency case');
      }
      setSubmittedCase(null);
    },
  });

  // Query for getting doctor availabilities (efimeries)
  const doctorAvailabilityQuery = useQuery({
    queryKey: ['doctorAvailability'],
    queryFn: () => apiClient.api.mainGetEfimeriesList(),
    enabled: false, // Only fetch when explicitly requested
    retry: 1,
  });

  // Reset the submitted case state
  const resetSubmittedCase = () => {
    setSubmittedCase(null);
    setError(null);
  };

  return {
    submitCase: submitCaseMutation.mutate,
    isSubmitting: submitCaseMutation.isPending,
    getDoctorAvailability: doctorAvailabilityQuery.refetch,
    isLoadingAvailability: doctorAvailabilityQuery.isFetching,
    doctorAvailability: doctorAvailabilityQuery.data,
    error,
    submittedCase,
    resetSubmittedCase,
  };
};