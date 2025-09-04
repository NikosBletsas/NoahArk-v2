import React, { useState } from "react";
import { X, UserPlus, AlertCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { NPatient } from "@/api/generated_api";
import { Patient, Theme } from "@/types";
import { SCREEN_NAMES } from "@/constants";
import apiClient from "@/api";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientAdded: (patient: Patient) => void;
  theme: Theme;
  isMidnightTheme: boolean;
  autoNavigateToEmergency?: boolean; // New option
}

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onPatientAdded,
  theme,
  isMidnightTheme,
  autoNavigateToEmergency = true, // Default to auto-navigate
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    fathersName: "",
    birthDate: "",
    nationalityId: "",
    gender: "",
    ssn: "",
    mobilePhone: "",
    homephone: "",
  });

  const addPatientMutation = useMutation({
    mutationFn: async (patientData: NPatient) => {
      console.log("Adding new patient:", patientData);

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

        // Create patient object from input data
        const newPatient: Patient = {
          id: responseData?.id || `TEMP_${Date.now()}`,
          name: patientData.name || "",
          surname: patientData.surname || "",
          dob: patientData.birthDate
            ? new Date(patientData.birthDate).toISOString().split("T")[0]
            : "",
          gender: patientData.gender || "",
          ssn: patientData.nationalityId || "",
          sid: patientData.otherIdentifier || "",
          phone: patientData.mobilePhone || "",
          email: `${patientData.name?.toLowerCase()}.${patientData.surname?.toLowerCase()}@email.com`,
          address: patientData.addressStreet || "",
          city: "Unknown",
          state: "Unknown",
          zipCode: patientData.addressZip || "",
          medicalRecordNumber: `MRN${Date.now()}`,
          insuranceNumber: patientData.insuranceName || "Unknown",
        };

        return newPatient;
      } catch (error) {
        console.error("API call failed:", error);
        throw error;
      }
    },
    onSuccess: (newPatient: Patient) => {
      console.log("Patient added successfully:", newPatient);

      // Always notify parent component
      onPatientAdded(newPatient);

      // Close modal first
      handleClose();

      // Then navigate to emergency case if enabled
      if (autoNavigateToEmergency) {
        setTimeout(() => {
          navigate(`/${SCREEN_NAMES.EMERGENCY_CASE_DIAGNOSIS}`, {
            state: { selectedPatient: newPatient },
          });
        }, 100); // Small delay to ensure modal closes first
      }
    },
    onError: (error: any) => {
      console.error("Failed to add patient:", error);
      console.error("Error details:", {
        status: error.status,
        message: error.message,
        response: error.response,
        data: error.response?.data,
      });

      let errorMessage = "Failed to add patient. ";

      if (error.status === 502 || error.message?.includes("502")) {
        errorMessage +=
          "Server gateway error. This usually means required fields are missing or there's a validation issue.";
      } else if (error.status === 400 || error.message?.includes("400")) {
        errorMessage +=
          "Bad request. Please check all required fields are filled correctly.";
      } else if (error.status === 401 || error.message?.includes("401")) {
        errorMessage += "You are not logged in. Please login again.";
      } else if (error.status === 500 || error.message?.includes("500")) {
        errorMessage += "Server error occurred. Please contact support.";
      } else {
        errorMessage += error.message || "Unknown error occurred.";
      }

      // Show detailed error in console for debugging
      if (error.response?.data) {
        console.error("Server response data:", error.response.data);
        errorMessage += `\n\nTechnical details: ${JSON.stringify(
          error.response.data
        )}`;
      }

      alert(errorMessage);
    },
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate ALL required fields based on API documentation
    const errors = [];
    if (!formData.name.trim()) errors.push("Name");
    if (!formData.surname.trim()) errors.push("Surname");
    if (!formData.fathersName.trim()) errors.push("Father's Name");
    if (!formData.birthDate) errors.push("Date of Birth");
    if (!formData.nationalityId.trim()) errors.push("Nationality ID");
    if (!formData.gender) errors.push("Sex");

    if (errors.length > 0) {
      alert(`The following fields are required: ${errors.join(", ")}`);
      return;
    }

    // Convert date to ISO datetime format as expected by API
    const birthDateTime = formData.birthDate
      ? new Date(formData.birthDate + "T00:00:00.000Z").toISOString()
      : null;

    // Try minimal payload first - similar to search endpoint
    const patientData: NPatient = {
      name: formData.name.trim(),
      surname: formData.surname.trim(),
    };

    // Add required fields one by one
    if (formData.fathersName.trim()) {
      patientData.fathersName = formData.fathersName.trim();
    }

    if (birthDateTime) {
      patientData.birthDate = birthDateTime;
    }

    if (formData.nationalityId.trim()) {
      patientData.nationalityId = formData.nationalityId.trim();
    }

    if (formData.gender) {
      patientData.gender = formData.gender;
      patientData.sex = formData.gender; // Some backends expect both
    }

    console.log("Submitting patient data:", patientData);
    console.log("Raw form data:", formData);
    console.log("Payload size:", JSON.stringify(patientData).length, "bytes");

    // Test with minimal payload first
    console.log("Testing with minimal payload...");
    addPatientMutation.mutate(patientData);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      surname: "",
      fathersName: "",
      birthDate: "",
      nationalityId: "",
      gender: "",
      ssn: "",
      mobilePhone: "",
      homephone: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-2xl mx-4 ${theme.card} backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-6 border-b ${
            isMidnightTheme ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.accent}`}>
              <UserPlus className={`w-5 h-5 ${theme.textOnAccent}`} />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${theme.textPrimary}`}>
                Add New Patient
              </h2>
              <p className={`text-sm ${theme.textSecondary} mt-1`}>
                {autoNavigateToEmergency
                  ? "Patient will be automatically selected for emergency case"
                  : "Patient will be added to search results"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={`p-2 rounded-lg hover:${
              isMidnightTheme ? "bg-gray-700" : "bg-gray-100"
            } transition-colors`}
          >
            <X className={`w-5 h-5 ${theme.textSecondary}`} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Name */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.textSecondary} mb-2`}
              >
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter first name"
                className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              />
            </div>

            {/* Surname */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.textSecondary} mb-2`}
              >
                Surname *
              </label>
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => handleInputChange("surname", e.target.value)}
                placeholder="Enter last name"
                className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              />
            </div>

            {/* Father's Name */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.textSecondary} mb-2`}
              >
                Father's Name *
              </label>
              <input
                type="text"
                value={formData.fathersName}
                onChange={(e) =>
                  handleInputChange("fathersName", e.target.value)
                }
                placeholder="Enter father's name"
                className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.textSecondary} mb-2`}
              >
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              />
            </div>

            {/* Nationality ID */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.textSecondary} mb-2`}
              >
                Nationality ID *
              </label>
              <input
                type="text"
                value={formData.nationalityId}
                onChange={(e) =>
                  handleInputChange("nationalityId", e.target.value)
                }
                placeholder="Enter nationality ID"
                className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              />
            </div>

            {/* Sex */}
            <div>
              <label
                className={`block text-sm font-medium ${theme.textSecondary} mb-2`}
              >
                Sex *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className={`w-full px-4 py-3 border ${theme.inputBorder} ${theme.inputBackground} ${theme.textPrimary} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                required
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Error Display */}
          {addPatientMutation.error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 text-sm">
                {addPatientMutation.error.message || "Failed to add patient"}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className={`px-6 py-3 border ${theme.buttonSecondaryBorder} ${theme.buttonSecondaryText} rounded-lg hover:${theme.buttonSecondaryHoverBg} transition-colors font-medium`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                addPatientMutation.isPending ||
                !formData.name.trim() ||
                !formData.surname.trim() ||
                !formData.fathersName.trim() ||
                !formData.birthDate ||
                !formData.nationalityId.trim() ||
                !formData.gender
              }
              className={`px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
            >
              {addPatientMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Add Patient</span>
                  {autoNavigateToEmergency && (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;
