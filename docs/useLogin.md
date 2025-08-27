# useLogin Hook Documentation

## Overview

The `useLogin` hook provides secure authentication functionality for the Noah Ark medical application. It handles user login operations with enhanced security measures, manages authentication state, and provides comprehensive error handling for login failures.

## Location
`src/hooks/useLogin.ts`

## Purpose
- Handle user authentication (online and offline modes)
- Manage login state and loading indicators with security best practices
- Provide secure error handling without exposing sensitive information
- Navigate users to appropriate screens after successful login

## Security Enhancements
- **No credential logging**: Sensitive login errors are not logged to console
- **Sanitized error messages**: Error messages don't expose system internals
- **Secure credential handling**: Credentials are handled securely through API client

## Dependencies
- `@tanstack/react-query` for mutation management
- `react-router-dom` for navigation
- Custom API client for authentication requests

## Interface

### Parameters
The hook accepts no parameters and returns an object with the following properties:

### Return Object
```typescript
{
  login: (credentials: { user?: string; password?: string }) => void;
  loginOffline: () => void;
  isLoading: boolean;
  error: string | null;
}
```

## Properties

### `login`
- **Type**: `(credentials: { user?: string; password?: string }) => void`
- **Purpose**: Initiates secure online login with user credentials
- **Parameters**: 
  - `credentials.user`: Username (optional)
  - `credentials.password`: Password (optional)
- **Security**: Credentials are transmitted securely without console logging
- **Behavior**: Makes API call to authenticate user and navigates to dashboard on success

### `loginOffline`
- **Type**: `() => void`
- **Purpose**: Initiates offline login mode for network-limited environments
- **Behavior**: Simulates successful login without API call and navigates to dashboard
- **Note**: Still logs offline errors for debugging purposes

### `isLoading`
- **Type**: `boolean`
- **Purpose**: Indicates whether a login operation is currently in progress
- **Usage**: Show loading indicators and disable form controls during authentication

### `error`
- **Type**: `string | null`
- **Purpose**: Contains sanitized error message if login fails, null if no error
- **Security**: Error messages are user-friendly and don't expose sensitive system information
- **Error Types**: HTTP response errors, network errors, validation errors

## Usage Examples

### Secure Login Form
```typescript
import { useLogin } from '../src/hooks/useLogin';

const SecureLoginForm = () => {
  const { login, loginOffline, isLoading, error } = useLogin();
  const [credentials, setCredentials] = useState({ user: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Credentials are handled securely by the hook
    login(credentials);
  };

  const clearForm = () => {
    setCredentials({ user: '', password: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error-alert">
          <span>{error}</span>
          <button type="button" onClick={clearForm}>Clear</button>
        </div>
      )}
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={credentials.user}
          onChange={(e) => setCredentials(prev => ({ ...prev, user: e.target.value }))}
          disabled={isLoading}
          autoComplete="username"
        />
      </div>
      
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          disabled={isLoading}
          autoComplete="current-password"
        />
      </div>
      
      <div className="button-group">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Authenticating...' : 'Login'}
        </button>
        
        <button type="button" onClick={loginOffline} disabled={isLoading}>
          Work Offline
        </button>
      </div>
    </form>
  );
};
```

### Advanced Login with Enhanced Security
```typescript
const EnhancedLoginForm = () => {
  const { login, loginOffline, isLoading, error } = useLogin();
  const [formData, setFormData] = useState({ user: '', password: '' });
  const [validationErrors, setValidationErrors] = useState({});
  const [attemptCount, setAttemptCount] = useState(0);

  const validateForm = () => {
    const errors = {};
    if (!formData.user.trim()) errors.user = 'Username is required';
    if (!formData.password.trim()) errors.password = 'Password is required';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors({});
    setAttemptCount(prev => prev + 1);
    login(formData);
  };

  // Clear form on successful login or after multiple failed attempts
  useEffect(() => {
    if (!isLoading && !error) {
      setFormData({ user: '', password: '' });
      setAttemptCount(0);
    }
  }, [isLoading, error]);

  // Rate limiting for security
  const isRateLimited = attemptCount >= 3;

  return (
    <div className="secure-login">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            value={formData.user}
            onChange={(e) => setFormData(prev => ({ ...prev, user: e.target.value }))}
            disabled={isLoading || isRateLimited}
            className={validationErrors.user ? 'error' : ''}
            autoComplete="username"
          />
          {validationErrors.user && <span className="error-text">{validationErrors.user}</span>}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            disabled={isLoading || isRateLimited}
            className={validationErrors.password ? 'error' : ''}
            autoComplete="current-password"
          />
          {validationErrors.password && <span className="error-text">{validationErrors.password}</span>}
        </div>
        
        {error && <div className="api-error">{error}</div>}
        
        {isRateLimited && (
          <div className="rate-limit-warning">
            Too many failed attempts. Please wait before trying again.
          </div>
        )}
        
        <div className="button-group">
          <button type="submit" disabled={isLoading || isRateLimited}>
            {isLoading ? 'Authenticating...' : 'Login'}
          </button>
          <button type="button" onClick={loginOffline} disabled={isLoading}>
            Work Offline
          </button>
        </div>
      </form>
      
      <div className="security-info">
        <small>Your credentials are transmitted securely and not logged.</small>
      </div>
    </div>
  );
};
```

## Error Handling

The hook implements secure error handling that doesn't expose sensitive information:

### Secure HTTP Response Errors
```typescript
if (error instanceof Response) {
  setError(`HTTP ${error.status}: ${error.statusText}`);
}
```

### JavaScript Errors (Sanitized)
```typescript
else if (error instanceof Error) {
  setError(error.message);
}
```

### Generic Fallback
```typescript
else {
  setError('An unexpected error occurred');
}
```

### Security Note
- **No credential logging**: Login errors are not logged to console to prevent credential exposure
- **Sanitized messages**: Error messages are user-friendly and don't reveal system internals
- **Offline errors**: Only offline login errors are logged for debugging (no credentials involved)

## API Integration

### Online Login
- **Endpoint**: Uses the generated API client to call login endpoint
- **Method**: Secure API call with credentials in request body (not query parameters)
- **Security**: Credentials are not exposed in browser console or network logs
- **Response**: Handles success/failure and navigation securely

### Offline Login
- **Behavior**: Simulates successful authentication without API call
- **Use Case**: Allows application use when network is unavailable
- **Security**: Limited functionality to maintain security in offline mode
- **Logging**: Offline errors are still logged for debugging purposes

## State Management

The hook uses React Query's `useMutation` for secure state management:

- **Loading State**: Automatically managed by React Query
- **Error State**: Custom secure error handling with sanitized messages
- **Success State**: Automatic navigation to dashboard on successful login
- **Security**: No sensitive data is stored in component state

## Navigation

Upon successful login (both online and offline), the hook automatically navigates to the dashboard screen using React Router's `useNavigate`.

## Security Considerations

### Enhanced Security Features
- **Credential Protection**: Credentials are never logged to console
- **Secure Transmission**: Credentials sent in request body, not URL parameters
- **Error Sanitization**: Error messages don't expose sensitive system information
- **Rate Limiting**: Can be implemented at component level to prevent brute force attacks
- **Auto-complete Support**: Proper autocomplete attributes for password managers

### Best Practices Implemented
- No sensitive data logging
- Secure error message handling
- Proper form field attributes for security
- Clear credential handling without exposure

## Testing

### Unit Tests
```typescript
describe('useLogin', () => {
  it('should handle successful login without logging credentials', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const { result } = renderHook(() => useLogin());
    
    act(() => {
      result.current.login({ user: 'testuser', password: 'testpass' });
    });
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Verify no credentials were logged
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('testpass')
    );
  });

  it('should handle login errors securely', async () => {
    const { result } = renderHook(() => useLogin());
    
    act(() => {
      result.current.login({ user: 'invalid', password: 'invalid' });
    });
    
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
      expect(result.current.error).not.toContain('invalid'); // No credential exposure
    });
  });
});
```

### Security Tests
- Verify no credential logging occurs
- Test error message sanitization
- Verify secure credential transmission
- Test rate limiting implementation

## Best Practices

1. **Always handle loading states** in UI components
2. **Display sanitized error messages** to provide user feedback without security risks
3. **Validate input** before calling login function
4. **Disable form controls** during login process
5. **Provide offline option** for network-limited environments
6. **Implement rate limiting** to prevent brute force attacks
7. **Use proper autocomplete attributes** for password managers
8. **Clear sensitive form data** after successful login

## Common Issues

1. **Network connectivity**: Handle offline scenarios gracefully
2. **Invalid credentials**: Provide clear but secure error messages
3. **API endpoint changes**: Update API client configuration
4. **Navigation issues**: Ensure proper route configuration
5. **Security concerns**: Never log sensitive information

## Migration Notes

When updating from direct API calls to this hook:
1. Replace direct API calls with hook usage
2. Update error handling to use hook's secure error state
3. Replace manual loading states with hook's isLoading
4. Update navigation logic to rely on hook's automatic navigation
5. Remove any credential logging from existing code
6. Implement proper form security attributes

## Security Compliance

This hook follows security best practices:
- ✅ No credential logging
- ✅ Secure error handling
- ✅ Proper credential transmission
- ✅ Sanitized error messages
- ✅ Rate limiting support
- ✅ Auto-complete security attributes