import React from 'react';
import {View, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';

import {styles} from '../styles/styles';
import {app_state} from '../types';
import {ReturnsGraph} from '../components/returnsGraph';
import {ReturnsHeading} from '../components/returnsHeading';
import {AddCoinHome} from '../components/addCoinHome';
import {ReturnsGraphView} from '../components/returnGraphView';

export default function Home() {
  const counter: number = useSelector<app_state, number>(
    state => state.portReducer.counter,
  );
  const {colors, dark} = useTheme();

  return (
    <View
      style={{
        ...styles.mainContent,
        justifyContent: 'space-evenly',
        backgroundColor: colors.background,
      }}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={dark ? 'light-content' : 'dark-content'}
        animated={true}
      />
      {counter > 0 ? (
        <>
          <ReturnsHeading />
          <ReturnsGraphView />
        </>
      ) : (
        <AddCoinHome />
      )}
    </View>
  );
}
