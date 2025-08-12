---
id: usedashboarddata
title: useDashboardData Hook
---

The `useDashboardData` hook is responsible for fetching and managing the data displayed on the dashboard, including real-time updates via SignalR.

### Structure

- **State Variables**:
  - `currentTime`: The current system time.
  - `batteryStatus`: The battery status of the device.
  - `heartbeat`: The heartbeat data from the device.
  - `hubConnectionStatus`: The status of the SignalR hub connection.
- **Queries**:
  - `dashboardInit`: A query that fetches the initial dashboard data.
  - `batteryStatus`: A query that fetches the battery status every 30 seconds.
- **Effects**:
  - An effect that updates the current time every second.
  - An effect that establishes a connection to the SignalR hub and sets up listeners for `BatteryStatus` and `HeartBeat` events.

### Functionality

- **`currentTime`**: A string that represents the current system time, updated every second.
- **`batteryStatus`**: A string that represents the battery status of the device, updated every 30 seconds and in real-time via SignalR.
- **`heartbeat`**: A string that represents the heartbeat data from the device, updated in real-time via SignalR.
- **`hubConnectionStatus`**: A string that represents the status of the SignalR hub connection.
- **`initData`**: The initial data for the dashboard.
- **`initError`**: Any error that occurred while fetching the initial dashboard data.
- **`batteryStatusError`**: Any error that occurred while fetching the battery status.

### Code

```typescript
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
