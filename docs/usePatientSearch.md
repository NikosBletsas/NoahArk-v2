---
id: usePatientSearch
title: usePatientSearch Hook Documentation
---

# usePatientSearch Hook Documentation

## Overview

The `usePatientSearch` hook provides comprehensive patient search functionality with API integration, error handling, and state management. It follows the established clean code patterns used throughout the Noah Ark application.

## Location
`src/hooks/usePatientSearch.ts`

## Purpose
- Execute patient searches using various criteria
- Manage search results and loading states
- Provide error handling for search operations
- Support search result clearing and state reset

## API Integration
- **Endpoint**: `POST /api/Main/SearchPatient`
- **Method**: React Query mutation
- **Data Format**: `NPatient` interface from generated API

## Interface

### Parameters
The hook accepts no parameters and returns an object with the following properties:

### Return Object
```typescript
{
  searchPatient: (searchCriteria: NPatient) => void;
  isLoading: boolean;
  error: string | null;
  searchResults: NPatient[];
  clearSearch: () => void;
}
```

## Properties

### `searchPatient`
- **Type**: `(searchCriteria: NPatient) => void`
- **Purpose**: Execute a patient search with the provided criteria
- **Parameters**: 
  - `searchCriteria`: Object containing search parameters (name, surname, etc.)
- **Usage**: Call this function to initiate a search

### `isLoading`
- **Type**: `boolean`
- **Purpose**: Indicates if a search operation is currently in progress
- **Usage**: Use to show loading indicators and disable UI elements

### `error`
- **Type**: `string | null`
- **Purpose**: Contains error message if search fails, null if no error
- **Error Types**:
  - HTTP response errors with status codes
  - Network connectivity issues
  - Validation errors
  - Generic error fallback

### `searchResults`
- **Type**: `NPatient[]`
- **Purpose**: Array of patients returned from the search
- **Usage**: Display search results in UI components

### `clearSearch`
- **Type**: `() => void`
- **Purpose**: Clear search results and reset error state
- **Usage**: Call when user wants to clear search or start fresh

## Usage Examples

### Basic Search
```typescript
import { usePatientSearch } from '../src/hooks/usePatientSearch';

const PatientSearchComponent = () => {
  const { searchPatient, isLoading, error, searchResults, clearSearch } = usePatientSearch();

  const handleSearch = (searchTerm: string) => {
    const searchCriteria = {
      name: searchTerm.includes(' ') ? searchTerm.split(' ')[0] : searchTerm,
      surname: searchTerm.includes(' ') ? searchTerm.split(' ')[1] : searchTerm,
    };
    
    searchPatient(searchCriteria);
  };

  return (
    <div>
      <button 
        onClick={() => handleSearch('John Doe')}
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      
      {error && <div className="error">{error}</div>}
      
      <div>
        {searchResults.map(patient => (
          <div key={patient.id}>
            {patient.name} {patient.surname}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### Advanced Search with Multiple Criteria
```typescript
const handleAdvancedSearch = () => {
  const searchCriteria = {
    name: firstName,
    surname: lastName,
    ssn: ssnFilter,
    gender: genderFilter,
    // Add other search criteria as needed
  };
  
  searchPatient(searchCriteria);
};
```

### Clear Search Results
```typescript
const handleClearSearch = () => {
  clearSearch();
  setSearchTerm(''); // Clear local search term
};
```

## Error Handling

The hook implements comprehensive error handling:

### HTTP Response Errors
```typescript
if (error instanceof Response) {
  setError(`HTTP ${error.status}: ${error.statusText}`);
}
```

### JavaScript Errors
```typescript
else if (error instanceof Error) {
  setError(error.message);
}
```

### Generic Fallback
```typescript
else {
  setError('Failed to search patients');
}
```

## State Management

### Internal State
- `error`: Tracks error messages
- `searchResults`: Stores API response data

### React Query Integration
- Uses `useMutation` for search operations
- Automatic loading state management
- Built-in retry logic
- Error state handling

## Integration with UI Components

### PatientSearchScreen Integration
The hook is integrated into `PatientSearchScreen` with:
- Search button with loading states
- Error message display
- Results table population
- Fallback to mock data when API unavailable

### Data Transformation
```typescript
// Convert API results to UI format
const apiPatients = searchResults.map((result, index) => ({
  id: result.id || `API${index + 1}`,
  name: result.name || '',
  surname: result.surname || '',
  dob: result.birthDate ? new Date(result.birthDate).toISOString().split('T')[0] : '',
  gender: result.gender || result.sex || '',
  ssn: result.ssn || '***-**-****',
  // ... other field mappings
}));
```

## Performance Considerations

### Debouncing
Consider implementing debouncing for real-time search:
```typescript
const debouncedSearch = useCallback(
  debounce((criteria) => searchPatient(criteria), 300),
  [searchPatient]
);
```

### Caching
React Query provides automatic caching, but consider:
- Cache invalidation strategies
- Stale-while-revalidate patterns
- Manual cache updates

## Security Considerations

### Data Sanitization
- Validate search criteria before API calls
- Sanitize user input to prevent injection attacks
- Handle sensitive data appropriately

### Error Information
- Error messages don't expose sensitive system information
- User-friendly error messages for better UX
- Detailed errors logged for debugging (without sensitive data)

## Testing

### Unit Tests
```typescript
describe('usePatientSearch', () => {
  it('should execute search with correct criteria', () => {
    // Test search execution
  });

  it('should handle search errors gracefully', () => {
    // Test error handling
  });

  it('should clear search results', () => {
    // Test clear functionality
  });
});
```

### Integration Tests
- Test with actual API endpoints
- Verify error handling with different HTTP status codes
- Test loading states and UI integration

## Dependencies

### Required Packages
- `@tanstack/react-query`: For mutation management
- `../api`: API client instance
- `../generated_api`: TypeScript interfaces

### Peer Dependencies
- `react`: Hook functionality
- `typescript`: Type safety

## Migration Notes

### From Direct API Calls
1. Replace direct API calls with `searchPatient` function
2. Update error handling to use hook's `error` state
3. Replace manual loading states with hook's `isLoading`
4. Update result handling to use `searchResults`

### Version Compatibility
- Compatible with React Query v5+
- Requires TypeScript for full type safety
- Works with generated API client from Swagger

## Troubleshooting

### Common Issues
1. **No search results**: Check API endpoint availability
2. **Loading state stuck**: Verify API response handling
3. **Error not clearing**: Ensure proper error state management
4. **Type errors**: Verify generated API types are up to date

### Debug Tips
- Use React Query DevTools to inspect mutation state
- Check network tab for API call details
- Verify search criteria format matches API expectations
- Test with mock data to isolate API issues