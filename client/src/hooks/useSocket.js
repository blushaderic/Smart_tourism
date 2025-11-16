import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useSocket = (roomId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    socketRef.current = io(API_URL, {
      auth: { token },
    });

    if (roomId) {
      socketRef.current.emit('join-room', roomId);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  const emit = (event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  };

  const off = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  };

  return { emit, on, off, socket: socketRef.current };
};

