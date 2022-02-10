import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../shared/Card';

const AdditionalInformation = ({
    location,
    hungry,
    mood,
    activity,
    whoWith,
    physicalFeeling,
}) => {
    return (
        <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                Additional Information
            </Text>
            <Card>
                <View style={styles.valueContainer}>
                    <Text style={styles.label}>Location</Text>
                    <Text style={styles.values}>{location}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.label}>Were you hungry?</Text>
                    <Text style={styles.values}>{hungry}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.label}>
                        How did you feel about your food choice?
                    </Text>
                    <Text style={styles.values}>{mood}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.label}>
                        What else were you doing while eating?
                    </Text>
                    <Text style={styles.values}>{activity}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.label}>Who were you with?</Text>
                    <Text style={styles.values}>{whoWith}</Text>
                </View>
                <View style={styles.valueContainer}>
                    <Text style={styles.label}>
                        How did you feel physically after eating?
                    </Text>
                    <Text style={styles.values}>{physicalFeeling}</Text>
                </View>
            </Card>
        </View>
    );
};

export default AdditionalInformation;

const styles = StyleSheet.create({
    valueContainer: {
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        color: '#5C5C5C',
    },
    values: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
