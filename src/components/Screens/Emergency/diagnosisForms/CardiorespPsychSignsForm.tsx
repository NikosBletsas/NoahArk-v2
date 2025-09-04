import React, { useState } from 'react';
import { DiagnosisFormStepProps } from '@/types';
import FormSection from '../../../shared/FormSection';
import CheckboxGrid from '../../../ui/CheckboxGrid';
import { useEmergencyCaseStore } from '@/stores/emergencyCaseStore';

const CheckboxItem: React.FC<{ 
  label: string; 
  id: string; 
  theme: any; 
  checked?: boolean;
  onFormChange?: (checked: boolean) => void 
}> = ({ label, id, theme, checked = false, onFormChange }) => (
  <label htmlFor={id} className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group whitespace-nowrap">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onFormChange && onFormChange(e.target.checked)}
      className={`form-checkbox h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded ${theme.inputBorder} text-blue-600 focus:ring-blue-500 transition duration-150 ease-in-out`}
    />
    <span className={`${theme.textPrimary} text-xs sm:text-sm md:text-base group-hover:${theme.textSecondary}`}>{label}</span>
  </label>
);

interface InlineCheckboxGroupProps {
  groupLabel: string;
  options: string[];
  idPrefix: string;
  theme: any;
  selectedOptions: string[];
  onFormChange?: (selectedOptions: string[]) => void;
}

const InlineCheckboxGroup: React.FC<InlineCheckboxGroupProps> = ({ 
  groupLabel, options, idPrefix, theme, selectedOptions, onFormChange 
}) => {
  const handleOptionChange = (option: string, checked: boolean) => {
    const newSelected = checked 
      ? [...selectedOptions, option]
      : selectedOptions.filter(item => item !== option);
    
    if (onFormChange) {
      onFormChange(newSelected);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 md:space-x-4 space-y-1.5 sm:space-y-0 mb-1.5 sm:mb-2 md:mb-2.5">
      <span className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${theme.textSecondary} w-full sm:w-20 md:w-24 lg:w-28 xl:w-32 shrink-0 mb-1 sm:mb-0 sm:pt-0.5`}>{groupLabel}</span>
      <div className="flex flex-wrap gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
        {options.map(opt => (
          <CheckboxItem 
            key={opt} 
            label={opt} 
            id={`${idPrefix}-${opt.toLowerCase().replace(/\s|-/g, '')}`} 
            theme={theme}
            checked={selectedOptions.includes(opt)}
            onFormChange={(checked) => handleOptionChange(opt, checked)}
          />
        ))}
      </div>
    </div>
  );
};

const cardioPainOptions = ["Retrosternal", "Epigastric", "Back", "Neck", "Mandible", "Maxillary"];
const cardioCharacterOptions = ["Pressure", "Strangulation", "Tightness", "Weight", "Burning"];
const cardioOnsetOptions = ["Stress", "After Eating", "At Rest"];
const cardioDurationOptions = ["20-30min", "<20min", "Hours"];
const otherCardioSigns = ["Palpitations", "Leg Swelling", "Dyspnea", "Syncope - Collapse", "Cyanosis", "Pletodyfnia", "Cough"];
const psychiatricSignsOptions = ["Anxious", "Depression", "Aggressive", "Stimulating", "Paraesthesia", "Confusion", "Agitation"]; 

const CardiorespPsychSignsForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange 
}) => {
  const { formData, updateFormData } = useEmergencyCaseStore();
  
  // State for cardio signs - initialize from store
  const [cardioPain, setCardioPain] = useState<string[]>(() => 
    formData.cardioThorakikoAlgos ? formData.cardioThorakikoAlgos.split(', ') : []
  );
  const [cardioCharacter, setCardioCharacter] = useState<string[]>(() => 
    formData.cardioXaraktiras ? formData.cardioXaraktiras.split(', ') : []
  );
  const [cardioOnset, setCardioOnset] = useState<string[]>(() => 
    formData.cardioEnarxi ? formData.cardioEnarxi.split(', ') : []
  );
  const [cardioDuration, setCardioDuration] = useState<string[]>(() => 
    formData.cardioDiarkeia ? formData.cardioDiarkeia.split(', ') : []
  );



  const handleCardioPainChange = (selectedOptions: string[]) => {
    setCardioPain(selectedOptions);
    updateFormData({ cardioThorakikoAlgos: selectedOptions.join(', ') });
    if (onFormChange) onFormChange();
  };

  const handleCardioCharacterChange = (selectedOptions: string[]) => {
    setCardioCharacter(selectedOptions);
    updateFormData({ cardioXaraktiras: selectedOptions.join(', ') });
    if (onFormChange) onFormChange();
  };

  const handleCardioOnsetChange = (selectedOptions: string[]) => {
    setCardioOnset(selectedOptions);
    updateFormData({ cardioEnarxi: selectedOptions.join(', ') });
    if (onFormChange) onFormChange();
  };

  const handleCardioDurationChange = (selectedOptions: string[]) => {
    setCardioDuration(selectedOptions);
    updateFormData({ cardioDiarkeia: selectedOptions.join(', ') });
    if (onFormChange) onFormChange();
  };

  const handleOtherCardioSignsChange = (selectedOptions: string[]) => {
    updateFormData({ cardioanapneustikiSimeiologia: selectedOptions.join(', ') });
    if (onFormChange) onFormChange();
  };

  const handlePsychiatricSignsChange = (selectedOptions: string[]) => {
    // Map to multiple fields based on content
    const anxiety = selectedOptions.filter(opt => opt.includes('Anxious')).join(', ');
    const behavior = selectedOptions.filter(opt => ['Aggressive', 'Stimulating', 'Agitation'].some(b => opt.includes(b))).join(', ');
    const thoughts = selectedOptions.filter(opt => ['Depression', 'Paraesthesia', 'Confusion'].some(t => opt.includes(t))).join(', ');
    
    updateFormData({ 
      psychoDiathesi: anxiety,
      psychoSymperifora: behavior,
      psychoSkepseis: thoughts
    });
    if (onFormChange) onFormChange();
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection title="Cardiorespiratory Signs" theme={theme} isSubSection={true}>
        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
          <InlineCheckboxGroup 
            groupLabel="Pain:" 
            options={cardioPainOptions} 
            idPrefix="cardiopain" 
            theme={theme} 
            selectedOptions={cardioPain}
            onFormChange={handleCardioPainChange} 
          />
          <InlineCheckboxGroup 
            groupLabel="Character:" 
            options={cardioCharacterOptions} 
            idPrefix="cardiochar" 
            theme={theme} 
            selectedOptions={cardioCharacter}
            onFormChange={handleCardioCharacterChange} 
          />
          <InlineCheckboxGroup 
            groupLabel="Onset:" 
            options={cardioOnsetOptions} 
            idPrefix="cardioonset" 
            theme={theme} 
            selectedOptions={cardioOnset}
            onFormChange={handleCardioOnsetChange} 
          />
          <InlineCheckboxGroup 
            groupLabel="Duration:" 
            options={cardioDurationOptions} 
            idPrefix="cardiodur" 
            theme={theme} 
            selectedOptions={cardioDuration}
            onFormChange={handleCardioDurationChange} 
          />
        </div>
        <div className="mt-3 sm:mt-4 md:mt-5">
          <CheckboxGrid 
            options={otherCardioSigns} 
            theme={theme} 
            onFormChange={handleOtherCardioSignsChange}
            initialSelected={formData.cardioanapneustikiSimeiologia ? formData.cardioanapneustikiSimeiologia.split(', ') : []}
            columnsSM={2} 
            columnsMD={3} 
            columnsLG={3} 
            columnsXL={4} 
            columns2XL={4} 
          />
        </div>
      </FormSection>

      <FormSection title="Psychiatric Signs" theme={theme} isSubSection={true}>
        <CheckboxGrid 
          options={psychiatricSignsOptions} 
          theme={theme} 
          onFormChange={handlePsychiatricSignsChange}
          initialSelected={[
            ...(formData.psychoDiathesi ? formData.psychoDiathesi.split(', ') : []),
            ...(formData.psychoSymperifora ? formData.psychoSymperifora.split(', ') : []),
            ...(formData.psychoSkepseis ? formData.psychoSkepseis.split(', ') : [])
          ]}
          columnsSM={2} 
          columnsMD={3} 
          columnsLG={3} 
          columnsXL={4} 
          columns2XL={4} 
        />
      </FormSection>
    </div>
  );
};

export default CardiorespPsychSignsForm;
