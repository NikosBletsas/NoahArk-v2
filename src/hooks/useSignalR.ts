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

    const onReceiveMessage = (user: string, message: string) => {
      setMessages(prevMessages => [...prevMessages, `${user}: ${message}`]);
    };

    const onConnectionClose = (error?: Error) => {
      setConnectionState('Disconnected');
      setMessages(prevMessages => [...prevMessages, `Connection closed: ${error ? error.message : 'No error'}`]);
    };

    startConnection();

    newConnection.on('ReceiveMessage', onReceiveMessage);
    newConnection.onclose(onConnectionClose);

    return () => {
      newConnection.off('ReceiveMessage', onReceiveMessage);
      newConnection.off('close', onConnectionClose);
      if (newConnection.state === signalR.HubConnectionState.Connected) {
        newConnection.stop();
      }
    };
  }, [hubUrl]);
  

  return { connection, messages, connectionState };
};

export default useSignalR;
