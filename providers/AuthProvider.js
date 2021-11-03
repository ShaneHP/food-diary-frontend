import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from '@env';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const register = async (email, password) => {
        console.log('registering with email and password', email, password);

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({ email, password }),
            url: `${BASE_URL}/signup`,
        };

        axios(options)
            .then((res) => {
                if (res.data.errors) {
                    console.log(data.errors);
                } else {
                    console.log(res.data);
                    AsyncStorage.setItem('jwt', res.data);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

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
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
