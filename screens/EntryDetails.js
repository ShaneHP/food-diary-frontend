import React from 'react';
import { Text, View } from 'react-native';
import Card from '../shared/Card';
import { globalStyles } from '../styles/global';

const EntryDetails = ({ route }) => {
    const diaryEntry = route.params;

    return (
        <View style={globalStyles.container}>
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
                    {diaryEntry.foodItems.name}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Weight(g): </Text>
                    {diaryEntry.foodItems.weight}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>Cooking Method: </Text>
                    {diaryEntry.foodItems.cookingMethod}
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
                    {diaryEntry.hungry.toString()}
                </Text>
                <Text>
                    <Text style={globalStyles.boldText}>
                        Who were you with:
                    </Text>{' '}
                    {diaryEntry.whoWith}
                </Text>
            </Card>
        </View>
    );
};

export default EntryDetails;
