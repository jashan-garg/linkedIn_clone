import { io } from 'socket.io-client';

export const socket = io('https://linkedin-backend-3b3o.onrender.com', {
    withCredentials: true,
    autoConnect: true,
});
