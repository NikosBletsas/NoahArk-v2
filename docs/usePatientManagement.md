---
id: usePatientManagement
title: usePatientManagement Hook Documentation
---

# usePatientManagement Hook Documentation

## Overview

The `usePatientManagement` hook handles patient creation and management operations with comprehensive validation, error handling, and state tracking. It provides a clean interface for adding new patients to the Noah Ark medical system.

## Location
`src/hooks/usePatientManagement.ts`

## Purpose
- Add new patients to the system with validation
- Handle patient creation errors with specific messaging
- Track newly added patients for confirmation
- Provide loading states for UI feedback

## API Integration
- **Endpoint**: `POST /api/Main/AddPatient`
- **Method**: React Query mutation
- **Data Format**: `NPatient` interface from generated API

## Interface

### Return Object
```typescript
{
  addPatient: (patientData: NPatient) => void;
  isLoading: boolean;
  error: string | null;
  addedPatient: NPatient | null;
  resetAddedPatient: () => void;
}
```

## Properties

### `addPatient`
- **Type**: `(patientData: NPatient) => void`
- **Purpose**: Add a new patient to the system
- **Parameters**: 
  - `patientData`: Complete patient information object
- **Validation**: Handles required field validation and duplicate checking

### `isLoading`
- **Type**: `boolean`
- **Purpose**: Indicates if patient creation is in progress
- **Usage**: Show loading spinners and disable form submission

### `error`
- **Type**: `string | null`
- **Purpose**: Contains specific error messages for different failure scenarios
- **Error Types**:
  - **502**: Required fields missing or patient already exists
  - **501**: User not logged in
  - **HTTP errors**: Other server errors
  - **Network errors**: Connectivity issues

### `addedPatient`
- **Type**: `NPatient | null`
- **Purpose**: Contains the newly created patient data with assigned ID
- **Usage**: Display confirmation and access new patient information

### `resetAddedPatient`
- **Type**: `() => void`
- **Purpose**: Clear the added patient state and any errors
- **Usage**: Reset form state after successful creation

## Usage Examples

### Basic Patient Creation
```typescript
import { usePatientManagement } from '../src/hooks/usePatientManagement';

const AddPatientForm = () => {
  const { addPatient, isLoading, error, addedPatient, resetAddedPatient } = usePatientManagement();

  const handleSubmit = (formData) => {
    const patientData = {
      name: formData.firstName,
      surname: formData.lastName,
      birthDate: formData.dateOfBirth,
      gender: formData.gender,
      ssn: formData.ssn,
      mobilePhone: formData.phone,
      addressStreet: formData.address,
      // ... other patient fields
    };
    
    addPatient(patientData);
  };

  // Show success message
  if (addedPatient) {
    return (
      <div className="success-message">
        <h3>Patient Added Successfully!</h3>
        <p>Patient ID: {addedPatient.id}</p>
        <p>Name: {addedPatient.name} {addedPatient.surname}</p>
        <button onClick={resetAddedPatient}>Add Another Patient</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      {/* Form fields */}
      
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding Patient...' : 'Add Patient'}
      </button>
    </form>
  );
};
```

### Form Validation Integration
```typescript
const validateAndAddPatient = (formData) => {
  // Client-side validation
  const requiredFields = ['name', 'surname', 'birthDate', 'gender'];
  const missingFields = requiredFields.filter(field => !formData[field]);
  
  if (missingFields.length > 0) {
    setFormError(`Required fields missing: ${missingFields.join(', ')}`);
    return;
  }

  // Add patient if validation passes
  addPatient(formData);
};
```

### Error Handling with User Feedback
```typescript
const getErrorMessage = (error) => {
  if (error?.includes('Required fields missing')) {
    return 'Please fill in all required fields marked with *';
  }
  if (error?.includes('patient already exists')) {
    return 'A patient with this information already exists in the system';
  }
  if (error?.includes('log in')) {
    return 'Your session has expired. Please log in again';
  }
  return error || 'An unexpected error occurred';
};
```

## Error Handling

### Specific Error Codes
The hook handles specific HTTP status codes with appropriate messages:

#### 502 - Validation Error
```typescript
if (error.status === 502) {
  setError('Required fields missing or patient already exists');
}
```

#### 501 - Authentication Error
```typescript
if (error.status === 501) {
  setError('Please log in to add patients');
}
```

#### Generic HTTP Errors
```typescript
else {
  setError(`HTTP ${error.status}: ${error.statusText}`);
}
```

## State Management

### Success Flow
1. User submits patient data
2. `isLoading` becomes `true`
3. API call executes
4. On success: `addedPatient` is populated, `isLoading` becomes `false`
5. User sees confirmation with new patient ID

### Error Flow
1. User submits invalid/duplicate data
2. `isLoading` becomes `true`
3. API returns error
4. `error` is populated with specific message, `isLoading` becomes `false`
5. User sees error message and can retry

### Reset Flow
1. User calls `resetAddedPatient()`
2. `addedPatient` becomes `null`
3. `error` becomes `null`
4. Form is ready for new patient entry

## Integration Examples

### With Form Libraries
```typescript
// React Hook Form integration
const { register, handleSubmit, formState: { errors } } = useForm();
const { addPatient, isLoading, error } = usePatientManagement();

const onSubmit = (data) => {
  addPatient(data);
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input 
      {...register('name', { required: 'First name is required' })}
      disabled={isLoading}
    />
    {/* Other form fields */}
  </form>
);
```

### With Navigation
```typescript
const navigate = useNavigate();

// Navigate after successful creation
useEffect(() => {
  if (addedPatient) {
    // Show success message briefly, then navigate
    setTimeout(() => {
      navigate(`/patient/${addedPatient.id}`);
    }, 2000);
  }
}, [addedPatient, navigate]);
```

## Data Validation

### Required Fields
Based on the API specification, ensure these fields are provided:
- `name` (First name)
- `surname` (Last name)
- `birthDate` (Date of birth)
- `gender` (Gender)

### Optional Fields
- `ssn` (Social Security Number)
- `mobilePhone`, `homephone`, `workPhone` (Contact numbers)
- `addressStreet`, `addressZip` (Address information)
- `insuranceName` (Insurance information)
- `otherIdentifier` (Alternative ID)

### Data Format Validation
```typescript
const validatePatientData = (data) => {
  const errors = [];
  
  // Date validation
  if (data.birthDate && !isValidDate(data.birthDate)) {
    errors.push('Invalid birth date format');
  }
  
  // Phone validation
  if (data.mobilePhone && !isValidPhone(data.mobilePhone)) {
    errors.push('Invalid phone number format');
  }
  
  // SSN validation
  if (data.ssn && !isValidSSN(data.ssn)) {
    errors.push('Invalid SSN format');
  }
  
  return errors;
};
```

## Performance Considerations

### Optimistic Updates
Consider implementing optimistic updates for better UX:
```typescript
const addPatientOptimistic = (patientData) => {
  // Immediately show success state
  const tempPatient = { ...patientData, id: 'temp-' + Date.now() };
  setAddedPatient(tempPatient);
  
  // Execute actual API call
  addPatient(patientData);
};
```

### Duplicate Prevention
Prevent duplicate submissions:
```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (data) => {
  if (isSubmitting) return;
  
  setIsSubmitting(true);
  try {
    await addPatient(data);
  } finally {
    setIsSubmitting(false);
  }
};
```

## Security Considerations

### Data Sanitization
- Sanitize all input fields before API submission
- Validate data types and formats
- Remove potentially harmful characters

### Sensitive Information
- Handle SSN and other sensitive data securely
- Don't log sensitive information
- Ensure proper data encryption in transit

## Testing

### Unit Tests
```typescript
describe('usePatientManagement', () => {
  it('should add patient successfully', async () => {
    const { result } = renderHook(() => usePatientManagement());
    
    act(() => {
      result.current.addPatient(mockPatientData);
    });
    
    await waitFor(() => {
      expect(result.current.addedPatient).toBeTruthy();
    });
  });

  it('should handle validation errors', async () => {
    // Mock API to return 502 error
    const { result } = renderHook(() => usePatientManagement());
    
    act(() => {
      result.current.addPatient(invalidPatientData);
    });
    
    await waitFor(() => {
      expect(result.current.error).toContain('Required fields missing');
    });
  });
});
```

### Integration Tests
- Test with actual API endpoints
- Verify error handling for different scenarios
- Test form integration and user workflows

## Dependencies

### Required Packages
- `@tanstack/react-query`: Mutation management
- `../api`: API client instance
- `../generated_api`: TypeScript interfaces

## Troubleshooting

### Common Issues
1. **502 Errors**: Check required fields and duplicate data
2. **501 Errors**: Verify user authentication status
3. **Loading state stuck**: Check API response handling
4. **Patient not added**: Verify API endpoint and data format

### Debug Tips
- Use React Query DevTools to inspect mutation state
- Check network tab for request/response details
- Verify patient data format matches API expectations
- Test with minimal required fields first