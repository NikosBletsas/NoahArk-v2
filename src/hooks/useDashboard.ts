// useDashboard.ts
import { useState, useEffect } from "react";
import { useMain } from "@/hooks/useMain";
import { useDevices } from "@/hooks/useDevices";
import { useConfig } from "@/hooks/useConfig";
import { signalRService } from "@/services/signalRService";

export const useDashboard = () => {
  // Time and SignalR state
  const [currentTime, setCurrentTime] = useState<string>("");
  const [batteryStatus, setBatteryStatus] = useState<string>("N/A");
  const [heartbeat, setHeartbeat] = useState<any>(null);
  const [hubConnectionStatus, setHubConnectionStatus] =
    useState<string>("Disconnected");

  // Import from existing hooks
  const mainHook = useMain();
  const devicesHook = useDevices();
  const configHook = useConfig();

  // Initialize app on mount
  useEffect(() => {
    mainHook.initApp();
  }, [mainHook.initApp]);

  // Battery status from polling
  useEffect(() => {
    if (mainHook.batteryStatus) {
      const percentage = (mainHook.batteryStatus as any)?.batteryPercentage;
      setBatteryStatus(percentage != null ? `${percentage}%` : "N/A");
    }
  }, [mainHook.batteryStatus]);

  // Current time updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // SignalR connection setup using singleton service
  useEffect(() => {
    let batteryUnsubscribe: (() => void) | null = null;
    let heartbeatUnsubscribe: (() => void) | null = null;

    const initializeConnection = async () => {
      try {
        // Connect using singleton service (won't create duplicate connections)
        await signalRService.connect();

        // Set up listeners
        batteryUnsubscribe = signalRService.addListener(
          "BatteryStatus",
          (data) => {
            setBatteryStatus(data !== null ? `${data}%` : "N/A");
          }
        );

        heartbeatUnsubscribe = signalRService.addListener(
          "HeartBeat",
          (data) => {
            setHeartbeat(data);
          }
        );

        // Update connection status
        setHubConnectionStatus(signalRService.getConnectionState());

        // Poll connection status periodically
        const statusInterval = setInterval(() => {
          setHubConnectionStatus(signalRService.getConnectionState());
        }, 1000);

        return () => clearInterval(statusInterval);
      } catch (error) {
        console.error("SignalR connection failed:", error);
        setHubConnectionStatus("Error");
      }
    };

    const cleanup = initializeConnection();

    // Cleanup function
    return () => {
      batteryUnsubscribe?.();
      heartbeatUnsubscribe?.();
      cleanup?.then((clearInterval) => clearInterval?.());
    };
  }, []);

  // Dashboard-specific actions
  const dashboardActions = {
    // Document scanning
    scanDocument: mainHook.scanDocument,
    isScanning: mainHook.isScanning,

    // Data sending
    sendDataToDoctor: mainHook.sendData,
    isSendingData: mainHook.isSending,

    // Case management
    resetCase: mainHook.resetCase,
    isResettingCase: mainHook.isResetting,

    // Device management
    initializeDevices: devicesHook.initPatientMonitor,
    isInitializingDevices: devicesHook.isPatientMonitorLoading,

    // Battery refresh - polling fallback if SignalR fails
    refreshBatteryStatus: mainHook.refreshBatteryStatus,
  };

  // Status information
  const statusInfo = {
    currentTime,
    heartbeat,
    hubConnectionStatus,
    // Use local batteryStatus state that gets updated from both sources
    batteryStatus,
    batteryError:
      !mainHook.isBatteryLoading &&
      !mainHook.batteryStatus &&
      batteryStatus === "N/A",
    patientId: "N/A", // Replace with actual patient ID when available
    caseNo: "1", // Replace with actual case number
    videoStatus: "N/A", // Replace with actual video status
  };

  // Loading states
  const loadingStates = {
    isAppInitializing: mainHook.isAppLoading,
    isBatteryLoading: mainHook.isBatteryLoading,
    isDevicesLoading: devicesHook.isPatientMonitorLoading,
    isConfigLoading: configHook.isLoading,

    // Any action loading
    hasActiveOperations:
      mainHook.isScanning ||
      mainHook.isSending ||
      mainHook.isResetting ||
      devicesHook.isPatientMonitorLoading,
  };

  return {
    // Status information
    ...statusInfo,

    // Actions
    ...dashboardActions,

    // Loading states
    ...loadingStates,

    // Raw hook data (if needed for specific use cases)
    rawData: {
      mainHook,
      devicesHook,
      configHook,
    },
  };
};
