import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../styles/global';

const Home = ({ navigation }) => {
    const [reviews, setReviews] = useState([
        {
            title: 'Zelda, Breath of the Wild',
            rating: 5,
            body: 'lorem ipsum',
            key: '1',
        },
        {
            title: 'Batman: Arkham',
            rating: 8,
            body: 'lorem ipsum',
            key: '2',
        },
        { title: 'Far Cry 6', rating: 6, body: 'lorem ipsum', key: '3' },
    ]);

    return (
        <View style={globalStyles.container}>
            <FlatList
                data={reviews}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Reviews', item)}
                        >
                            <Text style={globalStyles.titleText}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({});
