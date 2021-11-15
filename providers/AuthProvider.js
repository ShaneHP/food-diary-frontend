import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import qs from 'qs';
import { BASE_URL } from '@env';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const getUserData = (jwt) => {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            url: `${BASE_URL}/checkUser`,
        };

        axios(options)
            .then((res) => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                } else {
                    res.data.jwt = jwt;
                    setUser(res.data);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const register = async (email, password) => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({ email, password }),
            url: `${BASE_URL}/signup`,
        };

        try {
            const res = await axios(options);
            await SecureStore.setItemAsync('jwt', res.data);
            getUserData(res.data);
        } catch (err) {
            return err.response.data;
        }
    };

    const login = async (email, password) => {
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({ email, password }),
            url: `${BASE_URL}/login`,
        };

        try {
            const res = await axios(options);
            await SecureStore.setItemAsync('jwt', res.data);
            getUserData(res.data);
        } catch (err) {
            return err.response.data;
        }
    };

    const logout = () => {
        setUser(null);
        SecureStore.deleteItemAsync('jwt');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                register,
                getUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
