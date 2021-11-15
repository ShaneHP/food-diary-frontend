import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => null,
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    header: () => null,
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
