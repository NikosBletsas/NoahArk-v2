import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api';
import * as signalR from '@microsoft/signalr';
import { API_URLS } from '../../constants';

export const useDashboardData = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [batteryStatus, setBatteryStatus] = useState<string | null>('N/A');
  const [heartbeat, setHeartbeat] = useState<any>(null);
  const [hubConnectionStatus, setHubConnectionStatus] = useState('Disconnected');

  const { data: initData, error: initError } = useQuery({
    queryKey: ['dashboardInit'],
    queryFn: () => apiClient.api.mainInitList(),
  });

  const { data: batteryStatusData, error: batteryStatusError } = useQuery({
    queryKey: ['batteryStatus'],
    queryFn: () => apiClient.api.mainGetBatteryStatusList(),
    refetchInterval: 30000, // Refetch every 30 seconds
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

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(API_URLS.SIGNALR_HUB, {
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
        logMessageContent: true,
      })
      .configureLogging(signalR.LogLevel.Debug)
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();

    hubConnection.on('BatteryStatus', (data) => {
      setBatteryStatus(data !== null ? `${data}%` : 'N/A');
    });

    hubConnection.on('HeartBeat', (data) => {
      setHeartbeat(data);
    });

    hubConnection
      .start()
      .then(() => {
        setHubConnectionStatus('Connected');
      })
      .catch(() => {
        setHubConnectionStatus('Error');
      });

    return () => {
      hubConnection?.stop();
    };
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
