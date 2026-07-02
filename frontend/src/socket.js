import { io } from 'socket.io-client';
import { socketBaseUrl } from './config.js';

export const socket = io(socketBaseUrl, {
    withCredentials: true,
    autoConnect: true,
});
