import { create } from 'zustand';
import { NEmergencyCase } from '@/api/generated_api';

interface EmergencyCaseState {
  formData: Partial<NEmergencyCase>;
  updateFormData: (stepData: Partial<NEmergencyCase>) => void;
  resetFormData: () => void;
  getFormData: () => NEmergencyCase;
}

const initialFormData: Partial<NEmergencyCase> = {
  patientId: '',
  gender: '',
  name: '',
  surname: '',
  otherIdentifier: '',
  fathersName: '',
  erAge: '',
  erProselefsi: '',
  erOros: '',
  erAllo: '',
  histSymptom: '',
  histSmoker: '',
  histAlergic: '',
  histLoimodi: '',
  trauma: '',
  vitalTime: '',
  vitalPulses: '',
  vitalAP: '',
  vitalInhale: '',
  vitalSpo2: '',
  vitalT: '',
  derma: '',
  erComments: '',
  genikiSimeiologia: '',
  genOther: '',
  xeirourgikiSimeiologia: '',
  neurologikiSimeiologia: '',
  neuroParesi: '',
  neuroHmipligia: '',
  neuroSergApoleiaSineidisis: '',
  neuroSergAnoiktoiOfthalmoi: '',
  neuroSergKalyteriProforikiApantisi: '',
  neuroSergKalyteriKinitikiApantisi: '',
  neuroSergKoresMegethosDeksi: '',
  neuroSergKoresMegethosAristero: '',
  neuroSergKoresAntidrasiDeksi: '',
  neuroSergKoresAntidrasiAristero: '',
  neuroSergSynoloVathmwn: '',
  cardioThorakikoAlgos: '',
  cardioXaraktiras: '',
  cardioEnarxi: '',
  cardioDiarkeia: '',
  cardioanapneustikiSimeiologia: '',
  psychoDiathesi: '',
  psychoSymperifora: '',
  psychoSkepseis: '',
};

export const useEmergencyCaseStore = create<EmergencyCaseState>((set, get) => ({
  formData: { ...initialFormData },
  
  updateFormData: (stepData: Partial<NEmergencyCase>) => {
    set((state) => ({
      formData: { ...state.formData, ...stepData }
    }));
  },
  
  resetFormData: () => {
    set({ formData: { ...initialFormData } });
  },
  
  getFormData: (): NEmergencyCase => {
    const data = get().formData;
    // Convert all undefined values to empty strings for API compatibility
    const cleanedData: NEmergencyCase = {};
    Object.keys(initialFormData).forEach(key => {
      cleanedData[key as keyof NEmergencyCase] = data[key as keyof NEmergencyCase] || '';
    });
    return cleanedData;
  },
}));