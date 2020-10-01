import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {YAxis, LineChart, BarChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

import {app_state} from '../types';

const PROFIT = '#32CD32';
const LOSS = '#c52a0d';

interface Props {
  graphType: string;
}

export const ReturnsGraph = (props: Props) => {
  const returns: number = useSelector<app_state>(
    state => state.portReducer.inr.totalPortAmount,
  );
  const {colors, dark} = useTheme();
  const [data, setData] = useState([
    100,
    105,
    98,
    200,
    111,
    85,
    88,
    70,
    100,
    50,
    120,
    100,
    86,
  ]);

  useEffect(() => {
    const addValue = setInterval(() => {
      setData(data => data.concat(Math.floor(Math.random() * (1000 - 10))));
    }, 5000);
    return () => clearInterval(addValue);
  }, []);

  useEffect(() => {
    if (data.length < 16) return;
    setData(data => data.splice(data.length - 15, data.length));
  }, [data]);

  const contentInset = {top: 10, bottom: 10, left: 10, right: 10};
  return (
    <View style={{height: '80%', flexDirection: 'row', marginHorizontal: 15}}>
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: returns > 0 ? PROFIT : LOSS,
          fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={value => `$${value} `}
      />
      {props.graphType === 'line' && (
        <LineChart
          style={{height: '100%', width: '100%'}}
          data={data}
          numberOfTicks={10}
          svg={{
            stroke: returns > 0 ? PROFIT : LOSS,
            strokeWidth: 1,
          }}
          animate={true}
          animationDuration={500}
          contentInset={contentInset}>
          <Grid
            svg={{
              stroke: colors.placeholder,
              strokeWidth: 0.2,
              strokeOpacity: 0.5,
            }}
          />
        </LineChart>
      )}
      {props.graphType === 'bar' && (
        <BarChart
          style={{height: '100%', width: '100%'}}
          data={data}
          numberOfTicks={10}
          svg={{fill: returns > 0 ? PROFIT : LOSS}}
          animate={true}
          animationDuration={500}
          contentInset={contentInset}>
          <Grid
            svg={{
              stroke: colors.placeholder,
              strokeWidth: 0.2,
              strokeOpacity: 0.5,
            }}
          />
        </BarChart>
      )}
    </View>
  );
};
