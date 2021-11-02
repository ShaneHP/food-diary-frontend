import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import EntryDetails from '../screens/EntryDetails';
import { AuthContext } from '../providers/AuthProvider';

const Stack = createStackNavigator();

const HomeStack = () => {
    const { logout } = useContext(AuthContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'blue',
                    height: 75,
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name="Home"
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    logout();
                                }}
                                style={{
                                    marginRight: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: 'white',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Logout
                                </Text>
                            </TouchableOpacity>
                        );
                    },
                }}
                component={Home}
            />
            <Stack.Screen
                name="EntryDetails"
                component={EntryDetails}
                options={{ title: 'Entry Details' }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
