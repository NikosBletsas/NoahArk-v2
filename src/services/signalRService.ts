import * as signalR from "@microsoft/signalr";
import { API_URLS } from "@/constants";

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private isConnecting = false;
  private listeners: Map<string, Set<(data: any) => void>> = new Map();

  async connect(): Promise<signalR.HubConnection> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      return this.connection;
    }

    if (this.isConnecting) {
      // Wait for existing connection attempt
      return new Promise((resolve, reject) => {
        const checkConnection = () => {
          if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
            resolve(this.connection);
          } else if (!this.isConnecting) {
            reject(new Error("Connection failed"));
          } else {
            setTimeout(checkConnection, 100);
          }
        };
        checkConnection();
      });
    }

    this.isConnecting = true;

    try {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(API_URLS.SIGNALR_HUB, {
          transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
          logMessageContent: true,
        })
        .configureLogging(signalR.LogLevel.Debug)
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .build();

      // Set up event handlers
      this.connection.on("BatteryStatus", (data) => {
        this.notifyListeners("BatteryStatus", data);
      });

      this.connection.on("HeartBeat", (data) => {
        this.notifyListeners("HeartBeat", data);
      });

      await this.connection.start();
      console.log("SignalR connected successfully");
      
      return this.connection;
    } catch (error) {
      console.error("SignalR connection failed:", error);
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  addListener(event: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private notifyListeners(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  getConnectionState(): string {
    if (!this.connection) return "Disconnected";
    
    switch (this.connection.state) {
      case signalR.HubConnectionState.Connected:
        return "Connected";
      case signalR.HubConnectionState.Connecting:
        return "Connecting";
      case signalR.HubConnectionState.Reconnecting:
        return "Reconnecting";
      case signalR.HubConnectionState.Disconnected:
        return "Disconnected";
      case signalR.HubConnectionState.Disconnecting:
        return "Disconnecting";
      default:
        return "Unknown";
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
    this.listeners.clear();
  }
}

// Singleton instance
export const signalRService = new SignalRService();