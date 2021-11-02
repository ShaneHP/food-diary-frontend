import React, { useEffect, useState, useContext } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../providers/AuthProvider';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const getFonts = () => {
    return Font.loadAsync({
        'nunito-regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('../assets/fonts/Nunito-Bold.ttf'),
    });
};

export default function Routes() {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [fontsLoading, setFontsLoading] = useState(true);

    useEffect(() => {
        // check if user is logged in
        AsyncStorage.getItem('user')
            .then((userString) => {
                if (userString) {
                    const parsedUser = JSON.parse(userString);
                    setUser(parsedUser);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (fontsLoading) {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoading(false)}
                onError={() => console.log('error')}
            />
        );
    }

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}
