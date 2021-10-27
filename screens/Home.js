import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import Card from '../shared/Card';
import FlatButton from '../shared/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import { useFocusEffect } from '@react-navigation/core';
import EntryForm from './EntryForm';
import axios from 'axios';
import { API_KEY, BASE_URL } from '@env';

const Home = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState('');
    const [entrys, setEntries] = useState([]);

    // runs when screen comes into focus (not just on mount)
    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            console.log('effect running');
            axios
                .get(BASE_URL, { headers: { 'server-api-key': API_KEY } })
                .then((res) => {
                    const entriesWithKey = res.data.map((entry) => {
                        return { key: entry._id, ...entry };
                    });
                    if (isActive) {
                        setEntries(entriesWithKey);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            //cleanup function prevents updating state of unmounted component
            return () => {
                isActive = false;
            };
        }, [modalOpen, deleteModalOpen])
    );

    const deleteEntry = () => {
        console.log(selectedData);
        axios
            .delete(`${BASE_URL}/${selectedData}`, {
                headers: { 'server-api-key': API_KEY },
            })
            .then(() => {
                console.log('entry deleted');
            })
            .catch((err) => {
                console.log(err);
            });
        setDeleteModalOpen(false);
    };

    return (
        <View style={globalStyles.container}>
            <Modal visible={modalOpen} animationType="slide">
                <View style={globalStyles.modalContent}>
                    <MaterialIcons
                        name="close"
                        size={24}
                        onPress={() => setModalOpen(false)}
                        style={{
                            ...globalStyles.modalToggle,
                            ...globalStyles.modalClose,
                        }}
                    />
                    <EntryForm setModalOpen={setModalOpen} />
                </View>
            </Modal>

            <Modal
                visible={deleteModalOpen}
                animationType="none"
                transparent={true}
            >
                <View style={styles.deleteModalContainer}>
                    <View style={styles.deleteModalContent}>
                        <Text style={styles.deleteModalText}>
                            Are your sure you want to delete this entry?
                        </Text>
                        <View style={styles.deleteModalButtonContainer}>
                            <FlatButton
                                text="Cancel"
                                onPress={() => setDeleteModalOpen(false)}
                                backgroundColor="blue"
                            />
                            <FlatButton
                                text="Confirm"
                                onPress={deleteEntry}
                                backgroundColor="red"
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            <MaterialIcons
                name="add"
                size={24}
                onPress={() => setModalOpen(true)}
                style={globalStyles.modalToggle}
            />

            <FlatList
                data={entrys}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('EntryDetails', item._id)
                            }
                        >
                            <Card>
                                <View style={styles.cardContainer}>
                                    <View style={styles.textContainer}>
                                        <Text style={globalStyles.titleText}>
                                            {item.mealType}
                                        </Text>
                                        <Text style={globalStyles.smallText}>
                                            {item.foodItems.name}
                                        </Text>
                                    </View>
                                    <MaterialIcons
                                        name="delete"
                                        size={24}
                                        onPress={() => {
                                            setSelectedData(item._id);
                                            setDeleteModalOpen(true);
                                        }}
                                        style={styles.deleteIcon}
                                        color="#333"
                                    />
                                </View>
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
    deleteModalContainer: {
        backgroundColor: '#000000aa',
        flex: 1,
    },
    deleteModalContent: {
        backgroundColor: '#ffffff',
        marginHorizontal: 50,
        marginVertical: 200,
        padding: 40,
        borderRadius: 10,
        flex: 1,
    },
    deleteModalText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    deleteModalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 80,
    },
    deleteIcon: {
        alignSelf: 'center',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
});
