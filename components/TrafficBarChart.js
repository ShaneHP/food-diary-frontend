import React from 'react';
import {
    VictoryTheme,
    VictoryChart,
    VictoryBar,
    VictoryAxis,
} from 'victory-native';

const TrafficBarChart = ({ nutrientTraffic }) => {
    return (
        <VictoryChart theme={VictoryTheme.material} domainPadding={100}>
            <VictoryAxis
                label="Traffic light value of food item"
                style={{
                    axisLabel: {
                        padding: 35,
                        fontWeight: 'bold',
                    },
                }}
            />
            <VictoryAxis
                dependentAxis
                label="Num. of food items"
                style={{
                    axisLabel: {
                        padding: 40,
                        fontWeight: 'bold',
                    },
                }}
            />
            <VictoryBar
                data={[
                    { x: 1, y: nutrientTraffic.green, color: '#54D049' },
                    { x: 2, y: nutrientTraffic.amber, color: '#FF7E06' },
                    { x: 3, y: nutrientTraffic.red, color: '#E61E10' },
                ]}
                style={{
                    data: {
                        fill: ({ datum }) => datum.color,
                    },
                }}
                categories={{ x: ['Green', 'Amber', 'Red'] }}
            />
        </VictoryChart>
    );
};

export default TrafficBarChart;
