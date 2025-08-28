import React from 'react';
import { DiagnosisFormStepProps } from '@/types';
import { LabelledInput, LabelledSelect, LabelledTextarea } from '../../../shared/FormControls';

const PatientInfoForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange 
}) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5">
        <LabelledInput 
          label="ID" 
          id="patient-id" 
          placeholder="00000000000000" 
          theme={theme} 
          onChange={onFormChange}
        />
        <LabelledInput 
          label="SSN/SID" 
          id="patient-ssn-sid" 
          placeholder="Enter SSN or SID" 
          theme={theme} 
          onChange={onFormChange}
        />
        <LabelledInput 
          label="Age" 
          id="patient-age" 
          type="number" 
          placeholder="Enter age" 
          theme={theme} 
          onChange={onFormChange}
        />
        <LabelledInput 
          label="Name" 
          id="patient-name" 
          placeholder="Enter name" 
          theme={theme} 
          onChange={onFormChange}
        />
        <LabelledInput 
          label="Father's Name" 
          id="patient-father-name" 
          placeholder="Enter father's name" 
          theme={theme} 
          onChange={onFormChange}
        />
        <LabelledInput 
          label="Surname" 
          id="patient-surname" 
          placeholder="Enter surname" 
          theme={theme} 
          onChange={onFormChange}
        />
        <LabelledSelect 
          label="Sex" 
          id="patient-sex" 
          theme={theme} 
          onChange={onFormChange}
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
            onChange={onFormChange}
          />
      </div>
    </div>
  );
};

export default PatientInfoForm;