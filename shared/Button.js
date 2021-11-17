import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const FlatButton = ({ text, onPress, backgroundColor, style, textColor }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    ...styles.button,
                    backgroundColor: backgroundColor,
                    ...style,
                }}
            >
                <Text style={{ ...styles.buttonText, color: textColor }}>
                    {text}
                </Text>
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
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
    },
});
