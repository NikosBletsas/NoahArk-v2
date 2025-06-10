import React from 'react';
import { DiagnosisFormStepProps } from '../../types';
import FormSection from '../shared/FormSection';

const traumaSignsOptions = [
  "Pain", "Edema", "Injury", "Bite", "Fracture",
  "Sores Ulcer", "Open Fracture", "Abscess", "Crush", "Furuncle",
  "Amputation", "Hematoma", "Airy", "Rash", "Penetrating",
  "Burn", "Segmentation", "Blunt", "Abrasion", "Deformation",
  "Mobility", "Pulse"
];

const neurologicSignsOptions = [
  "Headache", "Quadriplegia", "Dysarthria", "Paraplegia",
  "Numbness", "Convulsions", "Visual Disturbance", "Speech Disorder"
];

const paresisHemiplegiaOptions = [
    "Paresis Left", "Paresis Right", "Hemiplegia Left", "Hemiplegia Right"
];

// Checkbox component που καλεί onFormChange
const CheckboxItem: React.FC<{ 
  label: string; 
  id: string; 
  theme: any; 
  onFormChange?: () => void 
}> = ({ label, id, theme, onFormChange }) => (
  <label htmlFor={id} className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group">
    <input
      type="checkbox"
      id={id}
      onChange={onFormChange} // 🔥 ΑΥΤΟ ΚΑΛΕΙ ΤΟ onFormChange!
      className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out`}
    />
    <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base group-hover:${theme.textSecondary}`}>{label}</span>
  </label>
);

// CheckboxGrid που καλεί onFormChange
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
  columnsLG = 3,
  columnsXL = 4,
  columns2XL = 4
}) => {
  const gridColsClass = `grid-cols-1 sm:grid-cols-${columnsSM} md:grid-cols-${columnsMD} lg:grid-cols-${columnsLG} xl:grid-cols-${columnsXL} 2xl:grid-cols-${columns2XL}`;

  return (
    <div className={`grid ${gridColsClass} gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5`}>
      {options.map((option, index) => (
        <CheckboxItem
          key={index}
          label={option}
          id={`checkbox-${option.toLowerCase().replace(/\s+/g, '-')}`}
          theme={theme}
          onFormChange={onFormChange} // 🔥 ΠΕΡΝΑΕΙ ΤΟ onFormChange!
        />
      ))}
    </div>
  );
};

/**
 * Form step for collecting surgical and initial neurologic signs.
 * Part of the Emergency Case Diagnosis workflow.
 */
const SurgicalNeurologicSignsForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange // 🔥 ΠΑΙΡΝΕΙ ΤΟ onFormChange ΑΠΟ ΤΟ PARENT
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection title="Trauma Signs" theme={theme} isSubSection={true}>
        <WorkingCheckboxGrid 
          options={traumaSignsOptions} 
          theme={theme} 
          onFormChange={onFormChange}
          columnsSM={2} 
          columnsMD={3} 
          columnsLG={3} 
          columnsXL={4} 
          columns2XL={4}
        />
      </FormSection>

      <FormSection title="Neurologic Signs" theme={theme} isSubSection={true}>
        <WorkingCheckboxGrid 
          options={neurologicSignsOptions} 
          theme={theme} 
          onFormChange={onFormChange}
          columnsSM={2} 
          columnsMD={2} 
          columnsLG={2} 
          columnsXL={3} 
          columns2XL={4}
        />
        <div className="mt-3 sm:mt-4 md:mt-5">
             <h4 className={`text-xs sm:text-sm md:text-base font-medium ${theme.textSecondary} mb-1.5 sm:mb-2 md:mb-2.5`}>Paresis / Hemiplegia</h4>
             <WorkingCheckboxGrid 
               options={paresisHemiplegiaOptions} 
               theme={theme} 
               onFormChange={onFormChange}
               columnsSM={2} 
               columnsMD={2} 
               columnsLG={2} 
               columnsXL={2} 
               columns2XL={4}
             />
        </div>
      </FormSection>
    </div>
  );
};

export default SurgicalNeurologicSignsForm;