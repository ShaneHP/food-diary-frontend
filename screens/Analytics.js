import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLegend } from 'victory-native';
import { AuthContext } from '../providers/AuthProvider';
import Card from '../shared/Card';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useFocusEffect } from '@react-navigation/core';

const Analytics = () => {
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [hungryData, setHungryData] = useState({});

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            axios
                .get(`${BASE_URL}/analytics/hungry`, {
                    headers: { Authorization: `Bearer ${user.jwt}` },
                    params: { userId: user._id },
                })
                .then((res) => {
                    if (isActive) {
                        setHungryData(res.data);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            return () => {
                isActive = false;
            };
        }, [])
    );

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
        <ScrollView style={{ flex: 1, marginTop: 40 }}>
            <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    Weekly Analytics
                </Text>
            </View>
            <Card customStyle={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Eating when you were hungry vs. not hungry
                </Text>
                {hungryData.hungry <= 0 || hungryData.notHungry <= 0 ? (
                    <View style={{ marginVertical: 20 }}>
                        <Text>You need to make at least one entry today</Text>
                    </View>
                ) : (
                    <>
                        <VictoryLegend
                            height={100}
                            x={20}
                            y={30}
                            colorScale={['cyan', 'tomato']}
                            data={[{ name: 'Hungry' }, { name: 'Not hungry' }]}
                            style={{
                                labels: {
                                    fontSize: 18,
                                },
                            }}
                        />
                        <VictoryPie
                            width={300}
                            height={280}
                            data={[
                                { x: hungryData.hungry, y: hungryData.hungry },
                                {
                                    x: hungryData.notHungry,
                                    y: hungryData.notHungry,
                                },
                            ]}
                            colorScale={['cyan', 'tomato']}
                            innerRadius={60}
                            theme={VictoryTheme.material}
                            style={{
                                labels: {
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </>
                )}
            </Card>
        </ScrollView>
    );
};

export default Analytics;
