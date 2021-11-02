import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        const fakeUser = { email, password };
        setUser(fakeUser);
        AsyncStorage.setItem('user', JSON.stringify(fakeUser));
    };

    const logout = () => {
        setUser(null);
        AsyncStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
