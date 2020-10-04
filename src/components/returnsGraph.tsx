import React, {useEffect, useState, useRef} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {YAxis, LineChart, BarChart, Grid} from 'react-native-svg-charts';
import {Line, Text} from 'react-native-svg';
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
    shallowEqual,
  );

  /* useEffect(() => { */
  /*   const _data = setInterval(() => { */
  /*     setData(d => d.concat(Math.floor(Math.random() * (50 - 5)))); */
  /*   }, 5000); */

  /*   return () => clearInterval(_data); */
  /* }, []); */

  let data: number[] = [];
  if (returns.length > 25) {
    data = returns.filter((num, i) => i >= returns.length - 25);
  } else if (returns.length === 1) {
    data = data.concat(0, returns);
  } else {
    data = data.concat(returns);
  }

  /* console.log(...data); */
  /* console.log(totalReturns); */
  const contentInset = {top: 10, bottom: 10, left: 10, right: 10};
  return (
    <View
      style={{
        flex: 1,
        width: '95%',
        flexDirection: 'row',
      }}>
      {props.graphType !== 'pie' && (
        <YAxis
          data={data}
          numberOfTicks={12}
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
      )}
      <ScrollView
        horizontal={true}
        style={{marginLeft: 5, marginBottom: 10}}
        ref={ref => (scrollRef.current = ref)}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({animated: true})
        }>
        <View style={{width: 300}}>
          {props.graphType === 'line' && (
            <LineChart
              style={{flex: 1}}
              numberOfTicks={12}
              data={data}
              svg={{stroke: totalReturns > 0 ? PROFIT : LOSS, strokeWidth: 1.5}}
              yScale={scaleLinear}
              animate={true}
              animationDuration={300}
              contentInset={contentInset}
              curve={shape.curveNatural}>
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
              style={{flex: 1}}
              spacingInner={0.2}
              numberOfTicks={12}
              data={data}
              yScale={scaleLinear}
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
