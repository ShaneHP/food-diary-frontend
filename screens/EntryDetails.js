import React, { useEffect, useState, useContext } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from 'react-native';
import Card from '../shared/Card';
import FlatButton from '../shared/Button';
import EntryForm from './EntryForm';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '@env';
import { AuthContext } from '../providers/AuthProvider';
import NutritionalInformation from '../components/NutritionalInformation';
import { ScrollView } from 'react-native-gesture-handler';
import AdditionalInformation from '../components/AdditionalInformation';

const EntryDetails = ({ route }) => {
    const id = route.params;

    const { user } = useContext(AuthContext);

    const [diaryEntry, setDiaryEntry] = useState({});
    const [formOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(null);

    useEffect(() => {
        let isActive = true;
        console.log(id);
        axios
            .get(`${BASE_URL}/entry/${id}`, {
                headers: { Authorization: `Bearer ${user.jwt}` },
            })
            .then((res) => {
                if (isActive) {
                    setDiaryEntry(res.data);
                    setDate(new Date(res.data.date));
                    setLoading(false);
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

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

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
            <View style={styles.inlineContainer}>
                <View>
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
                        {date && date.toDateString()}
                    </Text>
                    <Text style={{ fontSize: 18 }}>{diaryEntry.time}</Text>
                </View>
                <TouchableOpacity
                    style={{ justifyContent: 'center' }}
                    onPress={() => setFormOpen(true)}
                >
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Update
                    </Text>
                    <MaterialIcons
                        name="edit"
                        size={24}
                        onPress={() => setFormOpen(false)}
                        style={{ alignSelf: 'flex-end' }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Card customStyle={{ marginTop: 20 }}>
                    <View style={styles.inlineContainer}>
                        <View>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                {diaryEntry.mealType}
                            </Text>
                            <Text style={{ fontSize: 18 }}>
                                {diaryEntry.foodItems &&
                                    diaryEntry.foodItems.name}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 18 }}>
                                {diaryEntry.foodItems &&
                                    diaryEntry.foodItems.weight}
                                g
                            </Text>
                        </View>
                    </View>
                </Card>
                <NutritionalInformation
                    fat={
                        diaryEntry.foodItems &&
                        diaryEntry.foodItems.nutritionalValues.fat
                    }
                    saturates={
                        diaryEntry.foodItems &&
                        diaryEntry.foodItems.nutritionalValues.saturates
                    }
                    sugar={
                        diaryEntry.foodItems &&
                        diaryEntry.foodItems.nutritionalValues.sugar
                    }
                    salt={
                        diaryEntry.foodItems &&
                        diaryEntry.foodItems.nutritionalValues.salt
                    }
                />
                <AdditionalInformation
                    location={diaryEntry.location}
                    hungry={diaryEntry.hungry}
                    mood={diaryEntry.mood}
                    activity={diaryEntry.activity}
                    whoWith={diaryEntry.whoWith}
                    physicalFeeling={diaryEntry.physicalFeeling}
                />
            </ScrollView>
        </View>

        // <View style={globalStyles.container}>
        // <Modal visible={formOpen} animationType="slide">
        //     <View style={globalStyles.modalContent}>
        //         <MaterialIcons
        //             name="close"
        //             size={24}
        //             onPress={() => setFormOpen(false)}
        //             style={{
        //                 ...globalStyles.modalToggle,
        //                 ...globalStyles.modalClose,
        //             }}
        //         />
        //         <EntryForm
        //             setModalOpen={setFormOpen}
        //             initialValues={diaryEntry}
        //             isUpdate={true}
        //         />
        //     </View>
        // </Modal>
        //     <Card>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Date:</Text>{' '}
        //             {diaryEntry.date}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Time:</Text>{' '}
        //             {diaryEntry.time}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Meal Type:</Text>{' '}
        //             {diaryEntry.mealType}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Food Item: </Text>
        //             {diaryEntry.foodItems && diaryEntry.foodItems.name}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Weight(g): </Text>
        //             {diaryEntry.foodItems && diaryEntry.foodItems.weight}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Cooking Method: </Text>
        //             {diaryEntry.foodItems && diaryEntry.foodItems.cookingMethod}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Location: </Text>
        //             {diaryEntry.location}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Mood: </Text>
        //             {diaryEntry.mood}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Activity: </Text>
        //             {diaryEntry.activity}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>Were you hungry: </Text>
        //             {diaryEntry.hungry && diaryEntry.hungry.toString()}
        //         </Text>
        //         <Text>
        //             <Text style={globalStyles.boldText}>
        //                 Who were you with:
        //             </Text>{' '}
        //             {diaryEntry.whoWith}
        //         </Text>
        //     </Card>
        //     <FlatButton
        //         text="Update Entry"
        //         onPress={() => setFormOpen(true)}
        //         backgroundColor="blue"
        //         textColor="white"
        //     />
        // </View>
    );
};

export default EntryDetails;

const styles = StyleSheet.create({
    inlineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
