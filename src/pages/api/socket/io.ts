import { Server as ServerIO } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';

let io: ServerIO | null = null;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse & {
    socket: {
      server: any;
    };
  }
) {
  if (!io) {
    console.log('Initializing Socket.io server...');
    
    const httpServer = res.socket.server;

    io = new ServerIO(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: '*', // Allow all origins in development
        methods: ['GET', 'POST']
      },
      allowEIO3: true, // Enable v3 compatibility
      transports: ['websocket', 'polling'], // Enable both but prefer websocket
      pingTimeout: 60000,
      pingInterval: 25000
    });
    io.on('connection', (socket) => {
      console.log('Client connected');
      
      socket.on('create-room', (fileId) => {
        socket.join(fileId);
      });

      socket.on('send-changes', (deltas, fileId) => {
        socket.to(fileId).emit('receive-changes', deltas, fileId);
      });

      socket.on('send-cursor-move', (range, fileId, cursorId) => {
        socket.to(fileId).emit('receive-cursor-move', range, fileId, cursorId);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    // Patch for dev server upgrade handling
    if (process.env.NODE_ENV === 'development') {
      res.socket.server.io = io;
    }
  }
  
  res.end();
}