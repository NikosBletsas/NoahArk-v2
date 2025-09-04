import { useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import apiClient from "@/api";
import { NPatient } from "@/api/generated_api";
import { Patient } from "@/types";

/**
 * Transform API response (NPatient) to our domain model (Patient)
 */
const transformApiPatientToPatient = (apiPatient: NPatient): Patient => {
  return {
    id: apiPatient.id || "",
    name: apiPatient.name || "",
    surname: apiPatient.surname || "",
    dob: apiPatient.birthDate
      ? new Date(apiPatient.birthDate).toISOString().split("T")[0]
      : "",
    gender: apiPatient.gender || apiPatient.sex || "",
    ssn: apiPatient.ssn || "",
    sid: apiPatient.otherIdentifier || "",
    phone: apiPatient.mobilePhone || apiPatient.homephone || "",
    email: `${apiPatient.name?.toLowerCase()}.${apiPatient.surname?.toLowerCase()}@email.com`,
    address: apiPatient.addressStreet,
    city: "Unknown",
    state: "Unknown",
    zipCode: apiPatient.addressZip,
    medicalRecordNumber: `MRN${apiPatient.id}`,
    insuranceNumber: apiPatient.insuranceName || "Unknown",
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
      console.log("Sending search criteria:", searchCriteria);
      const response = await apiClient.api.mainSearchPatientCreate(searchCriteria);

      if (!response.data) {
        try {
          const clonedResponse = response.clone();
          const rawText = await clonedResponse.text();
          console.log("Raw API response text:", rawText);

          if (rawText) {
            const parsedData = JSON.parse(rawText);
            console.log("Manually parsed data:", parsedData);

            // Επιστρέφουμε το patients array, όχι το object
            const patients = parsedData.patients || parsedData || [];
            console.log("Extracted patients:", patients);
            return patients;
          }
        } catch (error) {
          console.error("Failed to parse response:", error);
          console.error("Raw text was:", rawText);
        }
        return [];
      }

      return response.data as NPatient[];
    },
    onSuccess: (apiPatients: NPatient[]) => {
      console.log("=== DEBUG: Patient Search Success ===");
      console.log("Raw API patients:", apiPatients);

      // Τώρα το apiPatients είναι array και όχι object
      const transformedPatients = apiPatients.map((apiPatient, index) => {
        console.log(`Patient ${index}:`, apiPatient);
        console.log(`Patient ${index} ID:`, apiPatient.id);
        const transformed = transformApiPatientToPatient(apiPatient);
        console.log(`Transformed patient ${index}:`, transformed);
        return transformed;
      });
      
      setSearchResults(transformedPatients);
      setError(null);

      console.log(`Found ${apiPatients.length} patients from API`);
      console.log("Final transformed patients:", transformedPatients);
    },
    onError: (error: any) => {
      console.error("Search error:", error);
      setError(error.message || "An error occurred during search");
      setSearchResults([]);
    },
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
}