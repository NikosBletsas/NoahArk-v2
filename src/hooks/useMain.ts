import apiClient from "@/api";
import { NEmergencyCase, NPatient } from "@/api/generated_api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useMain = () => {
  const queryClient = useQueryClient();

  // ------ Queries (GET) ------ //

  // Init Main app
  const initApp = useQuery({
    queryKey: ["main", "init"],
    queryFn: () => apiClient.api.mainInitList(),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  // Get Battery Status - Auto-fetch with polling
  const getBatteryStatus = useQuery({
    queryKey: ["main", "batteryStatus"],
    queryFn: () => apiClient.api.mainGetBatteryStatusList(),
    enabled: true, // Auto-fetch
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every 60 seconds
    refetchOnWindowFocus: false,
  });

  // Get Efimeries
  const getEfimeries = useQuery({
    queryKey: ["main", "efimeries"],
    queryFn: () => apiClient.api.mainGetEfimeriesList(),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  // Scan Document - Convert to mutation
  const scanDocument = useMutation({
    mutationFn: () => apiClient.api.mainScanDocumentList(),
    onSuccess: () => {
      toast.success("Document scanned successfully");
    },
  });

  // Send Data - Convert to mutation
  const sendData = useMutation({
    mutationFn: () => apiClient.api.mainSendDataList(),
    onSuccess: () => {
      toast.success("Data sent successfully");
      queryClient.invalidateQueries({ queryKey: ["main"] });
    },
  });

  // ------ Mutations ------ //

  // Add more Files
  const addMoreFiles = useMutation({
    mutationFn: (data: string[]) => apiClient.api.mainAddMoreFilesList(data),
    onSuccess: () => {
      toast.success("Files added successfully");
      queryClient.invalidateQueries({ queryKey: ["main"] });
    },
  });

  // New emergency Case
  const newEmergencyCase = useMutation({
    mutationFn: (data: NEmergencyCase) =>
      apiClient.api.mainNewEmergencyCaseCreate(data),
    onSuccess: () => {
      toast.success("Emergency case created successfully");
      queryClient.invalidateQueries({ queryKey: ["main"] });
    },
  });

  // Search patient
  const searchPatient = useMutation({
    mutationFn: (data: NPatient) => apiClient.api.mainSearchPatientCreate(data),
    onSuccess: () => {
      toast.success("Patient search completed");
    },
  });

  // Add patient
  const addPatient = useMutation({
    mutationFn: (data: NPatient) => apiClient.api.mainAddPatientCreate(data),
    onSuccess: () => {
      toast.success("Patient added successfully");
      queryClient.invalidateQueries({ queryKey: ["main", "patients"] });
    },
  });

  // Set Recovery Session - Fixed query parameter
  const setRecoverySession = useMutation({
    mutationFn: (sessionId: string) =>
      apiClient.api.mainSetRecoverySessionList({ sessionID: sessionId }),
    onSuccess: () => {
      toast.success("Recovery session set successfully");
      queryClient.invalidateQueries({ queryKey: ["main", "recoverySessions"] });
    },
  });

  // Reset case
  const resetCase = useMutation({
    mutationFn: () => apiClient.api.mainResetCaseCreate(),
    onSuccess: () => {
      toast.success("Case reset successfully");
      queryClient.invalidateQueries({ queryKey: ["main"] });
    },
  });

  return {
    // App Init
    appData: initApp.data,
    isAppLoading: initApp.isLoading,
    initApp: initApp.refetch,

    // Battery Status
    batteryStatus: getBatteryStatus.data,
    isBatteryLoading: getBatteryStatus.isLoading,
    refreshBatteryStatus: getBatteryStatus.refetch,

    // Efimeries
    efimeries: getEfimeries.data,
    isEfimeriesLoading: getEfimeries.isLoading,
    getEfimeries: getEfimeries.refetch,

    // Actions
    scanDocument: scanDocument.mutate,
    isScanning: scanDocument.isPending,
    
    sendData: sendData.mutate,
    isSending: sendData.isPending,
    
    addMoreFiles: addMoreFiles.mutate,
    isAddingFiles: addMoreFiles.isPending,
    
    createEmergencyCase: newEmergencyCase.mutate,
    isCreatingCase: newEmergencyCase.isPending,
    
    searchPatient: searchPatient.mutate,
    isSearching: searchPatient.isPending,
    searchResults: searchPatient.data,
    
    addPatient: addPatient.mutate,
    isAddingPatient: addPatient.isPending,
    
    setRecoverySession: setRecoverySession.mutate,
    isSettingSession: setRecoverySession.isPending,
    
    resetCase: resetCase.mutate,
    isResetting: resetCase.isPending,
  };
};