import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Card from '../shared/Card';
import { MaterialIcons } from '@expo/vector-icons';

const NutritionalInformation = ({ fat, saturates, sugar, salt }) => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                Nutritional Information
            </Text>
            <Card>
                <View style={styles.inlineContainer}>
                    <View>
                        <Text style={styles.label}>Fat</Text>
                        <Text style={styles.values}>{fat.weight}g</Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={fat.trafficLight.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + fat.trafficLight.value}
                        </Text>
                    </View>
                </View>
                <View style={styles.inlineContainer}>
                    <View>
                        <Text style={styles.label}>Saturates</Text>
                        <Text style={styles.values}>{saturates.weight}g</Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={saturates.trafficLight.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + saturates.trafficLight.value}
                        </Text>
                    </View>
                </View>
                <View style={styles.inlineContainer}>
                    <View>
                        <Text style={styles.label}>Sugar</Text>
                        <Text style={styles.values}>{sugar.weight}g</Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={sugar.trafficLight.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + sugar.trafficLight.value}
                        </Text>
                    </View>
                </View>
                <View style={styles.inlineContainer}>
                    <View>
                        <Text style={styles.label}>Salt</Text>
                        <Text style={styles.values}>{salt.weight}g</Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={salt.trafficLight.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + salt.trafficLight.value}
                        </Text>
                    </View>
                </View>
            </Card>
        </View>
    );
};

export default NutritionalInformation;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    inlineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    trafficLightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '40%',
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
