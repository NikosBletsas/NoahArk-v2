import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../api';
import { NPatient } from '../generated_api';

/**
 * Custom hook for patient management operations
 * Handles adding new patients with validation and error handling
 */
export const usePatientManagement = () => {
  const [error, setError] = useState<string | null>(null);
  const [addedPatient, setAddedPatient] = useState<NPatient | null>(null);

  // Mutation for adding a new patient to the system
  const addPatientMutation = useMutation({
    mutationFn: (patientData: NPatient) =>
      apiClient.api.mainAddPatientCreate(patientData),
    onSuccess: (data: any) => {
      // Store the newly added patient with assigned ID
      setAddedPatient(data);
      setError(null);
    },
    onError: (error: any) => {
      // Handle specific patient creation errors
      if (error instanceof Response) {
        if (error.status === 502) {
          setError('Required fields missing or patient already exists');
        } else if (error.status === 501) {
          setError('Please log in to add patients');
        } else {
          setError(`HTTP ${error.status}: ${error.statusText}`);
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to add patient');
      }
      setAddedPatient(null);
    },
  });

  // Reset the added patient state
  const resetAddedPatient = () => {
    setAddedPatient(null);
    setError(null);
  };

  return {
    addPatient: addPatientMutation.mutate,
    isLoading: addPatientMutation.isPending,
    error,
    addedPatient,
    resetAddedPatient,
  };
};