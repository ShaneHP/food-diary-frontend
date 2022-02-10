import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLegend } from 'victory-native';
import { AuthContext } from '../providers/AuthProvider';
import Card from '../shared/Card';
import DailyRecommendedChart from '../components/DailyRecommendedChart';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useFocusEffect } from '@react-navigation/core';

const Analytics = () => {
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [hungryData, setHungryData] = useState({});
    const [dailyNutrients, setDailyNutrients] = useState({});

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            setLoading(true);

            async function fetchData() {
                const urls = [
                    `${BASE_URL}/analytics/hungry?userId=${user._id}`,
                    `${BASE_URL}/analytics/dailyNutrients?userId=${user._id}`,
                ];

                const headers = { Authorization: `Bearer ${user.jwt}` };

                try {
                    const [hungryRes, dailyNutrientsRes] = await Promise.all(
                        urls.map((url) => {
                            return axios.get(url, {
                                headers,
                            });
                        })
                    );
                    console.log(dailyNutrientsRes.data);
                    if (isActive) {
                        setHungryData(hungryRes.data);
                        setDailyNutrients(dailyNutrientsRes.data);
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }
            }

            fetchData();

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
            <View style={{ marginLeft: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    Weekly Analytics
                </Text>
            </View>
            <Card customStyle={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Eating when you were hungry vs. not hungry
                </Text>
                {hungryData.hungry > 0 || hungryData.notHungry > 0 ? (
                    <>
                        <VictoryLegend
                            height={100}
                            x={20}
                            y={30}
                            colorScale={['#54D049', 'tomato']}
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
                            colorScale={['#54D049', 'tomato']}
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
                ) : (
                    <View style={{ marginVertical: 20 }}>
                        <Text>You need to make at least one entry today</Text>
                    </View>
                )}
            </Card>
            <View style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    Daily Analytics
                </Text>
            </View>
            <Card customStyle={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Daily recommended intake vs. your intake
                </Text>
                {dailyNutrients.totalNutrients ? (
                    <DailyRecommendedChart dailyNutrients={dailyNutrients} />
                ) : (
                    <View style={{ marginVertical: 20 }}>
                        <Text>You need to make at least one entry today</Text>
                    </View>
                )}
            </Card>
        </ScrollView>
    );
};

export default Analytics;
