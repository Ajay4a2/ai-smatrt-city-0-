import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [realTimeData, setRealTimeData] = useState({
    operations: [],
    traffic: [],
    alerts: [],
    metrics: {},
    iotDevices: []
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false);
    });

    newSocket.on('operations_update', (data) => {
      setRealTimeData(prev => ({ 
        ...prev, 
        operations: data,
        lastUpdate: new Date().toISOString()
      }));
    });

    newSocket.on('traffic_update', (data) => {
      setRealTimeData(prev => ({ 
        ...prev, 
        traffic: data 
      }));
    });

    newSocket.on('alerts_update', (data) => {
      setRealTimeData(prev => ({ 
        ...prev, 
        alerts: data 
      }));
    });

    newSocket.on('metrics_update', (data) => {
      setRealTimeData(prev => ({ 
        ...prev, 
        metrics: data 
      }));
    });

    newSocket.on('iot_devices_update', (data) => {
      setRealTimeData(prev => ({ 
        ...prev, 
        iotDevices: data 
      }));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const value = {
    socket,
    realTimeData,
    isConnected,
    sendMessage: (event, data) => {
      if (socket) {
        socket.emit(event, data);
      }
    }
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
