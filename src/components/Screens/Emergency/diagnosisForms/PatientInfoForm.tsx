import React from "react";
import { DiagnosisFormStepProps } from "@/types";
import {
  LabelledInput,
  LabelledSelect,
  LabelledTextarea,
} from "../../../shared/FormControls";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEmergencyCaseStore } from "@/stores/emergencyCaseStore";

const PatientInfoForm: React.FC<DiagnosisFormStepProps> = ({
  theme,
  isMidnightTheme,
  onFormChange,
}) => {
  const location = useLocation();
  const selectedPatient = location.state?.selectedPatient;
  const { formData, updateFormData } = useEmergencyCaseStore();

  // Check if patient data comes from search/add patient (making fields read-only)
  const isPatientDataFromExternal = !!selectedPatient;

  const [formValues, setFormValues] = useState(() => ({
    "patient-id": formData.patientId || "",
    "patient-ssn-sid": "",
    "patient-age": formData.erAge || "",
    "patient-name": formData.name || "",
    "patient-father-name": formData.fathersName || "",
    "patient-surname": formData.surname || "",
    "patient-sex": formData.gender || "",
    "patient-other-identifier": formData.otherIdentifier || "",
  }));

  const handleInputChange = (id: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Map form field IDs to NEmergencyCase properties
    const fieldMapping: Record<string, keyof typeof formData> = {
      "patient-id": "patientId",
      "patient-age": "erAge",
      "patient-name": "name",
      "patient-father-name": "fathersName",
      "patient-surname": "surname",
      "patient-sex": "gender",
      "patient-other-identifier": "otherIdentifier",
    };

    const mappedField = fieldMapping[id];
    if (mappedField) {
      updateFormData({ [mappedField]: value });
    }

    if (onFormChange) {
      onFormChange();
    }
  };

  useEffect(() => {
    if (selectedPatient) {
      const newValues = {
        "patient-id": selectedPatient.id || "",
        "patient-name": selectedPatient.name || "",
        "patient-surname": selectedPatient.surname || "",
        "patient-ssn-sid": selectedPatient.ssn || selectedPatient.sid || "",
        "patient-sex":
          selectedPatient.gender?.toLowerCase() === "male"
            ? "male"
            : selectedPatient.gender?.toLowerCase() === "female"
            ? "female"
            : "",
        "patient-age": "", // Calculate from DOB if needed
        "patient-father-name": "",
        "patient-other-identifier": "",
      };

      // Update local state
      setFormValues((prev) => ({ ...prev, ...newValues }));

      // Update store with patient data
      const patientData = {
        patientId: selectedPatient.id || "",
        name: selectedPatient.name || "",
        surname: selectedPatient.surname || "",
        gender:
          selectedPatient.gender?.toLowerCase() === "male"
            ? "male"
            : selectedPatient.gender?.toLowerCase() === "female"
            ? "female"
            : "",
      };
      
      console.log("=== DEBUG: PatientInfoForm ===");
      console.log("Selected patient:", selectedPatient);
      console.log("Patient data to store:", patientData);
      
      updateFormData(patientData);

      // Notify parent component
      if (onFormChange) {
        onFormChange();
      }
    }
  }, [selectedPatient]); // Remove updateFormData and onFormChange from dependencies

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      {selectedPatient && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-300 rounded-lg">
          <span className="text-gray-700 text-sm font-medium">
            🔒 Patient loaded from search: {selectedPatient.name}{" "}
            {selectedPatient.surname}
          </span>
          <div className="text-gray-600 text-xs mt-1">
            Patient information is read-only and cannot be modified
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5">
        <LabelledInput
          label="ID"
          id="patient-id"
          placeholder="00000000000000"
          theme={theme}
          value={formValues["patient-id"]}
          onChange={(e) => handleInputChange("patient-id", e.target.value)}
          isReadOnly={isPatientDataFromExternal}
        />
        <LabelledInput
          label="SSN/SID"
          id="patient-ssn-sid"
          placeholder="Enter SSN or SID"
          theme={theme}
          value={formValues["patient-ssn-sid"]}
          onChange={(e) => handleInputChange("patient-ssn-sid", e.target.value)}
          isReadOnly={isPatientDataFromExternal}
        />
        <LabelledInput
          label="Age"
          id="patient-age"
          type="number"
          placeholder="Enter age"
          theme={theme}
          value={formValues["patient-age"]}
          onChange={(e) => handleInputChange("patient-age", e.target.value)}
          isReadOnly={isPatientDataFromExternal}
        />
        <LabelledInput
          label="Name"
          id="patient-name"
          placeholder="Enter name"
          theme={theme}
          value={formValues["patient-name"]}
          onChange={(e) => handleInputChange("patient-name", e.target.value)}
          isReadOnly={isPatientDataFromExternal}
        />
        <LabelledInput
          label="Father's Name"
          id="patient-father-name"
          placeholder="Enter father's name"
          theme={theme}
          value={formValues["patient-father-name"]}
          onChange={(e) =>
            handleInputChange("patient-father-name", e.target.value)
          }
          isReadOnly={isPatientDataFromExternal}
        />
        <LabelledInput
          label="Surname"
          id="patient-surname"
          placeholder="Enter surname"
          theme={theme}
          value={formValues["patient-surname"]}
          onChange={(e) => handleInputChange("patient-surname", e.target.value)}
          isReadOnly={isPatientDataFromExternal}
        />
        <LabelledSelect
          label="Sex"
          id="patient-sex"
          theme={theme}
          value={formValues["patient-sex"]}
          onChange={(e) => handleInputChange("patient-sex", e.target.value)}
          isReadOnly={isPatientDataFromExternal}
        >
          <option value="">Select Sex</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </LabelledSelect>
      </div>

      <div className="mt-3 sm:mt-4 md:mt-5">
        <LabelledTextarea
          label="Other Identifier"
          id="patient-other-identifier"
          rows={3}
          smRows={4}
          placeholder="Enter other identifying information"
          theme={theme}
          value={formValues["patient-other-identifier"]}
          onChange={(e) =>
            handleInputChange("patient-other-identifier", e.target.value)
          }
          isReadOnly={isPatientDataFromExternal}
        />
      </div>
    </div>
  );
};

export default PatientInfoForm;
