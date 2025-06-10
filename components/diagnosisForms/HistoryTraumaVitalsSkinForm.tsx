import React from 'react';
import { DiagnosisFormStepProps } from '../../types';
import FormSection from '../shared/FormSection';
import { LabelledInput, LabelledSelect, LabelledTextarea } from '../shared/FormControls';

const traumaOptions = ["Accident", "Beating", "Car Accident", "Industrial Accident", "Fall", "Suicide Attempt"];
const skinOptions = ["Cold", "Hot", "Dry", "Wet", "Sallow", "Cyan", "Jaundiced"];

// Working CheckboxGrid component
const WorkingCheckboxGrid: React.FC<{
  options: string[];
  theme: any;
  onFormChange?: () => void;
  columnsSM?: number;
  columnsMD?: number;
  columnsLG?: number;
}> = ({ options, theme, onFormChange, columnsSM = 2, columnsMD = 3, columnsLG = 3 }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-${columnsSM} md:grid-cols-${columnsMD} lg:grid-cols-${columnsLG} gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5`}>
    {options.map((option, index) => (
      <label key={index} htmlFor={`checkbox-${option.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group">
        <input
          type="checkbox"
          id={`checkbox-${option.toLowerCase().replace(/\s+/g, '-')}`}
          onChange={onFormChange}
          className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out`}
        />
        <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base group-hover:${theme.textSecondary}`}>{option}</span>
      </label>
    ))}
  </div>
);

const HistoryTraumaVitalsSkinForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange 
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection title="Emergency Case Information" theme={theme} isSubSection={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5">
            <LabelledSelect label="Patient Came" id="patient-came" theme={theme} onChange={onFormChange}>
                <option value="">Select how patient arrived</option>
                <option value="ambulance">Ambulance</option>
                <option value="private_vehicle">Private Vehicle</option>
                <option value="walk_in">Walk-in</option>
                <option value="other">Other</option>
            </LabelledSelect>
            <LabelledInput label="Serum" id="serum" placeholder="Enter serum details" theme={theme} onChange={onFormChange} />
        </div>
        <div className="mt-3 sm:mt-4 md:mt-5">
             <LabelledTextarea label="Other" id="case-other-info" placeholder="Other relevant case information" theme={theme} rows={2} onChange={onFormChange} />
        </div>
      </FormSection>

      <FormSection title="Patient History" theme={theme} isSubSection={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5">
          <LabelledInput label="Symptoms" id="symptoms" placeholder="Describe symptoms" theme={theme} onChange={onFormChange} />
          <LabelledInput label="Allergies" id="allergies" placeholder="List allergies" theme={theme} onChange={onFormChange} />
          <LabelledInput label="Infectious Diseases" id="infectious-diseases" placeholder="List infectious diseases" theme={theme} onChange={onFormChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5 mt-3 sm:mt-4 md:mt-5">
          <LabelledSelect label="Smoker" id="smoker" theme={theme} onChange={onFormChange}>
            <option value="">Select smoking status</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="former">Former Smoker</option>
          </LabelledSelect>
          <LabelledInput label="Comments" id="history-comments" placeholder="Additional comments" theme={theme} onChange={onFormChange} />
        </div>
      </FormSection>

      <FormSection title="Trauma" theme={theme} isSubSection={true}>
        <WorkingCheckboxGrid options={traumaOptions} theme={theme} onFormChange={onFormChange} />
      </FormSection>

      <FormSection title="Vital Signs" theme={theme} isSubSection={true}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-3 sm:gap-y-4 md:gap-y-5">
          <LabelledInput label="Time" id="vital-time" type="time" theme={theme} onChange={onFormChange} />
          <LabelledInput label="Pulses" id="vital-pulses" placeholder="e.g., 70 bpm" theme={theme} onChange={onFormChange} />
          <LabelledInput label="B/P" id="vital-bp" placeholder="e.g., 120/80" theme={theme} onChange={onFormChange} />
          <LabelledInput label="Breaths" id="vital-breaths" placeholder="e.g., 16/min" theme={theme} onChange={onFormChange} />
          <LabelledInput label="SPO2" id="vital-spo2" placeholder="e.g., 98%" theme={theme} onChange={onFormChange} />
          <LabelledInput label="T(°)" id="vital-temp" placeholder="e.g., 36.5" theme={theme} onChange={onFormChange} />
        </div>
      </FormSection>

      <FormSection title="Skin" theme={theme} isSubSection={true}>
        <WorkingCheckboxGrid options={skinOptions} theme={theme} onFormChange={onFormChange} />
      </FormSection>
    </div>
  );
};

export default HistoryTraumaVitalsSkinForm;