import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeStack from './HomeStack';
import Analytics from '../screens/Analytics';

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'HomeStack') {
                        iconName = 'home-outline';
                    } else if (route.name === 'Analytics') {
                        iconName = 'bar-chart-outline';
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
            <Tabs.Screen name="Analytics" component={Analytics} />
        </Tabs.Navigator>
    );
};

export default AppTabs;
