import React from 'react';
import { DiagnosisFormStepProps } from '../../types';
import CheckboxGrid from '../shared/CheckboxGrid';

const generalSignsOptions = [
  "Fever", "Shiver", "Cough", "Weakening", "Malaise", "Nausea", "Dizziness", "Dry Mouth",
  "Vomit", "Eructation", "Indigestion", "Dyspepsia", "Feeling of Fullness", "Hematemesis", "Melaena", "Abdominal Pain",
  "Diarrhea", "Constipation", "Levitation", "Ascites", "Rash", "Itch", "Edema", "Alcohol Intoxication",
  "Poisoning", "Hypertension", "Hyperglycemia", "Abnormal ECG"
];

const GeneralSignsForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange 
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <CheckboxGrid 
        options={generalSignsOptions} 
        theme={theme} 
        onFormChange={onFormChange}
        columnsSM={2} 
        columnsMD={3} 
        columnsLG={4} 
        columnsXL={5} 
        columns2XL={6} 
      />
    </div>
  );
};

export default GeneralSignsForm;
