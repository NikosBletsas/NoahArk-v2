---
id: useSystemOperations
title: useSystemOperations Hook Documentation
---

# useSystemOperations Hook Documentation

## Overview

The `useSystemOperations` hook manages system-level operations including file uploads, document scanning, case management, and recovery session handling. It provides comprehensive functionality for administrative and operational tasks in the Noah Ark medical system.

## Location
`src/hooks/useSystemOperations.ts`

## Purpose
- Upload files to the server with progress tracking
- Scan documents using integrated scanner
- Reset and manage medical cases
- Handle recovery session file management
- Provide system operation status and error handling

## API Integration
- **File Upload**: `GET /api/Main/SendData`
- **Document Scanning**: `GET /api/Main/ScanDocument`
- **Case Reset**: `POST /api/Main/ResetCase`
- **Add Files**: `GET /api/Main/AddMoreFiles`

## Interface

### Return Object
```typescript
{
  // File Upload Operations
  uploadData: () => void;
  isUploading: boolean;
  
  // Document Scanning Operations
  scanDocument: () => void;
  isScanning: boolean;
  scannedDocument: string | null;
  
  // Case Management Operations
  resetCase: () => void;
  isResetting: boolean;
  
  // File Management Operations
  addMoreFiles: (filePaths: string[]) => void;
  isAddingFiles: boolean;
  
  // Common State
  error: string | null;
  clearError: () => void;
  clearScannedDocument: () => void;
}
```

## Properties

### File Upload Operations

#### `uploadData`
- **Type**: `() => void`
- **Purpose**: Upload pending files to the server
- **Features**: Handles multiple file types, progress tracking
- **Usage**: Sync local data with server

#### `isUploading`
- **Type**: `boolean`
- **Purpose**: Indicates if file upload is in progress
- **Usage**: Show upload progress and disable UI during upload

### Document Scanning Operations

#### `scanDocument`
- **Type**: `() => void`
- **Purpose**: Scan a single page document using the integrated scanner
- **Features**: Returns file path of scanned document
- **Usage**: Digitize physical documents for patient records

#### `isScanning`
- **Type**: `boolean`
- **Purpose**: Indicates if document scanning is in progress
- **Usage**: Show scanning status and disable scanner controls

#### `scannedDocument`
- **Type**: `string | null`
- **Purpose**: Contains file path of the most recently scanned document
- **Usage**: Access scanned document for preview or processing

### Case Management Operations

#### `resetCase`
- **Type**: `() => void`
- **Purpose**: Reset the current medical case and clear associated data
- **Features**: Clears local state and server-side case data
- **Usage**: Start fresh case or clear completed case

#### `isResetting`
- **Type**: `boolean`
- **Purpose**: Indicates if case reset is in progress
- **Usage**: Show reset status and prevent concurrent operations

### File Management Operations

#### `addMoreFiles`
- **Type**: `(filePaths: string[]) => void`
- **Purpose**: Add additional files to the current recovery session
- **Parameters**: Array of file paths to add
- **Usage**: Extend existing case with additional documentation

#### `isAddingFiles`
- **Type**: `boolean`
- **Purpose**: Indicates if file addition is in progress
- **Usage**: Show progress during file addition

### Common State

#### `error`
- **Type**: `string | null`
- **Purpose**: Contains error messages from system operations
- **Error Types**: Authentication, file system, network, validation errors

#### `clearError`
- **Type**: `() => void`
- **Purpose**: Clear error state
- **Usage**: Reset error state after user acknowledgment

#### `clearScannedDocument`
- **Type**: `() => void`
- **Purpose**: Clear scanned document state
- **Usage**: Reset scanner state for new document

## Usage Examples

### File Upload Management
```typescript
import { useSystemOperations } from '../src/hooks/useSystemOperations';

const FileUploadScreen = () => {
  const { uploadData, isUploading, error, clearError } = useSystemOperations();
  const [pendingFiles, setPendingFiles] = useState([]);

  const handleUpload = () => {
    if (pendingFiles.length > 0) {
      clearError();
      uploadData();
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      
      {error && (
        <div className="error-alert">
          <span>{error}</span>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}
      
      <div className="file-status">
        <p>Pending files: {pendingFiles.length}</p>
      </div>
      
      <button 
        onClick={handleUpload}
        disabled={isUploading || pendingFiles.length === 0}
      >
        {isUploading ? 'Uploading...' : 'Upload Files'}
      </button>
      
      {isUploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p>Uploading files to server...</p>
        </div>
      )}
    </div>
  );
};
```

### Document Scanner Integration
```typescript
const DocumentScannerScreen = () => {
  const { 
    scanDocument, 
    isScanning, 
    scannedDocument, 
    clearScannedDocument,
    error 
  } = useSystemOperations();

  const [scannedDocuments, setScannedDocuments] = useState([]);

  const handleScan = () => {
    clearScannedDocument();
    scanDocument();
  };

  // Handle newly scanned document
  useEffect(() => {
    if (scannedDocument) {
      const newDoc = {
        id: Date.now(),
        path: scannedDocument,
        scannedAt: new Date().toISOString(),
        name: `Document_${new Date().toISOString().split('T')[0]}`
      };
      
      setScannedDocuments(prev => [newDoc, ...prev]);
    }
  }, [scannedDocument]);

  return (
    <div>
      <h2>Document Scanner</h2>
      
      <div className="scanner-controls">
        <button 
          onClick={handleScan}
          disabled={isScanning}
        >
          {isScanning ? 'Scanning...' : 'Scan Document'}
        </button>
      </div>

      {isScanning && (
        <div className="scanning-status">
          <div className="scanner-animation"></div>
          <p>Scanning document... Please wait</p>
        </div>
      )}

      {error && (
        <div className="error">{error}</div>
      )}

      {/* Scanned Documents List */}
      <div className="scanned-documents">
        <h3>Scanned Documents</h3>
        {scannedDocuments.length === 0 ? (
          <p>No documents scanned</p>
        ) : (
          <div className="documents-list">
            {scannedDocuments.map(doc => (
              <div key={doc.id} className="document-item">
                <img 
                  src={doc.path} 
                  alt={doc.name}
                  className="document-thumbnail"
                />
                <div className="document-info">
                  <h4>{doc.name}</h4>
                  <p>Scanned: {new Date(doc.scannedAt).toLocaleString()}</p>
                  <button onClick={() => window.open(doc.path)}>
                    View Full Size
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

### Case Management System
```typescript
const CaseManagementScreen = () => {
  const { 
    resetCase, 
    isResetting, 
    addMoreFiles, 
    isAddingFiles,
    error 
  } = useSystemOperations();

  const [currentCase, setCurrentCase] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const handleResetCase = () => {
    if (window.confirm('Are you sure you want to reset the current case? This action cannot be undone.')) {
      resetCase();
    }
  };

  const handleAddFiles = () => {
    if (additionalFiles.length > 0) {
      addMoreFiles(additionalFiles.map(file => file.path));
    }
  };

  // Clear case data when reset completes
  useEffect(() => {
    if (!isResetting && !error) {
      setCurrentCase(null);
      setAdditionalFiles([]);
    }
  }, [isResetting, error]);

  return (
    <div>
      <h2>Case Management</h2>
      
      {currentCase && (
        <div className="current-case">
          <h3>Current Case</h3>
          <p>Case ID: {currentCase.id}</p>
          <p>Patient: {currentCase.patientName}</p>
          <p>Created: {new Date(currentCase.createdAt).toLocaleString()}</p>
        </div>
      )}

      <div className="case-actions">
        <button 
          onClick={handleResetCase}
          disabled={isResetting}
          className="reset-btn"
        >
          {isResetting ? 'Resetting...' : 'Reset Case'}
        </button>
      </div>

      {/* Additional Files Section */}
      <div className="additional-files">
        <h3>Additional Files</h3>
        
        <input 
          type="file"
          multiple
          onChange={(e) => setAdditionalFiles(Array.from(e.target.files))}
        />
        
        {additionalFiles.length > 0 && (
          <div>
            <p>Selected files: {additionalFiles.length}</p>
            <button 
              onClick={handleAddFiles}
              disabled={isAddingFiles}
            >
              {isAddingFiles ? 'Adding Files...' : 'Add to Case'}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}
    </div>
  );
};
```

### Complete System Operations Screen
```typescript
const SystemOperationsScreen = () => {
  const { 
    uploadData,
    isUploading,
    scanDocument,
    isScanning,
    scannedDocument,
    resetCase,
    isResetting,
    addMoreFiles,
    isAddingFiles,
    error,
    clearError,
    clearScannedDocument
  } = useSystemOperations();

  const [operationHistory, setOperationHistory] = useState([]);

  // Log operations for history
  const logOperation = (operation, status, details = '') => {
    const logEntry = {
      id: Date.now(),
      operation,
      status,
      details,
      timestamp: new Date().toISOString()
    };
    
    setOperationHistory(prev => [logEntry, ...prev.slice(0, 9)]); // Keep last 10
  };

  // Track operation completions
  useEffect(() => {
    if (!isUploading && !error) {
      logOperation('File Upload', 'Completed', 'Files uploaded successfully');
    }
  }, [isUploading, error]);

  useEffect(() => {
    if (scannedDocument) {
      logOperation('Document Scan', 'Completed', `Document saved: ${scannedDocument}`);
    }
  }, [scannedDocument]);

  useEffect(() => {
    if (!isResetting && !error) {
      logOperation('Case Reset', 'Completed', 'Case data cleared');
    }
  }, [isResetting, error]);

  return (
    <div className="system-operations">
      <h2>System Operations</h2>

      {/* Global Error Display */}
      {error && (
        <div className="global-error">
          <span>{error}</span>
          <button onClick={clearError}>Clear</button>
        </div>
      )}

      {/* Operations Grid */}
      <div className="operations-grid">
        
        {/* File Upload Section */}
        <div className="operation-card">
          <h3>File Upload</h3>
          <button 
            onClick={uploadData}
            disabled={isUploading}
            className="operation-btn"
          >
            {isUploading ? 'Uploading...' : 'Upload Files'}
          </button>
          {isUploading && <div className="loading-spinner"></div>}
        </div>

        {/* Document Scanner Section */}
        <div className="operation-card">
          <h3>Document Scanner</h3>
          <button 
            onClick={scanDocument}
            disabled={isScanning}
            className="operation-btn"
          >
            {isScanning ? 'Scanning...' : 'Scan Document'}
          </button>
          {scannedDocument && (
            <div className="scan-result">
              <p>Document scanned successfully</p>
              <button onClick={clearScannedDocument}>Clear</button>
            </div>
          )}
        </div>

        {/* Case Management Section */}
        <div className="operation-card">
          <h3>Case Management</h3>
          <button 
            onClick={resetCase}
            disabled={isResetting}
            className="operation-btn reset"
          >
            {isResetting ? 'Resetting...' : 'Reset Case'}
          </button>
        </div>

        {/* File Management Section */}
        <div className="operation-card">
          <h3>File Management</h3>
          <button 
            onClick={() => addMoreFiles(['example.pdf', 'report.doc'])}
            disabled={isAddingFiles}
            className="operation-btn"
          >
            {isAddingFiles ? 'Adding...' : 'Add Files'}
          </button>
        </div>
      </div>

      {/* Operation History */}
      <div className="operation-history">
        <h3>Recent Operations</h3>
        {operationHistory.length === 0 ? (
          <p>No operations performed</p>
        ) : (
          <div className="history-list">
            {operationHistory.map(entry => (
              <div key={entry.id} className="history-item">
                <span className="operation">{entry.operation}</span>
                <span className={`status ${entry.status.toLowerCase()}`}>
                  {entry.status}
                </span>
                <span className="time">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
                {entry.details && (
                  <span className="details">{entry.details}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

## Error Handling

### File Upload Errors
```typescript
if (error.status === 501) {
  setError('Please log in to upload files');
} else if (error.status === 502) {
  setError('No files to upload');
} else if (error.status === 503) {
  setError('File upload failed - please try again');
}
```

### Scanner Errors
```typescript
if (error.status === 501) {
  setError('Please log in to scan documents');
} else {
  setError(`Scanner error: ${error.message}`);
}
```

### File System Errors
```typescript
else if (error instanceof Error) {
  setError(`File system error: ${error.message}`);
}
```

## State Management

### Upload Flow
1. `uploadData()` called
2. `isUploading` becomes `true`
3. API processes pending files
4. On success: `isUploading` becomes `false`
5. On error: `error` populated with specific message

### Scan Flow
1. `scanDocument()` called
2. `isScanning` becomes `true`
3. Scanner captures document
4. On success: `scannedDocument` contains file path, `isScanning` becomes `false`
5. On error: `error` populated, `scannedDocument` remains `null`

### Reset Flow
1. `resetCase()` called
2. `isResetting` becomes `true`
3. Server clears case data
4. On success: `isResetting` becomes `false`, local state cleared
5. On error: `error` populated with failure reason

## Performance Considerations

### File Upload Optimization
```typescript
// Batch file uploads
const uploadInBatches = async (files, batchSize = 5) => {
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    await uploadBatch(batch);
  }
};
```

### Scanner Resource Management
```typescript
// Release scanner resources after use
useEffect(() => {
  return () => {
    if (isScanning) {
      // Cancel ongoing scan operation
      cancelScan();
    }
  };
}, []);
```

## Security Considerations

### File Validation
- Validate file types before upload
- Check file sizes and limits
- Scan for malicious content

### Access Control
- Verify user permissions for system operations
- Log all system operations for audit
- Secure file storage and transmission

## Testing

### Unit Tests
```typescript
describe('useSystemOperations', () => {
  it('should upload files successfully', async () => {
    const { result } = renderHook(() => useSystemOperations());
    
    act(() => {
      result.current.uploadData();
    });
    
    await waitFor(() => {
      expect(result.current.isUploading).toBe(false);
    });
  });

  it('should scan document', async () => {
    const { result } = renderHook(() => useSystemOperations());
    
    act(() => {
      result.current.scanDocument();
    });
    
    await waitFor(() => {
      expect(result.current.scannedDocument).toBeTruthy();
    });
  });
});
```

## Dependencies

### Required Packages
- `@tanstack/react-query`: Mutation management
- `../api`: API client instance
- File system APIs (for file operations)

## Troubleshooting

### Common Issues
1. **Upload fails**: Check file permissions and network
2. **Scanner not responding**: Verify scanner drivers and connections
3. **Case reset incomplete**: Check for active sessions or locks
4. **File addition fails**: Verify file paths and permissions

### Debug Tips
- Check file system permissions
- Verify scanner hardware connections
- Use network tab to inspect API calls
- Test with smaller file sizes first