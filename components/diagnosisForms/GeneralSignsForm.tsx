import React from 'react';
import { DiagnosisFormStepProps } from '../../types';

const generalSignsOptions = [
  "Fever", "Shiver", "Cough", "Weakening", "Malaise", "Nausea", "Dizziness", "Dry Mouth",
  "Vomit", "Eructation", "Indigestion", "Dyspepsia", "Feeling of Fullness", "Hematemesis", "Melaena", "Abdominal Pain",
  "Diarrhea", "Constipation", "Levitation", "Ascites", "Rash", "Itch", "Edema", "Alcohol Intoxication",
  "Poisoning", "Hypertension", "Hyperglycemia", "Abnormal ECG"
];

// Working CheckboxGrid component
const WorkingCheckboxGrid: React.FC<{
  options: string[];
  theme: any;
  onFormChange?: () => void;
  columnsSM?: number;
  columnsMD?: number;
  columnsLG?: number;
  columnsXL?: number;
  columns2XL?: number;
}> = ({ 
  options, 
  theme, 
  onFormChange,
  columnsSM = 2,
  columnsMD = 3,
  columnsLG = 4,
  columnsXL = 5,
  columns2XL = 6
}) => (
  <div className={`grid grid-cols-1 sm:grid-cols-${columnsSM} md:grid-cols-${columnsMD} lg:grid-cols-${columnsLG} xl:grid-cols-${columnsXL} 2xl:grid-cols-${columns2XL} gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5`}>
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

const GeneralSignsForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange 
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <WorkingCheckboxGrid 
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