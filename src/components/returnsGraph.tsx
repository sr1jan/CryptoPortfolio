import React, {useEffect, useState, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {XAxis, YAxis, LineChart, BarChart, Grid} from 'react-native-svg-charts';
import {Circle, G, Line, Rect, Text} from 'react-native-svg';
import * as shape from 'd3-shape';
import {scaleLinear} from 'd3-scale';

import {app_state} from '../types';

const PROFIT = '#32CD32';
const LOSS = '#c52a0d';

interface Props {
  graphType: string;
}

const HorizontalLine = ({y, data}) => {
  const avg = data.reduce((a, b) => a + b) / data.length;
  return (
    <Line
      key={'zero-axis'}
      x1={'0%'}
      x2={'100%'}
      y1={y(avg)}
      y2={y(avg)}
      stroke={'grey'}
      strokeDasharray={[4, 8]}
      strokeWidth={2}
    />
  );
};

const currencySign = {
  ['inr']: '\u20b9',
  ['usd']: '\u0024',
};

export const ReturnsGraph = (props: Props) => {
  const {colors, dark} = useTheme();
  /* const [data, setData] = useState([10, 20, 4, 5, 40, 20, 11, 8, 22]); */
  const scrollRef = useRef();

  const currency: any = useSelector<app_state>(
    state => state.portReducer.currency,
  );
  const totalReturns: any = useSelector<app_state>(
    state => state.portReducer.inr.totalPortAmount,
  );
  const returns: any = useSelector<app_state>(
    state => state.returnsReducer.inr.returns,
  );
  const time: any = useSelector<app_state>(
    state => state.returnsReducer.inr.time,
  );

  /*   useEffect(() => { */
  /*     const _data = setInterval(() => { */
  /*       setData(d => d.concat(Math.floor(Math.random() * (50 - 5)))); */
  /*     }, 5000); */

  /*     return () => clearInterval(_data); */
  /*   }, []); */

  const data =
    returns.length > 30
      ? returns.filter((num, i) => i >= returns.length - 30)
      : returns;

  /* console.log(...data); */
  console.log(totalReturns);
  const contentInset = {top: 10, bottom: 10, left: 10, right: 10};
  return (
    <View
      style={{
        flex: 1,
        width: '95%',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <YAxis
        numberOfTicks={15}
        data={data}
        contentInset={contentInset}
        svg={{
          fill: colors.onSurface,
          fontSize: 10,
        }}
        scale={scaleLinear}
        animation={true}
        animationDuration={300}
        formatLabel={value => `${currencySign[currency]} ${value.toFixed(2)}`}
      />

      <ScrollView
        horizontal={true}
        style={{marginLeft: 5}}
        ref={ref => (scrollRef.current = ref)}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({animated: true})
        }>
        <View style={{width: 300}}>
          {props.graphType === 'line' && (
            <LineChart
              numberOfTicks={15}
              style={{flex: 1}}
              data={data}
              svg={{stroke: totalReturns > 0 ? PROFIT : LOSS, strokeWidth: 2}}
              scale={scaleLinear}
              animate={true}
              animationDuration={300}
              contentInset={contentInset}
              curve={shape.curveLinear}>
              <Grid
                svg={{
                  stroke: colors.placeholder,
                  strokeWidth: 0.2,
                  strokeOpacity: 0.5,
                }}
              />
              <HorizontalLine />
            </LineChart>
          )}

          {props.graphType === 'bar' && (
            <BarChart
              numberOfTicks={15}
              style={{flex: 1}}
              data={data}
              svg={{fill: totalReturns > 0 ? PROFIT : LOSS}}
              animate={true}
              animationDuration={300}
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
      </ScrollView>
    </View>
  );
};
