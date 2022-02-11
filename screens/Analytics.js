import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLegend } from 'victory-native';
import { AuthContext } from '../providers/AuthProvider';
import Card from '../shared/Card';
import DailyRecommendedChart from '../components/DailyRecommendedChart';
import TrafficBarChart from '../components/TrafficBarChart';
import axios from 'axios';
import { BASE_URL } from '@env';
import { useFocusEffect } from '@react-navigation/core';

const Analytics = () => {
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [hungryData, setHungryData] = useState({});
    const [fatTraffic, setFatTraffic] = useState({});
    const [saturatesTraffic, setSaturatesTraffic] = useState({});
    const [sugarTraffic, setSugarTraffic] = useState({});
    const [saltTraffic, setSaltTraffic] = useState({});
    const [dailyNutrients, setDailyNutrients] = useState({});

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
            setLoading(true);

            async function fetchData() {
                const urls = [
                    `${BASE_URL}/analytics/hungry?userId=${user._id}`,
                    `${BASE_URL}/analytics/trafficChart?userId=${user._id}&nutrient=fat`,
                    `${BASE_URL}/analytics/trafficChart?userId=${user._id}&nutrient=saturates`,
                    `${BASE_URL}/analytics/trafficChart?userId=${user._id}&nutrient=sugar`,
                    `${BASE_URL}/analytics/trafficChart?userId=${user._id}&nutrient=salt`,
                    `${BASE_URL}/analytics/dailyNutrients?userId=${user._id}`,
                ];

                const headers = { Authorization: `Bearer ${user.jwt}` };

                try {
                    const [
                        hungryRes,
                        fatTrafficRes,
                        saturatesTrafficRes,
                        sugarTrafficRes,
                        saltTrafficRes,
                        dailyNutrientsRes,
                    ] = await Promise.all(
                        urls.map((url) => {
                            return axios.get(url, {
                                headers,
                            });
                        })
                    );
                    console.log(dailyNutrientsRes.data);
                    if (isActive) {
                        setHungryData(hungryRes.data);
                        setFatTraffic(fatTrafficRes.data);
                        setSaturatesTraffic(saturatesTrafficRes.data);
                        setSugarTraffic(sugarTrafficRes.data);
                        setSaltTraffic(saltTrafficRes.data);
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
            <Card customStyle={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Fat values of foods eaten today
                </Text>
                {fatTraffic.green > 0 ||
                fatTraffic.amber > 0 ||
                fatTraffic.red > 0 ? (
                    <TrafficBarChart nutrientTraffic={fatTraffic} />
                ) : (
                    <View style={{ marginVertical: 20 }}>
                        <Text>You need to make at least one entry today</Text>
                    </View>
                )}
            </Card>
            <Card customStyle={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Saturates values of foods eaten today
                </Text>
                {saturatesTraffic.green > 0 ||
                saturatesTraffic.amber > 0 ||
                saturatesTraffic.red > 0 ? (
                    <TrafficBarChart nutrientTraffic={saturatesTraffic} />
                ) : (
                    <View style={{ marginVertical: 20 }}>
                        <Text>You need to make at least one entry today</Text>
                    </View>
                )}
            </Card>
            <Card customStyle={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Sugar values of foods eaten today
                </Text>
                {sugarTraffic.green > 0 ||
                sugarTraffic.amber > 0 ||
                sugarTraffic.red > 0 ? (
                    <TrafficBarChart nutrientTraffic={sugarTraffic} />
                ) : (
                    <View style={{ marginVertical: 20 }}>
                        <Text>You need to make at least one entry today</Text>
                    </View>
                )}
            </Card>
            <Card customStyle={{ marginHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Salt values of foods eaten today
                </Text>
                {saltTraffic.green > 0 ||
                saltTraffic.amber > 0 ||
                saltTraffic.red > 0 ? (
                    <TrafficBarChart nutrientTraffic={saltTraffic} />
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
