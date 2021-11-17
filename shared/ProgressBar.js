import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProgressBar = ({ bgcolor, completed, step, totalSteps }) => {
    return (
        <View>
            <Text>
                Step {step} of {totalSteps}
            </Text>
            <View style={styles.containerStyles}>
                <View
                    style={{
                        ...styles.fillerStyles,
                        width: `${completed}%`,
                        backgroundColor: bgcolor,
                    }}
                ></View>
            </View>
        </View>
    );
};

export default ProgressBar;

const styles = StyleSheet.create({
    containerStyles: {
        height: 10,
        width: '100%',
        backgroundColor: '#CDCDCD',
        borderRadius: 10,
        marginTop: 5,
    },
    fillerStyles: {
        height: '100%',
        borderRadius: 10,
    },
});
