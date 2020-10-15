import React, {useEffect, useState, useRef, MutableRefObject} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {YAxis, LineChart, BarChart, Grid} from 'react-native-svg-charts';
import {Line} from 'react-native-svg';
import * as shape from 'd3-shape';
import {scaleLinear, scaleTime} from 'd3-scale';

import {app_state} from '../types';
import {PROFIT_COLOR, LOSS_COLOR, currencySign} from '../styles/styles';

interface Props {
  graphType: string;
}

const AverageLine = ({y, data}) => {
  const avg = data.reduce((a, b) => a + b) / data.length;
  return (
    <Line
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

const LatestValueLine = ({y, data, colors}) => {
  return (
    <Line
      x1={'0%'}
      x2={'97%'}
      y1={y(data[data.length-1])}
      y2={y(data[data.length-1])}
      stroke={colors.text}
      strokeWidth={0.5}
      strokeOpacity={0.5}
    />
  );
};

export const ReturnsGraph = (props: Props) => {
  const {colors, dark} = useTheme();
  /* const [data, setData] = useState([10, 20, 4, 5, 40, 20, 11, 8, 22]); */
  const scrollRef = useRef<ScrollView>(null);

  const currency: string = useSelector<app_state, string>(
    state => state.portReducer.currency,
  );
  const totalReturns: number = useSelector<app_state, number>(
    state => state.portReducer[currency].totalPortAmount,
  );
  const returns: number[] = useSelector<app_state, number[]>(
    state => state.returnsReducer[currency].returns,
    shallowEqual,
  );

/*   useEffect(() => { */
/*     const _data = setInterval(() => { */
/*       setData(d => d.concat(Math.floor(Math.random() * (500 - 5)))); */
/*     }, 5000); */

/*     return () => clearInterval(_data); */
/*   }, []); */

  let data: number[] = [];
  if (returns.length > 25) {
    data = returns.filter((num, i) => i >= returns.length - 25);
  } else if (returns.length === 1) {
    data = data.concat(0, returns);
  } else {
    data = data.concat(returns);
  }

  const contentInset = {top: 25, bottom: 25, left: 10, right: 10};
  return (
    <View
      style={{
        flex: 1,
        width: '95%',
        flexDirection: 'row',
      }}>
      <YAxis
        data={data}
        numberOfTicks={10}
        contentInset={contentInset}
        svg={{
          fill: colors.onSurface,
          fontSize: 10,
        }}
        scale={scaleLinear}
        formatLabel={value => `${currencySign[currency]} ${value.toFixed(2)}`}
      />
      <ScrollView
        horizontal={true}
        style={{marginLeft: 5}}
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({animated: true})
        }>
        <View style={{width: 300}}>
          {props.graphType === 'line' && (
            <LineChart
              style={{flex: 1}}
              numberOfTicks={10}
              data={data}
              svg={{
                stroke: totalReturns > 0 ? PROFIT_COLOR : LOSS_COLOR,
                strokeWidth: 1.5,
              }}
              yScale={scaleLinear}
              xScale={scaleTime}
              contentInset={contentInset}
              curve={shape.curveNatural}>
              <Grid
                svg={{
                  stroke: colors.placeholder,
                  strokeWidth: 0.2,
                  strokeOpacity: 0.5,
                }}
              />
              {/* <AverageLine /> */}
              {/* <LatestValueLine colors={colors}/> */}
            </LineChart>
          )}
          {props.graphType === 'bar' && (
            <BarChart
              style={{flex: 1}}
              spacingInner={0.2}
              numberOfTicks={10}
              data={data}
              yScale={scaleLinear}
              xScale={scaleTime}
              svg={{fill: totalReturns > 0 ? PROFIT_COLOR : LOSS_COLOR}}
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
