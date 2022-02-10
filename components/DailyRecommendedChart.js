import React from 'react';
import {
    VictoryLegend,
    VictoryChart,
    VictoryGroup,
    VictoryBar,
    VictoryAxis,
} from 'victory-native';

const DailyRecommendedChart = ({ dailyNutrients }) => {
    return (
        <>
            <VictoryLegend
                height={100}
                x={20}
                y={30}
                colorScale={['#349CEB', '#EB5834']}
                data={[{ name: 'Recommended intake' }, { name: 'Your intake' }]}
                style={{
                    labels: {
                        fontSize: 18,
                    },
                }}
            />
            <VictoryChart domainPadding={40}>
                <VictoryAxis
                    label="Nutrients"
                    style={{
                        axisLabel: {
                            padding: 35,
                            fontWeight: 'bold',
                        },
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    label="Weight (g)"
                    style={{
                        axisLabel: {
                            padding: 35,
                            fontWeight: 'bold',
                        },
                    }}
                />
                <VictoryGroup
                    offset={20}
                    colorScale={'qualitative'}
                    categories={{
                        x: ['Fat', 'Saturates', 'Sugar', 'Salt'],
                    }}
                >
                    <VictoryBar
                        data={[
                            {
                                x: 1,
                                y: dailyNutrients.totalNutrients.totalFat,
                            },
                            {
                                x: 2,
                                y: dailyNutrients.totalNutrients.totalSaturates,
                            },
                            {
                                x: 3,
                                y: dailyNutrients.totalNutrients.totalSugar,
                            },
                            {
                                x: 4,
                                y: dailyNutrients.totalNutrients.totalSalt,
                            },
                        ]}
                        style={{
                            data: {
                                fill: () => '#EB5834',
                            },
                        }}
                    />
                    <VictoryBar
                        data={[
                            {
                                x: 1,
                                y: dailyNutrients.dailyRecommended.fat,
                            },
                            {
                                x: 2,
                                y: dailyNutrients.dailyRecommended.saturates,
                            },
                            {
                                x: 3,
                                y: dailyNutrients.dailyRecommended.sugar,
                            },
                            {
                                x: 4,
                                y: dailyNutrients.dailyRecommended.salt,
                            },
                        ]}
                        style={{
                            data: {
                                fill: () => '#349CEB',
                            },
                        }}
                    />
                </VictoryGroup>
            </VictoryChart>
        </>
    );
};

export default DailyRecommendedChart;
