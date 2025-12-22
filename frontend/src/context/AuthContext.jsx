import React, { createContext } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
export const authDataContext = createContext(null);

function AuthContext({ children }) {
    const serverUrl = 'https://linkedin-backend-3b3o.onrender.com';
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
