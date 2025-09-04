import apiClient from "@/api";
import { NPatient } from "@/api/generated_api";
import { useMutation } from "@tanstack/react-query";

export const useAddPatient = () => {
  const addPatientMutation = useMutation({
    mutationFn: async (patientData: NPatient) => {
      console.log("Adding patient:", patientData);
      
      try {
        const response = await apiClient.api.mainAddPatientCreate(patientData);
        console.log("Add patient response:", response);
        
        // Handle response similar to search endpoint
        let responseData = null;
        if (!response.data) {
          try {
            const clonedResponse = response.clone();
            const rawText = await clonedResponse.text();
            console.log("Raw response text:", rawText);
            
            if (rawText) {
              responseData = JSON.parse(rawText);
              console.log("Parsed response data:", responseData);
            }
          } catch (parseError) {
            console.error("Failed to parse response:", parseError);
          }
        } else {
          responseData = response.data;
        }
        
        return responseData;
      } catch (error) {
        console.error("API call failed:", error);
        throw error;
      }
    },
    onSuccess: (responseData) => {
      console.log("Patient added successfully:", responseData);
    },
    onError: (error: any) => {
      console.error("Failed to add patient:", error);
    },
  });

  return {
    addPatient: addPatientMutation.mutate,
    isLoading: addPatientMutation.isPending,
    error: addPatientMutation.error,
    isSuccess: addPatientMutation.isSuccess,
    data: addPatientMutation.data, // Add this to access response data
  };
};
