import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import apiClient from "@/api";
import { NPatient } from "@/api/generated_api";
import { Patient } from '@/types';

/**
 * Transform API response (NPatient) to our domain model (Patient)
 */
const transformApiPatientToPatient = (apiPatient: NPatient): Patient => {
  return {
    id: apiPatient.id || '',
    name: apiPatient.name || '',
    surname: apiPatient.surname || '',
    dob: apiPatient.birthDate ? new Date(apiPatient.birthDate).toISOString().split('T')[0] : '',
    gender: apiPatient.gender || apiPatient.sex || '',
    ssn: apiPatient.ssn || '',
    sid: apiPatient.otherIdentifier || '',
    phone: apiPatient.mobilePhone || apiPatient.homephone || '',
    email: `${apiPatient.name?.toLowerCase()}.${apiPatient.surname?.toLowerCase()}@email.com`,
    address: apiPatient.addressStreet,
    city: 'Unknown',
    state: 'Unknown', 
    zipCode: apiPatient.addressZip,
    medicalRecordNumber: `MRN${apiPatient.id}`,
    insuranceNumber: apiPatient.insuranceName || 'Unknown'
  };
};

/**
 * Custom hook for patient search functionality
 * Uses type assertions to work around void return types from generated API
 */
export const usePatientSearch = () => {
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);

  const searchMutation = useMutation({
    mutationFn: async (searchCriteria: NPatient) => {
      const response = await apiClient.api.mainSearchPatientCreate(searchCriteria);
      
      // Type assertion - we know the API actually returns patient data
      // even though Swagger says it returns void
      return response.data as NPatient[];
    },
    onSuccess: (apiPatients: NPatient[]) => {
      // Transform API response to our domain model
      const transformedPatients = apiPatients.map(transformApiPatientToPatient);
      setSearchResults(transformedPatients);
      setError(null);
      
      console.log(`Found ${apiPatients.length} patients from API`);
    },
    // No onError - centralized error handler in queryClient.ts handles this
  });

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