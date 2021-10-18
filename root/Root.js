import React from 'react';
import About from '../screens/About';
import Home from '../screens/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Root = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    );
};

export default Root;
