import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import apiClient from "@/api";
import { NEmergencyCase } from "@/api/generated_api";
import { SCREEN_NAMES } from "@/constants";
import { useEmergencyCaseStore } from "@/stores/emergencyCaseStore";

export const useEmergencyCase = () => {
  const navigate = useNavigate();
  const { getFormData, resetFormData } = useEmergencyCaseStore(); // read form's data and clean form after success submit

  const submitMutation = useMutation({
    mutationFn: async (emergencyCase: NEmergencyCase) => {
      console.log("Submitting to API:", emergencyCase);

      // Use the generated API client
      const response = await apiClient.api.mainNewEmergencyCaseCreate(
        emergencyCase
      );

      // Parse response if needed / Fallback for not lose response data
      let responseData = response.data;
      if (!responseData && response) {
        try {
          const clonedResponse = response.clone();
          const rawText = await clonedResponse.text();
          if (rawText) {
            responseData = JSON.parse(rawText);
          }
        } catch (e) {
          console.error("Response parsing error:", e);
        }
      }

      console.log("API Response:", responseData);

      // IMPORTANT: Check if we need to send data after creating case
      if (responseData?.caseId) {
        // Maybe need to call SendData after creating case
        console.log("Case created with ID:", responseData.caseId);

        // Try to send data to finalize
        try {
          await apiClient.api.mainSendDataList();
          console.log("Data sent to server");
        } catch (sendError) {
          console.warn("SendData failed, but case was created:", sendError);
        }
      }

      return responseData;
    },

    onSuccess: (data) => {
      const caseId = data?.caseId;
      toast.success(`Emergency case created! Case No: ${caseId || "Unknown"}`);
      console.log("Emergency case response:", data);

      resetFormData();

      const formData = getFormData();
      const emergencyCaseData = {
        caseId: caseId,
        patientName: formData.name,
        patientSurname: formData.surname,
        patientId: formData.patientId,
        createdAt: new Date().toISOString(),
      };
      
      // Navigate to dashboard with the new case information
      navigate(`/${SCREEN_NAMES.DASHBOARD}`, {
        state: {
          newEmergencyCase: emergencyCaseData,
        },
      });
    },

    onError: (error: Error) => {
      console.error("Failed to submit emergency case:", error);
      toast.error(`Failed to submit: ${error.message}`);
    },
  });

  const submitEmergencyCase = () => {
    const formData = getFormData();

    console.log("=== DEBUG: Emergency Case Submit ===");
    console.log("Form data from store:", formData);
    console.log("Patient ID:", formData.patientId);
    console.log("Patient Name:", formData.name);
    console.log("Patient Surname:", formData.surname);

    if (!formData.patientId || !formData.name || !formData.surname) {
      console.error("Missing required fields:", {
        patientId: formData.patientId,
        name: formData.name,
        surname: formData.surname
      });
      toast.error("Please fill in required patient information");
      return;
    }

    console.log("Form data before submit:", formData);
    submitMutation.mutate(formData);
  };

  return {
    submitEmergencyCase,
    isSubmitting: submitMutation.isPending,
    submitError: submitMutation.error,
    submitSuccess: submitMutation.isSuccess,
  };
};
