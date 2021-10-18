import React, { useState } from 'react';
import Home from './screens/Home';
import Root from './root/Root';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ReviewDetails from './screens/ReviewDetails';

const Stack = createStackNavigator();

const getFonts = () => {
    return Font.loadAsync({
        'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
        'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    });
};

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    if (fontsLoaded) {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#ddd',
                            height: 60,
                        },
                        headerTintColor: '#444',
                    }}
                >
                    <Stack.Screen
                        name="Root"
                        component={Root}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Reviews" component={ReviewDetails} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={() => console.log('error')}
            />
        );
    }
}
