import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/api';
import * as signalR from '@microsoft/signalr';
import { API_URLS } from '@/constants';

// Global variables για singleton pattern
let globalHubConnection: signalR.HubConnection | null = null;
let isConnecting = false;

export const useDashboardData = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [batteryStatus, setBatteryStatus] = useState<string | null>('N/A');
  const [heartbeat, setHeartbeat] = useState<any>(null);
  const [hubConnectionStatus, setHubConnectionStatus] = useState('Disconnected');
  const isSubscribed = useRef(false);

  const { data: initData, error: initError } = useQuery({
    queryKey: ['dashboardInit'],
    queryFn: () => apiClient.api.mainInitList(),
  });

  const { data: batteryStatusData, error: batteryStatusError } = useQuery({
    queryKey: ['batteryStatus'],
    queryFn: () => apiClient.api.mainGetBatteryStatusList(),
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (batteryStatusData) {
      const percentage = (batteryStatusData.data as any)?.batteryPercentage;
      setBatteryStatus(percentage != null ? `${percentage}%` : 'N/A');
    }
  }, [batteryStatusData]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // SignalR effect - τρέχει μόνο μία φορά για όλο το app
  useEffect(() => {
    const initSignalR = async () => {
      // Δημιουργία σύνδεσης μόνο αν δεν υπάρχει
      if (!globalHubConnection && !isConnecting) {
        isConnecting = true;
        
        globalHubConnection = new signalR.HubConnectionBuilder()
          .withUrl(API_URLS.SIGNALR_HUB, {
            transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
            logMessageContent: true,
          })
          .configureLogging(signalR.LogLevel.Debug)
          .withAutomaticReconnect([0, 2000, 10000, 30000])
          .build();

        try {
          await globalHubConnection.start();
          setHubConnectionStatus('Connected');
        } catch {
          setHubConnectionStatus('Error');
        } finally {
          isConnecting = false;
        }
      }

      // Εγγραφή στα events μόνο μία φορά ανά component instance
      if (globalHubConnection && !isSubscribed.current) {
        isSubscribed.current = true;

        const batteryHandler = (data: any) => {
          setBatteryStatus(data !== null ? `${data}%` : 'N/A');
        };

        const heartbeatHandler = (data: any) => {
          setHeartbeat(data);
        };

        globalHubConnection.on('BatteryStatus', batteryHandler);
        globalHubConnection.on('HeartBeat', heartbeatHandler);

        // Cleanup function
        return () => {
          if (globalHubConnection) {
            globalHubConnection.off('BatteryStatus', batteryHandler);
            globalHubConnection.off('HeartBeat', heartbeatHandler);
          }
          isSubscribed.current = false;
        };
      }
    };

    initSignalR();
  }, []);

  return {
    currentTime,
    batteryStatus,
    heartbeat,
    hubConnectionStatus,
    initData,
    initError,
    batteryStatusError,
  };
};