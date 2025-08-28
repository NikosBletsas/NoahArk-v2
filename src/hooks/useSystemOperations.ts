import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../api';

/**
 * Custom hook for system-level operations
 * Handles data upload, document scanning, and case management
 */
export const useSystemOperations = () => {
  const [error, setError] = useState<string | null>(null);
  const [scannedDocument, setScannedDocument] = useState<string | null>(null);

  // Mutation for uploading files to server
  const uploadDataMutation = useMutation({
    mutationFn: () => apiClient.api.mainSendDataList(),
    onSuccess: () => {
      setError(null);
    },
    onError: (error: any) => {
      // Handle specific upload error codes
      if (error instanceof Response) {
        if (error.status === 501) {
          setError('Please log in to upload files');
        } else if (error.status === 502) {
          setError('No files to upload');
        } else if (error.status === 503) {
          setError('File upload failed - please try again');
        } else {
          setError(`Upload failed: HTTP ${error.status}`);
        }
      } else if (error instanceof Error) {
        setError(`Upload error: ${error.message}`);
      } else {
        setError('Failed to upload files');
      }
    },
  });

  // Mutation for scanning documents
  const scanDocumentMutation = useMutation({
    mutationFn: () => apiClient.api.mainScanDocumentList(),
    onSuccess: (data: any) => {
      // Store the scanned document file path
      setScannedDocument(data);
      setError(null);
    },
    onError: (error: any) => {
      if (error instanceof Response) {
        if (error.status === 501) {
          setError('Please log in to scan documents');
        } else {
          setError(`Scan failed: HTTP ${error.status}`);
        }
      } else if (error instanceof Error) {
        setError(`Scanner error: ${error.message}`);
      } else {
        setError('Failed to scan document');
      }
      setScannedDocument(null);
    },
  });

  // Mutation for resetting current case
  const resetCaseMutation = useMutation({
    mutationFn: () => apiClient.api.mainResetCaseCreate(),
    onSuccess: () => {
      setError(null);
      // Clear any local state related to the case
      setScannedDocument(null);
    },
    onError: (error: any) => {
      if (error instanceof Response) {
        setError(`Failed to reset case: HTTP ${error.status}`);
      } else if (error instanceof Error) {
        setError(`Reset error: ${error.message}`);
      } else {
        setError('Failed to reset case');
      }
    },
  });

  // Mutation for adding more files to recovery session
  const addMoreFilesMutation = useMutation({
    mutationFn: (filePaths: string[]) =>
      apiClient.api.mainAddMoreFilesList(filePaths),
    onSuccess: () => {
      setError(null);
    },
    onError: (error: any) => {
      if (error instanceof Response) {
        if (error.status === 501) {
          setError('Please log in to add files');
        } else if (error.status === 503) {
          setError('Failed to add files to session');
        } else {
          setError(`Add files failed: HTTP ${error.status}`);
        }
      } else if (error instanceof Error) {
        setError(`File addition error: ${error.message}`);
      } else {
        setError('Failed to add files');
      }
    },
  });

  return {
    // File upload operations
    uploadData: uploadDataMutation.mutate,
    isUploading: uploadDataMutation.isPending,
    
    // Document scanning operations
    scanDocument: scanDocumentMutation.mutate,
    isScanning: scanDocumentMutation.isPending,
    scannedDocument,
    
    // Case management operations
    resetCase: resetCaseMutation.mutate,
    isResetting: resetCaseMutation.isPending,
    
    // File management operations
    addMoreFiles: addMoreFilesMutation.mutate,
    isAddingFiles: addMoreFilesMutation.isPending,
    
    // Common state
    error,
    clearError: () => setError(null),
    clearScannedDocument: () => setScannedDocument(null),
  };
};