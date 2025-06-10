import React from 'react';
import { DiagnosisFormStepProps } from '../../types';
import FormSection from '../shared/FormSection';

const CheckboxItem: React.FC<{ label: string; id: string; theme: any; onFormChange?: () => void }> = ({ 
  label, id, theme, onFormChange 
}) => (
  <label htmlFor={id} className="flex items-center space-x-2 sm:space-x-2.5 cursor-pointer group whitespace-nowrap">
    <input
      type="checkbox"
      id={id}
      onChange={onFormChange}
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
  onFormChange?: () => void;
}

const InlineCheckboxGroup: React.FC<InlineCheckboxGroupProps> = ({ 
  groupLabel, options, idPrefix, theme, onFormChange 
}) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 md:space-x-4 space-y-1.5 sm:space-y-0 mb-1.5 sm:mb-2 md:mb-2.5">
    <span className={`text-xs sm:text-sm md:text-base lg:text-lg font-medium ${theme.textSecondary} w-full sm:w-20 md:w-24 lg:w-28 xl:w-32 shrink-0 mb-1 sm:mb-0 sm:pt-0.5`}>{groupLabel}</span>
    <div className="flex flex-wrap gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5">
      {options.map(opt => (
        <CheckboxItem 
          key={opt} 
          label={opt} 
          id={`${idPrefix}-${opt.toLowerCase().replace(/\s|-/g, '')}`} 
          theme={theme}
          onFormChange={onFormChange}
        />
      ))}
    </div>
  </div>
);

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
  columnsLG = 3,
  columnsXL = 4,
  columns2XL = 4
}) => (
  <div className={`grid grid-cols-1 sm:grid-cols-${columnsSM} md:grid-cols-${columnsMD} lg:grid-cols-${columnsLG} xl:grid-cols-${columnsXL} 2xl:grid-cols-${columns2XL} gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-1.5 sm:gap-y-2 md:gap-y-2.5`}>
    {options.map((option, index) => (
      <CheckboxItem
        key={index}
        label={option}
        id={`checkbox-${option.toLowerCase().replace(/\s+/g, '-')}`}
        theme={theme}
        onFormChange={onFormChange}
      />
    ))}
  </div>
);

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
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection title="Cardiorespiratory Signs" theme={theme} isSubSection={true}>
        <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
          <InlineCheckboxGroup groupLabel="Pain:" options={cardioPainOptions} idPrefix="cardiopain" theme={theme} onFormChange={onFormChange} />
          <InlineCheckboxGroup groupLabel="Character:" options={cardioCharacterOptions} idPrefix="cardiochar" theme={theme} onFormChange={onFormChange} />
          <InlineCheckboxGroup groupLabel="Onset:" options={cardioOnsetOptions} idPrefix="cardioonset" theme={theme} onFormChange={onFormChange} />
          <InlineCheckboxGroup groupLabel="Duration:" options={cardioDurationOptions} idPrefix="cardiodur" theme={theme} onFormChange={onFormChange} />
        </div>
        <div className="mt-3 sm:mt-4 md:mt-5">
          <WorkingCheckboxGrid options={otherCardioSigns} theme={theme} onFormChange={onFormChange} columnsSM={2} columnsMD={3} columnsLG={3} columnsXL={4} columns2XL={4} />
        </div>
      </FormSection>

      <FormSection title="Psychiatric Signs" theme={theme} isSubSection={true}>
        <WorkingCheckboxGrid options={psychiatricSignsOptions} theme={theme} onFormChange={onFormChange} columnsSM={2} columnsMD={3} columnsLG={3} columnsXL={4} columns2XL={4} />
      </FormSection>
    </div>
  );
};

export default CardiorespPsychSignsForm;