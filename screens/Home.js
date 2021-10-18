import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Card from '../shared/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import EntryForm from './EntryForm';

const Home = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [entrys, setEntries] = useState([
        {
            key: '1',
            mood: 'Happy',
            activity: 'Talking with family',
            hungry: true,
            location: 'Dinner table',
            whoWith: 'Family',
            mealType: 'Dinner',
            foodItems: {
                name: 'Double Cheeseburger',
                weight: 300,
                cookingMethod: 'Fried',
            },
        },
    ]);

    const addEntry = (entry) => {
        entry.key = Math.random().toString();
        setEntries((prevEntries) => {
            return [entry, ...prevEntries];
        });
        setModalOpen(false);
    };

    return (
        <View style={globalStyles.container}>
            <Modal visible={modalOpen} animationType="slide">
                <View style={styles.modalContent}>
                    <MaterialIcons
                        name="close"
                        size={24}
                        onPress={() => setModalOpen(false)}
                        style={{
                            ...styles.modalToggle,
                            ...styles.modalClose,
                        }}
                    />
                    <EntryForm addEntry={addEntry} />
                </View>
            </Modal>

            <MaterialIcons
                name="add"
                size={24}
                onPress={() => setModalOpen(true)}
                style={styles.modalToggle}
            />

            <FlatList
                data={entrys}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('EntryDetails', item)
                            }
                        >
                            <Card>
                                <Text style={globalStyles.titleText}>
                                    {item.mealType}
                                </Text>
                                <Text style={globalStyles.smallText}>
                                    {item.foodItems.name}
                                </Text>
                            </Card>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    modalToggle: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },
});
