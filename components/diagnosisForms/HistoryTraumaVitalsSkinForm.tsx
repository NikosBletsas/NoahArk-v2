import React from 'react';
import { DiagnosisFormStepProps } from '../../types';
import FormSection from '../shared/FormSection';
import { LabelledInput, LabelledSelect, LabelledTextarea } from '../shared/FormControls';
import CheckboxGrid from '../shared/CheckboxGrid';

const traumaOptions = ["Accident", "Beating", "Car Accident", "Industrial Accident", "Fall", "Suicide Attempt"];
const skinOptions = ["Cold", "Hot", "Dry", "Wet", "Sallow", "Cyan", "Jaundiced"];

const HistoryTraumaVitalsSkinForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange 
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection title="Emergency Case Information" theme={theme} isSubSection={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5">
            <LabelledSelect label="Patient Case" id="patient-case" theme={theme} onChange={onFormChange}>
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
        <CheckboxGrid options={traumaOptions} theme={theme} onFormChange={onFormChange} />
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
        <CheckboxGrid options={skinOptions} theme={theme} onFormChange={onFormChange} />
      </FormSection>
    </div>
  );
};

export default HistoryTraumaVitalsSkinForm;
