import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
} from 'react-native';
import Card from '../shared/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';
import EntryForm from './EntryForm';
import axios from 'axios';

const Home = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [entrys, setEntries] = useState([]);

    const baseURL = 'http://10.0.2.2:3000/entry';

    useEffect(() => {
        axios.get(baseURL).then((res) => {
            res.data.key = res.data._id;
            setEntries(res.data);
        });
    }, [modalOpen]);

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
                    <EntryForm setModalOpen={setModalOpen} />
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
        borderRadius: 24,
        alignSelf: 'center',
        backgroundColor: 'blue',
        color: 'white',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },
});
