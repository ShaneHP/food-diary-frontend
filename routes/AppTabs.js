import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeStack from './HomeStack';
import Profile from '../screens/Profile';

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = 'person-outline';
                    }

                    // You can return any component that you like here!
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                header: () => null,
            })}
        >
            <Tabs.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen name="Profile" component={Profile} />
        </Tabs.Navigator>
    );
};

export default AppTabs;
