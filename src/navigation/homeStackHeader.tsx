import React, {useContext} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Appbar, useTheme} from 'react-native-paper';
import {BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {app_state} from '../types';

import SearchCoins from '../screens/searchCoin';
import {CoinInputContext} from '../context/coinInputContext';

export default function HomeStackHeader({scene, previous, navigation}) {
  const dispatch = useDispatch();
  const returns: number = useSelector<app_state, number>(
    state => state.portReducer.inr.totalPortAmount,
  );
  const counter: number = useSelector<app_state, number>(
    state => state.portReducer.counter,
  );
  const {colors, dark} = useTheme();
  const {toggleModal} = useContext(CoinInputContext);

  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header style={{backgroundColor: colors.background}}>
      {previous && (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={colors.onSurface}
        />
      )}
      {!previous && (
        <BorderlessButton
          style={{marginLeft: 10}}
          onPress={() => navigation.navigate('Settings')}>
          <Icon name="tune" size={27} color={colors.onSurface} />
        </BorderlessButton>
      )}
      {title === 'Settings' && <Appbar.Content title="Settings" />}
      {scene.route.name === 'CoinDetail' && <Appbar.Content title={title} />}
      {title === 'Home' && returns === 0 && (
        <React.Fragment>
          <Appbar.Content title="" />
          <Appbar.Action
            icon={dark ? 'lighthouse' : 'lighthouse-on'}
            size={27}
            color={colors.onSurface}
            onPress={() =>
              dispatch({
                type: 'SET_THEME',
                theme: dark ? 'light' : 'dark',
              })
            }
          />
        </React.Fragment>
      )}
      {title === 'Home' && returns !== 0 && (
        <React.Fragment>
          <Appbar.Content
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={
              returns > 0 ? (
                <Icon name="trending-up" color="#32CD32" size={38} />
              ) : (
                <Icon name="trending-down" color="#c52a0d" size={38} />
              )
            }
          />
          <Appbar.Action
            icon={dark ? 'lighthouse' : 'lighthouse-on'}
            size={27}
            color={colors.onSurface}
            onPress={() =>
              dispatch({
                type: 'SET_THEME',
                theme: dark ? 'light' : 'dark',
              })
            }
          />
        </React.Fragment>
      )}
      {title === 'Portfolio' && (
        <React.Fragment>
          <Appbar.Content title="" />
          <Appbar.Action
            icon="magnify"
            size={27}
            color={colors.onSurface}
            onPress={() => navigation.push('SearchCoins')}
          />
          <Appbar.Action
            icon="plus-circle"
            size={27}
            color={colors.onSurface}
            onPress={toggleModal}
          />
        </React.Fragment>
      )}
    </Appbar.Header>
  );
}
