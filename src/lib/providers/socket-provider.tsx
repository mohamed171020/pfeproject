'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log('error hereererer');
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin,
      {
        path: '/api/socket/io',
        transports: ['websocket', 'polling'], // Match server configuration
        withCredentials: true,
        extraHeaders: {
          'my-custom-header': 'abcd'
        },
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: true, // Set to true
        forceNew: true, // Force new connection
        upgrade: true,
        rememberUpgrade: true,
        query: {
          EIO: '4' // Force Engine.IO v4
        }
      }
    );
    console.log('error hereererer11111');
    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);
    console.log('error hereererer22222');
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};