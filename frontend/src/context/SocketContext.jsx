import { createContext } from 'react';
import { socket } from '../socket';

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext(socket);

export function SocketProvider({ children }) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
