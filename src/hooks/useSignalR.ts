// src/hooks/useSignalR.ts

import { useState, useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

const useSignalR = (hubUrl: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [connectionState, setConnectionState] = useState<string>('Disconnected');
  const hubUrlRef = useRef(hubUrl);

  useEffect(() => {
    hubUrlRef.current = hubUrl;
  }, [hubUrl]);

  useEffect(() => {
    if (!connection) {
      connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrlRef.current)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }

    const startConnection = async () => {
      if (connection?.state === signalR.HubConnectionState.Disconnected) {
        try {
          setConnectionState('Connecting...');
          await connection.start();
          setConnectionState('Connected');
          console.log('SignalR Connected.');
        } catch (err) {
          console.error('SignalR Connection Error: ', err);
          setConnectionState('Disconnected');
        }
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

    connection.on('ReceiveMessage', onReceiveMessage);
    connection.onclose(onConnectionClose);

    return () => {
      connection?.off('ReceiveMessage', onReceiveMessage);
      connection?.off('close', onConnectionClose);
    };
  }, []);

  return { connection, messages, connectionState };
};

export default useSignalR;
