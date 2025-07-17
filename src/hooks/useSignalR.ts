// src/hooks/useSignalR.ts

import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

const useSignalR = (hubUrl: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [connectionState, setConnectionState] = useState<string>('Disconnected');

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    setConnection(newConnection);

    const startConnection = async () => {
      try {
        setConnectionState('Connecting...');
        await newConnection.start();
        setConnectionState('Connected');
        console.log('SignalR Connected.');
      } catch (err) {
        console.error('SignalR Connection Error: ', err);
        setConnectionState('Disconnected');
      }
    };

    startConnection();

    newConnection.on('ReceiveMessage', (user, message) => {
      setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
    });

    newConnection.onclose(() => {
      setConnectionState('Disconnected');
      setMessages(prevMessages => [...prevMessages, 'Connection closed.']);
    });

    return () => {
      if (connection) {
        connection.off('ReceiveMessage');
        connection.stop();
      }
    };
  }, [hubUrl]);
  

  return { connection, messages, connectionState };
};

export default useSignalR;
