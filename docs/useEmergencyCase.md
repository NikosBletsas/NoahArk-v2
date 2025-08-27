---
id: useEmergencyCase
title: useEmergencyCase Hook Documentation
---

# useEmergencyCase Hook Documentation

## Overview

The `useEmergencyCase` hook manages emergency case submissions and doctor availability queries for the Noah Ark medical system. It provides comprehensive functionality for handling critical patient cases with proper error handling and state management.

## Location
`src/hooks/useEmergencyCase.ts`

## Purpose
- Submit new emergency cases to the server
- Query doctor availability for emergency consultations
- Track case submission status and results
- Handle emergency-specific error scenarios

## API Integration
- **Submit Case**: `POST /api/Main/NewEmergencyCase`
- **Doctor Availability**: `GET /api/Main/GetEfimeries`
- **Data Format**: `NEmergencyCase` interface from generated API

## Interface

### Return Object
```typescript
{
  submitCase: (emergencyCase: NEmergencyCase) => void;
  isSubmitting: boolean;
  getDoctorAvailability: () => void;
  isLoadingAvailability: boolean;
  doctorAvailability: any;
  error: string | null;
  submittedCase: NEmergencyCase | null;
  resetSubmittedCase: () => void;
}
```

## Properties

### `submitCase`
- **Type**: `(emergencyCase: NEmergencyCase) => void`
- **Purpose**: Submit a new emergency case to the server
- **Parameters**: Complete emergency case data including patient info and medical details

### `isSubmitting`
- **Type**: `boolean`
- **Purpose**: Indicates if case submission is in progress
- **Usage**: Show loading states and disable form submission

### `getDoctorAvailability`
- **Type**: `() => void`
- **Purpose**: Fetch available doctors for emergency consultations
- **Usage**: Call when user needs to assign a doctor to the case

### `isLoadingAvailability`
- **Type**: `boolean`
- **Purpose**: Indicates if doctor availability query is in progress
- **Usage**: Show loading states for doctor selection UI

### `doctorAvailability`
- **Type**: `any`
- **Purpose**: Contains list of available doctors and time slots
- **Usage**: Populate doctor selection dropdowns

### `error`
- **Type**: `string | null`
- **Purpose**: Contains error messages for failed operations
- **Error Types**: Authentication errors, submission failures, network issues

### `submittedCase`
- **Type**: `NEmergencyCase | null`
- **Purpose**: Contains the successfully submitted case data
- **Usage**: Show confirmation and case reference information

### `resetSubmittedCase`
- **Type**: `() => void`
- **Purpose**: Clear submitted case state and errors
- **Usage**: Reset form for new case entry

## Usage Examples

### Basic Emergency Case Submission
```typescript
import { useEmergencyCase } from '../src/hooks/useEmergencyCase';

const EmergencyCaseForm = () => {
  const { 
    submitCase, 
    isSubmitting, 
    error, 
    submittedCase, 
    resetSubmittedCase 
  } = useEmergencyCase();

  const handleSubmit = (formData) => {
    const emergencyCase = {
      // Patient Information
      patientId: formData.patientId,
      name: formData.patientName,
      surname: formData.patientSurname,
      gender: formData.gender,
      erAge: formData.age,
      
      // Emergency Details
      erProselefsi: formData.arrivalMethod,
      erOros: formData.mountainous,
      erAllo: formData.other,
      
      // Medical History
      histSymptom: formData.symptoms,
      histSmoker: formData.smoker,
      histAlergic: formData.allergies,
      histLoimodi: formData.infections,
      
      // Vital Signs
      vitalTime: formData.vitalTime,
      vitalPulses: formData.pulse,
      vitalAP: formData.bloodPressure,
      vitalInhale: formData.breathing,
      vitalSpo2: formData.oxygenSaturation,
      vitalT: formData.temperature,
      
      // Clinical Signs
      genikiSimeiologia: formData.generalSigns,
      neurologikiSimeiologia: formData.neurologicalSigns,
      cardioanapneustikiSimeiologia: formData.cardioRespSigns,
      
      // Comments
      erComments: formData.comments
    };
    
    submitCase(emergencyCase);
  };

  if (submittedCase) {
    return (
      <div className="success-message">
        <h3>Emergency Case Submitted Successfully!</h3>
        <p>Case ID: {submittedCase.patientId}</p>
        <p>Patient: {submittedCase.name} {submittedCase.surname}</p>
        <button onClick={resetSubmittedCase}>Submit Another Case</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-alert">{error}</div>}
      
      {/* Emergency case form fields */}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting Case...' : 'Submit Emergency Case'}
      </button>
    </form>
  );
};
```

### Doctor Availability Integration
```typescript
const DoctorAssignment = () => {
  const { 
    getDoctorAvailability, 
    isLoadingAvailability, 
    doctorAvailability 
  } = useEmergencyCase();

  useEffect(() => {
    // Load doctor availability when component mounts
    getDoctorAvailability();
  }, [getDoctorAvailability]);

  return (
    <div>
      <h3>Available Doctors</h3>
      {isLoadingAvailability ? (
        <div>Loading available doctors...</div>
      ) : (
        <select>
          <option value="">Select a doctor</option>
          {doctorAvailability?.map(doctor => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.availability}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
```

### Complete Emergency Workflow
```typescript
const EmergencyWorkflow = () => {
  const [currentStep, setCurrentStep] = useState('case-entry');
  const { 
    submitCase, 
    isSubmitting, 
    getDoctorAvailability,
    doctorAvailability,
    submittedCase,
    error 
  } = useEmergencyCase();

  const handleCaseSubmission = (caseData) => {
    submitCase(caseData);
  };

  useEffect(() => {
    if (submittedCase) {
      setCurrentStep('doctor-assignment');
      getDoctorAvailability();
    }
  }, [submittedCase, getDoctorAvailability]);

  return (
    <div>
      {currentStep === 'case-entry' && (
        <EmergencyCaseForm onSubmit={handleCaseSubmission} />
      )}
      
      {currentStep === 'doctor-assignment' && (
        <DoctorAssignment 
          caseId={submittedCase?.patientId}
          availableDoctors={doctorAvailability}
        />
      )}
    </div>
  );
};
```

## Emergency Case Data Structure

### Required Fields
```typescript
interface NEmergencyCase {
  // Patient Identification
  patientId?: string;
  name?: string;
  surname?: string;
  gender?: string;
  
  // Emergency Details
  erAge?: string;
  erProselefsi?: string; // Arrival method
  erOros?: string;       // Mountainous area
  erAllo?: string;       // Other details
  
  // Medical History
  histSymptom?: string;  // Symptoms
  histSmoker?: string;   // Smoking history
  histAlergic?: string;  // Allergies
  histLoimodi?: string;  // Infections
  
  // Trauma Assessment
  trauma?: string;
  
  // Vital Signs
  vitalTime?: string;
  vitalPulses?: string;
  vitalAP?: string;      // Blood pressure
  vitalInhale?: string;  // Breathing
  vitalSpo2?: string;    // Oxygen saturation
  vitalT?: string;       // Temperature
  
  // Skin Assessment
  derma?: string;
  
  // Clinical Examinations
  genikiSimeiologia?: string;           // General signs
  genOther?: string;
  xeirourgikiSimeiologia?: string;      // Surgical signs
  neurologikiSimeiologia?: string;      // Neurological signs
  cardioanapneustikiSimeiologia?: string; // Cardio-respiratory signs
  
  // Neurological Assessment (Detailed)
  neuroParesi?: string;
  neuroHmipligia?: string;
  neuroSergApoleiaSineidisis?: string;
  neuroSergAnoiktoiOfthalmoi?: string;
  neuroSergKalyteriProforikiApantisi?: string;
  neuroSergKalyteriKinitikiApantisi?: string;
  neuroSergKoresMegethosDeksi?: string;
  neuroSergKoresMegethosAristero?: string;
  neuroSergKoresAntidrasiDeksi?: string;
  neuroSergKoresAntidrasiAristero?: string;
  neuroSergSynoloVathmwn?: string;
  
  // Cardiac Assessment
  cardioThorakikoAlgos?: string;
  cardioXaraktiras?: string;
  cardioEnarxi?: string;
  cardioDiarkeia?: string;
  
  // Psychological Assessment
  psychoDiathesi?: string;
  psychoSymperifora?: string;
  psychoSkepseis?: string;
  
  // Comments
  erComments?: string;
}
```

## Error Handling

### Authentication Errors
```typescript
if (error.status === 501) {
  setError('Please log in to submit emergency cases');
}
```

### Submission Failures
```typescript
else if (error instanceof Error) {
  setError(`Case submission error: ${error.message}`);
}
```

### Network Issues
```typescript
else {
  setError('Failed to submit emergency case');
}
```

## State Management

### Case Submission Flow
1. User fills emergency case form
2. `submitCase()` called with case data
3. `isSubmitting` becomes `true`
4. API call executes
5. On success: `submittedCase` populated, `isSubmitting` becomes `false`
6. User sees confirmation with case details

### Doctor Availability Flow
1. `getDoctorAvailability()` called
2. `isLoadingAvailability` becomes `true`
3. API call executes
4. On success: `doctorAvailability` populated, `isLoadingAvailability` becomes `false`
5. User can select from available doctors

## Integration with Forms

### Form Validation
```typescript
const validateEmergencyCase = (caseData) => {
  const errors = [];
  
  // Required patient information
  if (!caseData.name || !caseData.surname) {
    errors.push('Patient name is required');
  }
  
  if (!caseData.gender) {
    errors.push('Patient gender is required');
  }
  
  // Required vital signs
  if (!caseData.vitalPulses || !caseData.vitalAP) {
    errors.push('Basic vital signs are required');
  }
  
  return errors;
};
```

### Multi-Step Form Integration
```typescript
const EmergencyMultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { submitCase, isSubmitting } = useEmergencyCase();

  const handleStepComplete = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final step - submit case
      submitCase(formData);
    }
  };

  return (
    <div>
      {step === 1 && <PatientInfoStep onComplete={handleStepComplete} />}
      {step === 2 && <VitalSignsStep onComplete={handleStepComplete} />}
      {step === 3 && <ClinicalExamStep onComplete={handleStepComplete} />}
      {step === 4 && <ReviewStep data={formData} onSubmit={handleStepComplete} />}
    </div>
  );
};
```

## Performance Considerations

### Lazy Loading
```typescript
// Only fetch doctor availability when needed
const handleAssignDoctor = () => {
  if (!doctorAvailability) {
    getDoctorAvailability();
  }
  setShowDoctorSelection(true);
};
```

### Auto-save Draft
```typescript
const [draftData, setDraftData] = useState({});

// Auto-save form data
useEffect(() => {
  const timer = setTimeout(() => {
    localStorage.setItem('emergencyDraft', JSON.stringify(draftData));
  }, 1000);
  
  return () => clearTimeout(timer);
}, [draftData]);
```

## Security Considerations

### Sensitive Medical Data
- Ensure all medical data is transmitted securely
- Don't log sensitive patient information
- Validate all input data before submission

### Emergency Priority
- Implement proper error handling to not block critical cases
- Provide offline capabilities for emergency situations
- Ensure rapid response times for case submissions

## Testing

### Unit Tests
```typescript
describe('useEmergencyCase', () => {
  it('should submit emergency case successfully', async () => {
    const { result } = renderHook(() => useEmergencyCase());
    
    act(() => {
      result.current.submitCase(mockEmergencyCase);
    });
    
    await waitFor(() => {
      expect(result.current.submittedCase).toBeTruthy();
    });
  });

  it('should fetch doctor availability', async () => {
    const { result } = renderHook(() => useEmergencyCase());
    
    act(() => {
      result.current.getDoctorAvailability();
    });
    
    await waitFor(() => {
      expect(result.current.doctorAvailability).toBeTruthy();
    });
  });
});
```

## Dependencies

### Required Packages
- `@tanstack/react-query`: Query and mutation management
- `../api`: API client instance
- `../generated_api`: TypeScript interfaces

## Troubleshooting

### Common Issues
1. **501 Errors**: Verify user authentication
2. **Case not submitting**: Check required fields
3. **Doctor availability empty**: Verify API endpoint
4. **Loading states stuck**: Check error handling

### Debug Tips
- Use React Query DevTools for state inspection
- Check network tab for API call details
- Verify emergency case data structure
- Test with minimal required fields first