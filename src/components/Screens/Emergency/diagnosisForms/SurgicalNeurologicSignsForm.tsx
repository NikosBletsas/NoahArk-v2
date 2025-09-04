import React from 'react';
import { DiagnosisFormStepProps } from '@/types';
import FormSection from '../../../shared/FormSection';
import CheckboxGrid from '../../../ui/CheckboxGrid';
import { useEmergencyCaseStore } from '@/stores/emergencyCaseStore';

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

/**
 * Form step for collecting surgical and initial neurologic signs.
 * Part of the Emergency Case Diagnosis workflow.
 */
const SurgicalNeurologicSignsForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange
}) => {
  const { formData, updateFormData } = useEmergencyCaseStore();

  const handleTraumaSignsChange = (selectedOptions: string[]) => {
    updateFormData({ xeirourgikiSimeiologia: selectedOptions.join(', ') });
    if (onFormChange) {
      onFormChange();
    }
  };

  const handleNeurologicSignsChange = (selectedOptions: string[]) => {
    updateFormData({ neurologikiSimeiologia: selectedOptions.join(', ') });
    if (onFormChange) {
      onFormChange();
    }
  };

  const handleParesisHemiplegiaChange = (selectedOptions: string[]) => {
    const paresisOptions = selectedOptions.filter(opt => opt.includes('Paresis'));
    const hemiplegiaOptions = selectedOptions.filter(opt => opt.includes('Hemiplegia'));
    
    updateFormData({ 
      neuroParesi: paresisOptions.join(', '),
      neuroHmipligia: hemiplegiaOptions.join(', ')
    });
    
    if (onFormChange) {
      onFormChange();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection title="Trauma Signs" theme={theme} isSubSection={true}>
        <CheckboxGrid 
          options={traumaSignsOptions} 
          theme={theme} 
          onFormChange={handleTraumaSignsChange}
          initialSelected={formData.xeirourgikiSimeiologia ? formData.xeirourgikiSimeiologia.split(', ') : []}
          columnsSM={2} 
          columnsMD={3} 
          columnsLG={3} 
          columnsXL={4} 
          columns2XL={4}
        />
      </FormSection>

      <FormSection title="Neurologic Signs" theme={theme} isSubSection={true}>
        <CheckboxGrid 
          options={neurologicSignsOptions} 
          theme={theme} 
          onFormChange={handleNeurologicSignsChange}
          initialSelected={formData.neurologikiSimeiologia ? formData.neurologikiSimeiologia.split(', ') : []}
          columnsSM={2} 
          columnsMD={2} 
          columnsLG={2} 
          columnsXL={3} 
          columns2XL={4}
        />
        <div className="mt-3 sm:mt-4 md:mt-5">
             <h4 className={`text-xs sm:text-sm md:text-base font-medium ${theme.textSecondary} mb-1.5 sm:mb-2 md:mb-2.5`}>Paresis / Hemiplegia</h4>
             <CheckboxGrid 
               options={paresisHemiplegiaOptions} 
               theme={theme} 
               onFormChange={handleParesisHemiplegiaChange}
               initialSelected={[
                 ...(formData.neuroParesi ? formData.neuroParesi.split(', ') : []),
                 ...(formData.neuroHmipligia ? formData.neuroHmipligia.split(', ') : [])
               ]}
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
