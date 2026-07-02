import React, { createContext } from 'react';
import { apiBaseUrl } from '../config.js';
// eslint-disable-next-line react-refresh/only-export-components
export const authDataContext = createContext(null);

function AuthContext({ children }) {
    const serverUrl = apiBaseUrl;
    let value = { serverUrl };

    return (
        <div>
            <authDataContext.Provider value={value}>
                {children}
            </authDataContext.Provider>
        </div>
    );
}

export default AuthContext;
