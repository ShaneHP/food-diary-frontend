import React, { useEffect, useState } from 'react';
import { Text, View, Modal } from 'react-native';
import Card from '../shared/Card';
import FlatButton from '../shared/Button';
import EntryForm from './EntryForm';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_KEY, BASE_URL } from '@env';

const EntryDetails = ({ route }) => {
    const id = route.params;

    const [diaryEntry, setDiaryEntry] = useState({});
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        let isActive = true;
        axios
            .get(`${BASE_URL}/${id}`, {
                headers: { 'server-api-key': API_KEY },
            })
            .then((res) => {
                if (isActive) {
                    setDiaryEntry(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        //cleanup function prevents updating state of unmounted component
        return () => {
            isActive = false;
        };
    }, [formOpen]);

    return (
        <View style={globalStyles.container}>
            <Modal visible={formOpen} animationType="slide">
                <View style={globalStyles.modalContent}>
                    <MaterialIcons
                        name="close"
                        size={24}
                        onPress={() => setFormOpen(false)}
                        style={{
                            ...globalStyles.modalToggle,
                            ...globalStyles.modalClose,
                        }}
                    />
                    <EntryForm
                        setModalOpen={setFormOpen}
                        initialValues={diaryEntry}
                        isUpdate={true}
                    />
                </View>
            </Modal>
            <Card>
                <Text>
                    <Text style={globalStyles.boldText}>Date:</Text>{' '}
                    {diaryEntry.date}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Time:</Text>{' '}
                    {diaryEntry.time}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Meal Type:</Text>{' '}
                    {diaryEntry.mealType}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Food Item: </Text>
                    {diaryEntry.foodItems && diaryEntry.foodItems.name}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Weight(g): </Text>
                    {diaryEntry.foodItems && diaryEntry.foodItems.weight}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Cooking Method: </Text>
                    {diaryEntry.foodItems && diaryEntry.foodItems.cookingMethod}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Location: </Text>
                    {diaryEntry.location}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Mood: </Text>
                    {diaryEntry.mood}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Activity: </Text>
                    {diaryEntry.activity}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Were you hungry: </Text>
                    {diaryEntry.hungry && diaryEntry.hungry.toString()}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>
                        Who were you with:
                    </Text>{' '}
                    {diaryEntry.whoWith}
                </Text>
            </Card>
            <FlatButton
                text="Update Entry"
                onPress={() => setFormOpen(true)}
                backgroundColor="blue"
            />
        </View>
    );
};

export default EntryDetails;
