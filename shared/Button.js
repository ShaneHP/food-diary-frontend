import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const FlatButton = ({ text, onPress, backgroundColor }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{ ...styles.button, backgroundColor: backgroundColor }}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    },
});
