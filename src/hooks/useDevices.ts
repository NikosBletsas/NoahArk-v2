import apiClient from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";

// Data models based on documentation
interface NHmsData {
  heartRate?: number;
  systolicBP?: number;
  diastolicBP?: number;
  meanBP?: number;
  temperature?: number;
  oxygenSaturation?: number;
  respiratoryRate?: number;
  timestamp?: string;
}

interface DeviceConnectionStatus {
  patientMonitor: 'idle' | 'initializing' | 'connected' | 'error';
  bloodPressure: 'idle' | 'reading' | 'ready' | 'error';
  taidocBloodMulti: 'idle' | 'reading' | 'ready' | 'error';
  taidocTemperature: 'idle' | 'reading' | 'ready' | 'error';
}

export const useDevices = () => {
  const queryClient = useQueryClient();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [deviceStatus, setDeviceStatus] = useState<DeviceConnectionStatus>({
    patientMonitor: 'idle',
    bloodPressure: 'idle',
    taidocBloodMulti: 'idle',
    taidocTemperature: 'idle'
  });
  const [realTimeData, setRealTimeData] = useState<NHmsData | null>(null);

  // Helper function to check if emergency case is active
  const hasActiveEmergencyCase = () => {
    try {
      const storedCase = localStorage.getItem("currentEmergencyCase");
      return storedCase !== null;
    } catch (error) {
      console.error("Failed to check emergency case:", error);
      return false;
    }
  };

  // SignalR Connection Setup
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/notificationhub") // Updated to match API URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []);

  // SignalR Event Listeners
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('SignalR Connected');
          
          // Patient Monitor Data Events
          connection.on("PatientMonitorData", (data) => {
            try {
              // Documentation says: "Error messages are also sent using the same event so client code should discriminate between JSON and random string"
              const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
              setRealTimeData(parsedData);
              setDeviceStatus(prev => ({ ...prev, patientMonitor: 'connected' }));
            } catch (error) {
              // If parsing fails, it's probably an error message
              console.error('Patient Monitor Error:', data);
              toast.error(`Patient Monitor: ${data}`);
              setDeviceStatus(prev => ({ ...prev, patientMonitor: 'error' }));
            }
          });

          // Blood Pressure Data Events
          connection.on("BloodPressureData", (data) => {
            console.log('Blood Pressure Data received:', data);
            setDeviceStatus(prev => ({ ...prev, bloodPressure: 'ready' }));
            queryClient.invalidateQueries({ queryKey: ["devices", "bloodPressureData"] });
          });

          // Temperature Data Events
          connection.on("TemperatureData", (data) => {
            console.log('Temperature Data received:', data);
            setDeviceStatus(prev => ({ ...prev, taidocTemperature: 'ready' }));
          });

          // Blood Glucose Data Events
          connection.on("BGData", (data) => {
            console.log('Blood Glucose Data received:', data);
            setDeviceStatus(prev => ({ ...prev, taidocBloodMulti: 'ready' }));
          });

        })
        .catch(err => console.error('SignalR Connection Error:', err));
    }

    return () => {
      if (connection) {
        connection.off("PatientMonitorData");
        connection.off("BloodPressureData");
        connection.off("TemperatureData");
        connection.off("BGData");
      }
    };
  }, [connection, queryClient]);

  // Patient Monitor APIs
  const initPatientMonitor = useMutation({
    mutationFn: () => {
      // Check if emergency case is active before initializing
      if (!hasActiveEmergencyCase()) {
        throw new Error("Emergency case is required before connecting to Patient Monitor. Please create an emergency case first.");
      }
      return apiClient.api.devicesPatientMonitorInitList();
    },
    onMutate: () => {
      // Check emergency case before starting
      if (!hasActiveEmergencyCase()) {
        toast.error("Emergency case is required before connecting to Patient Monitor", { id: 'patient-monitor' });
        return;
      }
      setDeviceStatus(prev => ({ ...prev, patientMonitor: 'initializing' }));
      toast.loading("Initializing Patient Monitor...", { id: 'patient-monitor' });
    },
    onSuccess: () => {
      toast.success("Patient Monitor initialized successfully!", { id: 'patient-monitor' });
      // Status will be updated via SignalR events
    },
    onError: (error: any) => {
      setDeviceStatus(prev => ({ ...prev, patientMonitor: 'error' }));
      toast.error(`Failed to initialize Patient Monitor: ${error.message}`, { id: 'patient-monitor' });
    }
  });

  // Get Patient Monitor Data (sync call)
  const getPatientMonitorData = useQuery({
    queryKey: ["devices", "patientMonitorData"],
    queryFn: () => apiClient.api.devicesGetPatientMonitorDataList(),
    enabled: deviceStatus.patientMonitor === 'connected',
    refetchInterval: false, // We rely on SignalR for real-time data
    refetchOnWindowFocus: false,
  });

  // Blood Pressure Device APIs
  const getBloodPressureData = useMutation({
    mutationFn: () => apiClient.api.devicesBloodPressureGetDeviceDataList(),
    onMutate: () => {
      setDeviceStatus(prev => ({ ...prev, bloodPressure: 'reading' }));
      toast.loading("Reading Blood Pressure...", { id: 'blood-pressure' });
    },
    onSuccess: () => {
      toast.success("Blood Pressure data retrieved!", { id: 'blood-pressure' });
      queryClient.invalidateQueries({ queryKey: ["devices", "bloodPressureData"] });
    },
    onError: (error: any) => {
      setDeviceStatus(prev => ({ ...prev, bloodPressure: 'error' }));
      toast.error(`Blood Pressure Error: ${error.message}`, { id: 'blood-pressure' });
    }
  });

  const sendBloodPressureData = useMutation({
    mutationFn: () => apiClient.api.devicesBloodPressureSendDataList(),
    onSuccess: () => {
      toast.success("Blood pressure data sent to server!");
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
    onError: (error: any) => {
      toast.error(`Failed to send blood pressure data: ${error.message}`);
    }
  });

  // Taidoc Blood Multi Device APIs
  const getTaidocBloodMultiData = useMutation({
    mutationFn: () => apiClient.api.devicesTaidocBloodMultiGetDeviceDataList(),
    onMutate: () => {
      setDeviceStatus(prev => ({ ...prev, taidocBloodMulti: 'reading' }));
      toast.loading("Reading Taidoc Blood Multi data...", { id: 'taidoc-multi' });
    },
    onSuccess: () => {
      toast.success("Taidoc Blood Multi data retrieved!", { id: 'taidoc-multi' });
    },
    onError: (error: any) => {
      setDeviceStatus(prev => ({ ...prev, taidocBloodMulti: 'error' }));
      toast.error(`Taidoc Blood Multi Error: ${error.message}`, { id: 'taidoc-multi' });
    }
  });

  // Taidoc Temperature Device APIs
  const getTaidocTemperatureData = useMutation({
    mutationFn: () => apiClient.api.devicesTaidocTemperatureGetDeviceDataList(),
    onMutate: () => {
      setDeviceStatus(prev => ({ ...prev, taidocTemperature: 'reading' }));
      toast.loading("Reading temperature...", { id: 'temperature' });
    },
    onSuccess: () => {
      toast.success("Temperature data retrieved!", { id: 'temperature' });
    },
    onError: (error: any) => {
      setDeviceStatus(prev => ({ ...prev, taidocTemperature: 'error' }));
      toast.error(`Temperature Error: ${error.message}`, { id: 'temperature' });
    }
  });

  // Helper function to check if any device is connected/ready
  const hasActiveDevices = () => {
    return Object.values(deviceStatus).some(status => 
      status === 'connected' || status === 'ready'
    );
  };

  // Helper function to get device status color for UI
  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'ready':
        return 'text-green-600 bg-green-100';
      case 'initializing':
      case 'reading':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Helper function to get device status icon
  const getDeviceStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'ready':
        return '✅';
      case 'initializing':
      case 'reading':
        return '🔄';
      case 'error':
        return '❌';
      default:
        return '⚪';
    }
  };

  return {
    // Device Status
    deviceStatus,
    hasActiveDevices: hasActiveDevices(),
    getDeviceStatusColor,
    getDeviceStatusIcon,

    // Emergency Case Status
    hasActiveEmergencyCase: hasActiveEmergencyCase(),

    // Real-time Data
    realTimeData,
    signalRConnected: connection?.state === 'Connected',

    // Patient Monitor
    initPatientMonitor: initPatientMonitor.mutate,
    isInitializingPatientMonitor: initPatientMonitor.isPending,
    patientMonitorData: getPatientMonitorData.data,
    isPatientMonitorDataLoading: getPatientMonitorData.isLoading,
    patientMonitorConnected: deviceStatus.patientMonitor === 'connected',

    // Blood Pressure
    getBloodPressureData: getBloodPressureData.mutate,
    sendBloodPressureData: sendBloodPressureData.mutate,
    isReadingBloodPressure: getBloodPressureData.isPending,
    isSendingBloodPressureData: sendBloodPressureData.isPending,
    bloodPressureReady: deviceStatus.bloodPressure === 'ready',

    // Taidoc Blood Multi
    getTaidocBloodMultiData: getTaidocBloodMultiData.mutate,
    isReadingTaidocBloodMulti: getTaidocBloodMultiData.isPending,
    taidocBloodMultiReady: deviceStatus.taidocBloodMulti === 'ready',

    // Taidoc Temperature
    getTaidocTemperatureData: getTaidocTemperatureData.mutate,
    isReadingTemperature: getTaidocTemperatureData.isPending,
    temperatureReady: deviceStatus.taidocTemperature === 'ready',

    // Connection
    connection,
  };
};