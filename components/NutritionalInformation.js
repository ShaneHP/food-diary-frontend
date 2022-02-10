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
                <View style={styles.nutrientContainer}>
                    <Text style={styles.header}>Nutrient{'\n'}Name</Text>
                    <Text style={{ ...styles.header, ...styles.middle }}>
                        Actual{'\n'}Value
                    </Text>
                    <Text style={{ ...styles.header, ...styles.middle }}>
                        Your{'\n'}Guess
                    </Text>
                    <View style={styles.nutrient}>
                        <Text style={styles.label}>Fat</Text>
                        <Text style={styles.values}>{fat.weight}g</Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={fat.trafficLight.actual.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + fat.trafficLight.actual.value}
                        </Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={fat.trafficLight.guess.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + fat.trafficLight.guess.value}
                        </Text>
                    </View>
                    <View style={styles.nutrient}>
                        <Text style={styles.label}>Saturates</Text>
                        <Text style={styles.values}>{saturates.weight}g</Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={saturates.trafficLight.actual.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + saturates.trafficLight.actual.value}
                        </Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={saturates.trafficLight.guess.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + saturates.trafficLight.guess.value}
                        </Text>
                    </View>
                    <View style={styles.nutrient}>
                        <Text style={styles.label}>Sugar</Text>
                        <Text style={styles.values}>{sugar.weight}g</Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={sugar.trafficLight.actual.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + sugar.trafficLight.actual.value}
                        </Text>
                    </View>
                    <View style={styles.trafficLightContainer}>
                        <MaterialIcons
                            name="circle"
                            color={sugar.trafficLight.guess.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + sugar.trafficLight.guess.value}
                        </Text>
                    </View>
                    <View style={{ ...styles.nutrient, ...styles.last }}>
                        <Text style={styles.label}>Salt</Text>
                        <Text style={styles.values}>{salt.weight}g</Text>
                    </View>
                    <View
                        style={{
                            ...styles.trafficLightContainer,
                            ...styles.last,
                        }}
                    >
                        <MaterialIcons
                            name="circle"
                            color={salt.trafficLight.actual.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + salt.trafficLight.actual.value}
                        </Text>
                    </View>
                    <View
                        style={{
                            ...styles.trafficLightContainer,
                            ...styles.last,
                        }}
                    >
                        <MaterialIcons
                            name="circle"
                            color={salt.trafficLight.guess.color}
                            size={28}
                        />
                        <Text style={styles.values}>
                            {' ' + salt.trafficLight.guess.value}
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
        width: '33%',
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        color: '#5C5C5C',
    },
    values: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    nutrientContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    nutrient: {
        width: '33%',
        marginTop: 20,
    },
    header: {
        width: '33%',
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    middle: {
        textAlign: 'center',
    },
    first: {
        marginTop: 10,
    },
    last: {
        marginBottom: 10,
    },
});
