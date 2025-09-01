import apiClient from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDevices = () => {
  const queryClient = useQueryClient();

  // Init patient monitor
  const initPatientMonitor = useQuery({
    queryKey: ["devices", "patientMonitorInit"],
    queryFn: () => apiClient.api.devicesPatientMonitorInitList(),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  // Get Blood Pressure Data
  const getBloodPressureData = useQuery({
    queryKey: ["devices", "bloodPressureData"],
    queryFn: () => apiClient.api.devicesBloodPressureGetDeviceDataList(),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  // Send Blood Pressure Data
  const sendBloodPressureData = useMutation({
    mutationFn: () => apiClient.api.devicesBloodPressureSendDataList(),
    onSuccess: () => {
      toast.success("Blood pressure data sent successfully");
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });

  return {
    // Patient Monitor
    patientMonitorData: initPatientMonitor.data,
    isPatientMonitorLoading: initPatientMonitor.isLoading,
    initPatientMonitor: initPatientMonitor.refetch,
    
    // Blood Pressure
    bloodPressureData: getBloodPressureData.data,
    isBloodPressureLoading: getBloodPressureData.isLoading,
    getBloodPressure: getBloodPressureData.refetch,
    
    // Send Data
    sendBloodPressureData: sendBloodPressureData.mutate,
    isSending: sendBloodPressureData.isPending,
  };
};