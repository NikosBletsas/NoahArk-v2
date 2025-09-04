import React from 'react';
import { DiagnosisFormStepProps } from '@/types';
import FormSection from '@/components/shared/FormSection';
import { LabelledInput, LabelledSelect, LabelledTextarea } from '@/components/shared/FormControls';
import CheckboxGrid from '@/components/ui/CheckboxGrid';
import { useEmergencyCaseStore } from '@/stores/emergencyCaseStore';

const traumaOptions = ["Accident", "Beating", "Car Accident", "Industrial Accident", "Fall", "Suicide Attempt"];
const skinOptions = ["Cold", "Hot", "Dry", "Wet", "Sallow", "Cyan", "Jaundiced"];

const HistoryTraumaVitalsSkinForm: React.FC<DiagnosisFormStepProps> = ({ 
  theme, 
  isMidnightTheme, 
  onFormChange 
}) => {
  const { formData, updateFormData } = useEmergencyCaseStore();
  
  const handleInputChange = (id: string, value: string) => {
    // Map form field IDs to NEmergencyCase properties
    const fieldMapping: Record<string, keyof typeof formData> = {
      'patient-case': 'erProselefsi',
      'serum': 'erOros', 
      'case-other-info': 'erAllo',
      'symptoms': 'histSymptom',
      'allergies': 'histAlergic',
      'infectious-diseases': 'histLoimodi',
      'smoker': 'histSmoker',
      'history-comments': 'erComments',
      'vital-time': 'vitalTime',
      'vital-pulses': 'vitalPulses',
      'vital-bp': 'vitalAP',
      'vital-breaths': 'vitalInhale',
      'vital-spo2': 'vitalSpo2',
      'vital-temp': 'vitalT'
    };

    const mappedField = fieldMapping[id];
    if (mappedField) {
      updateFormData({ [mappedField]: value });
    }

    if (onFormChange) {
      onFormChange();
    }
  };

  const handleTraumaChange = (selectedOptions: string[]) => {
    updateFormData({ trauma: selectedOptions.join(', ') });
    if (onFormChange) {
      onFormChange();
    }
  };

  const handleSkinChange = (selectedOptions: string[]) => {
    updateFormData({ derma: selectedOptions.join(', ') });
    if (onFormChange) {
      onFormChange();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-7">
      <FormSection title="Emergency Case Information" theme={theme} isSubSection={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5">
            <LabelledSelect 
              label="Patient Case" 
              id="patient-case" 
              theme={theme} 
              value={formData.erProselefsi || ''}
              onChange={(e) => handleInputChange('patient-case', e.target.value)}
            >
                <option value="">Select how patient arrived</option>
                <option value="ambulance">Ambulance</option>
                <option value="private_vehicle">Private Vehicle</option>
                <option value="walk_in">Walk-in</option>
                <option value="other">Other</option>
            </LabelledSelect>
            <LabelledInput 
              label="Serum" 
              id="serum" 
              placeholder="Enter serum details" 
              theme={theme} 
              value={formData.erOros || ''}
              onChange={(e) => handleInputChange('serum', e.target.value)} 
            />
        </div>
        <div className="mt-3 sm:mt-4 md:mt-5">
             <LabelledTextarea 
               label="Other" 
               id="case-other-info" 
               placeholder="Other relevant case information" 
               theme={theme} 
               rows={2} 
               value={formData.erAllo || ''}
               onChange={(e) => handleInputChange('case-other-info', e.target.value)} 
             />
        </div>
      </FormSection>

      <FormSection title="Patient History" theme={theme} isSubSection={true}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5">
          <LabelledInput 
            label="Symptoms" 
            id="symptoms" 
            placeholder="Describe symptoms" 
            theme={theme} 
            value={formData.histSymptom || ''}
            onChange={(e) => handleInputChange('symptoms', e.target.value)} 
          />
          <LabelledInput 
            label="Allergies" 
            id="allergies" 
            placeholder="List allergies" 
            theme={theme} 
            value={formData.histAlergic || ''}
            onChange={(e) => handleInputChange('allergies', e.target.value)} 
          />
          <LabelledInput 
            label="Infectious Diseases" 
            id="infectious-diseases" 
            placeholder="List infectious diseases" 
            theme={theme} 
            value={formData.histLoimodi || ''}
            onChange={(e) => handleInputChange('infectious-diseases', e.target.value)} 
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-7 gap-y-3 sm:gap-y-4 md:gap-y-5 mt-3 sm:mt-4 md:mt-5">
          <LabelledSelect 
            label="Smoker" 
            id="smoker" 
            theme={theme} 
            value={formData.histSmoker || ''}
            onChange={(e) => handleInputChange('smoker', e.target.value)}
          >
            <option value="">Select smoking status</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="former">Former Smoker</option>
          </LabelledSelect>
          <LabelledInput 
            label="Comments" 
            id="history-comments" 
            placeholder="Additional comments" 
            theme={theme} 
            value={formData.erComments || ''}
            onChange={(e) => handleInputChange('history-comments', e.target.value)} 
          />
        </div>
      </FormSection>

      <FormSection title="Trauma" theme={theme} isSubSection={true}>
        <CheckboxGrid 
          options={traumaOptions} 
          theme={theme} 
          onFormChange={handleTraumaChange}
          initialSelected={formData.trauma ? formData.trauma.split(', ') : []}
        />
      </FormSection>

      <FormSection title="Vital Signs" theme={theme} isSubSection={true}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-x-3 sm:gap-x-4 md:gap-x-5 gap-y-3 sm:gap-y-4 md:gap-y-5">
          <LabelledInput 
            label="Time" 
            id="vital-time" 
            type="time" 
            theme={theme} 
            value={formData.vitalTime || ''}
            onChange={(e) => handleInputChange('vital-time', e.target.value)} 
          />
          <LabelledInput 
            label="Pulses" 
            id="vital-pulses" 
            placeholder="e.g., 70 bpm" 
            theme={theme} 
            value={formData.vitalPulses || ''}
            onChange={(e) => handleInputChange('vital-pulses', e.target.value)} 
          />
          <LabelledInput 
            label="B/P" 
            id="vital-bp" 
            placeholder="e.g., 120/80" 
            theme={theme} 
            value={formData.vitalAP || ''}
            onChange={(e) => handleInputChange('vital-bp', e.target.value)} 
          />
          <LabelledInput 
            label="Breaths" 
            id="vital-breaths" 
            placeholder="e.g., 16/min" 
            theme={theme} 
            value={formData.vitalInhale || ''}
            onChange={(e) => handleInputChange('vital-breaths', e.target.value)} 
          />
          <LabelledInput 
            label="SPO2" 
            id="vital-spo2" 
            placeholder="e.g., 98%" 
            theme={theme} 
            value={formData.vitalSpo2 || ''}
            onChange={(e) => handleInputChange('vital-spo2', e.target.value)} 
          />
          <LabelledInput 
            label="T(°)" 
            id="vital-temp" 
            placeholder="e.g., 36.5" 
            theme={theme} 
            value={formData.vitalT || ''}
            onChange={(e) => handleInputChange('vital-temp', e.target.value)} 
          />
        </div>
      </FormSection>

      <FormSection title="Skin" theme={theme} isSubSection={true}>
        <CheckboxGrid 
          options={skinOptions} 
          theme={theme} 
          onFormChange={handleSkinChange}
          initialSelected={formData.derma ? formData.derma.split(', ') : []}
        />
      </FormSection>
    </div>
  );
};

export default HistoryTraumaVitalsSkinForm;