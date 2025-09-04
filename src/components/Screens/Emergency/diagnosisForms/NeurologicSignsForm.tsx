import React, { useState } from "react";
import { Eye } from "lucide-react";
import { DiagnosisFormStepProps } from "@/types";
import FormSection from "../../../shared/FormSection";
import { LabelledInput } from "../../../shared/FormControls";
import { useEmergencyCaseStore } from "@/stores/emergencyCaseStore";

const CheckboxItem: React.FC<{
  label: string;
  id: string;
  theme: any;
  checked?: boolean;
  onFormChange?: (checked: boolean) => void;
}> = ({ label, id, theme, checked = false, onFormChange }) => (
  <label
    htmlFor={id}
    className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group"
  >
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onFormChange && onFormChange(e.target.checked)}
      className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out`}
    />
    <span
      className={`${theme.textPrimary} text-xs sm:text-sm md:text-base group-hover:${theme.textSecondary}`}
    >
      {label}
    </span>
  </label>
);

const openEyesOptions = ["None", "To Pain", "To Speech", "Spontaneous"];
const verbalResponseOptions = [
  "None",
  "Incomprehensible Sounds",
  "Inappropriate Words",
  "Confused Conversation",
  "Spontaneous",
];
const bestMotorResponseOptions = [
  "None",
  "Extension (Decerebrate)",
  "Abnormal Flexion (Decorticate)",
  "Flexion Withdrawl to Pain",
  "Localizes Pain",
  "Obeys Commands",
];
const pupilSizes = ["2mm", "3mm", "4mm", "5mm", "6mm", "7mm", "8mm", "9mm"];

const NeurologicSignsForm: React.FC<DiagnosisFormStepProps> = ({
  theme,
  isMidnightTheme,
  onFormChange,
}) => {
  const { formData, updateFormData } = useEmergencyCaseStore();

  // State for neurologic assessments - initialize from store
  const [openEyes, setOpenEyes] = useState<string>(
    () => formData.neuroSergAnoiktoiOfthalmoi || ""
  );
  const [verbalResponse, setVerbalResponse] = useState<string>(
    () => formData.neuroSergKalyteriProforikiApantisi || ""
  );
  const [motorResponse, setMotorResponse] = useState<string>(
    () => formData.neuroSergKalyteriKinitikiApantisi || ""
  );
  const [pupilSizeLeft, setPupilSizeLeft] = useState<boolean>(
    () => formData.neuroSergKoresMegethosDeksi === "true"
  );
  const [pupilSizeRight, setPupilSizeRight] = useState<boolean>(
    () => formData.neuroSergKoresMegethosAristero === "true"
  );
  const [pupilLightLeft, setPupilLightLeft] = useState<boolean>(
    () => formData.neuroSergKoresAntidrasiDeksi === "true"
  );
  const [pupilLightRight, setPupilLightRight] = useState<boolean>(
    () => formData.neuroSergKoresAntidrasiAristero === "true"
  );

  const handleOpenEyesChange = (option: string, checked: boolean) => {
    const newValue = checked ? option : "";
    setOpenEyes(newValue);
    updateFormData({ neuroSergAnoiktoiOfthalmoi: newValue });
    if (onFormChange) onFormChange();
  };

  const handleVerbalResponseChange = (option: string, checked: boolean) => {
    const newValue = checked ? option : "";
    setVerbalResponse(newValue);
    updateFormData({ neuroSergKalyteriProforikiApantisi: newValue });
    if (onFormChange) onFormChange();
  };

  const handleMotorResponseChange = (option: string, checked: boolean) => {
    const newValue = checked ? option : "";
    setMotorResponse(newValue);
    updateFormData({ neuroSergKalyteriKinitikiApantisi: newValue });
    if (onFormChange) onFormChange();
  };

  const handlePupilSizeLeftChange = (checked: boolean) => {
    setPupilSizeLeft(checked);
    updateFormData({ neuroSergKoresMegethosDeksi: checked.toString() });
    if (onFormChange) onFormChange();
  };

  const handlePupilSizeRightChange = (checked: boolean) => {
    setPupilSizeRight(checked);
    updateFormData({ neuroSergKoresMegethosAristero: checked.toString() });
    if (onFormChange) onFormChange();
  };

  const handlePupilLightLeftChange = (checked: boolean) => {
    setPupilLightLeft(checked);
    updateFormData({ neuroSergKoresAntidrasiDeksi: checked.toString() });
    if (onFormChange) onFormChange();
  };

  const handlePupilLightRightChange = (checked: boolean) => {
    setPupilLightRight(checked);
    updateFormData({ neuroSergKoresAntidrasiAristero: checked.toString() });
    if (onFormChange) onFormChange();
  };

  const handleGcsScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({ neuroSergSynoloVathmwn: e.target.value });
    if (onFormChange) onFormChange();
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection
        title="Neurologic Signs (Continued) - GCS"
        theme={theme}
        isSubSection={true}
      >
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <div>
            <h4
              className={`text-xs sm:text-sm md:text-base font-medium ${theme.textSecondary} mb-1.5 sm:mb-2 md:mb-2.5`}
            >
              Open Eyes:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
              {openEyesOptions.map((opt) => (
                <CheckboxItem
                  key={opt}
                  label={opt}
                  id={`openeyes-${opt.toLowerCase().replace(/\s/g, "")}`}
                  theme={theme}
                  checked={openEyes === opt}
                  onFormChange={(checked) => handleOpenEyesChange(opt, checked)}
                />
              ))}
            </div>
          </div>

          <div>
            <h4
              className={`text-xs sm:text-sm md:text-base font-medium ${theme.textSecondary} mb-1.5 sm:mb-2 md:mb-2.5`}
            >
              Verbal Response:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
              {verbalResponseOptions.map((opt) => (
                <CheckboxItem
                  key={opt}
                  label={opt}
                  id={`verbal-${opt.toLowerCase().replace(/\s/g, "")}`}
                  theme={theme}
                  checked={verbalResponse === opt}
                  onFormChange={(checked) =>
                    handleVerbalResponseChange(opt, checked)
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <h4
              className={`text-xs sm:text-sm md:text-base font-medium ${theme.textSecondary} mb-1.5 sm:mb-2 md:mb-2.5`}
            >
              Best Motor Response:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
              {bestMotorResponseOptions.map((opt) => (
                <CheckboxItem
                  key={opt}
                  label={opt}
                  id={`motor-${opt.toLowerCase().replace(/\s/g, "")}`}
                  theme={theme}
                  checked={motorResponse === opt}
                  onFormChange={(checked) =>
                    handleMotorResponseChange(opt, checked)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </FormSection>

      <FormSection title="Pupil Assessment" theme={theme} isSubSection={true}>
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
            <span
              className={`text-xs sm:text-sm md:text-base font-medium ${theme.textSecondary}`}
            >
              Pupil Size:
            </span>
            <CheckboxItem
              label="Left"
              id="pupil-size-left"
              theme={theme}
              checked={pupilSizeLeft}
              onFormChange={handlePupilSizeLeftChange}
            />
            <CheckboxItem
              label="Right"
              id="pupil-size-right"
              theme={theme}
              checked={pupilSizeRight}
              onFormChange={handlePupilSizeRightChange}
            />
          </div>
          <div className="flex flex-wrap justify-start items-end gap-x-2 sm:gap-x-3 md:gap-x-4 gap-y-1.5 sm:gap-y-2 my-1.5 sm:my-2 md:my-2.5">
            {pupilSizes.map((size) => (
              <div
                key={size}
                className="flex flex-col items-center text-center"
              >
                <Eye
                  className={`w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 ${theme.icon}`}
                  strokeWidth={1.5}
                />
                <span
                  className={`text-[10px] sm:text-xs md:text-sm ${theme.textSecondary} mt-0.5 sm:mt-1`}
                >
                  {size}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
            <span
              className={`text-xs sm:text-sm md:text-base font-medium ${theme.textSecondary}`}
            >
              Pupillary Light Response:
            </span>
            <CheckboxItem
              label="Left"
              id="pupil-light-left"
              theme={theme}
              checked={pupilLightLeft}
              onFormChange={handlePupilLightLeftChange}
            />
            <CheckboxItem
              label="Right"
              id="pupil-light-right"
              theme={theme}
              checked={pupilLightRight}
              onFormChange={handlePupilLightRightChange}
            />
          </div>
        </div>
      </FormSection>

      <div className="mt-4 sm:mt-6 md:mt-7">
        <LabelledInput
          label="Total (GCS Score):"
          id="neuro-total-gcs"
          placeholder="Enter GCS score"
          type="number"
          theme={theme}
          value={formData.neuroSergSynoloVathmwn || ""}
          onChange={handleGcsScoreChange}
        />
      </div>
    </div>
  );
};

export default NeurologicSignsForm;
