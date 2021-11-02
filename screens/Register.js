import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Register = ({ navigation, route }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>route name: {route.name} </Text>
            <Button
                title="go to login"
                onPress={() => {
                    navigation.navigate('Login');
                }}
            />
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({});
