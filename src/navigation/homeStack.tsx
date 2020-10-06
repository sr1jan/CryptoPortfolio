import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {Appbar, useTheme} from 'react-native-paper';
import {BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {app_state} from '../types';

import Setting from '../screens/setting';
import SearchCoins from '../screens/searchCoin';
import {BottomTabs} from './bottomTabs';
import {CoinInputContext} from '../context/coinInputContext';

const Stack = createStackNavigator();

export const HomeStack = () => {
  const dispatch = useDispatch();
  const returns: number = useSelector<app_state>(
    state => state.portReducer.inr.totalPortAmount,
  );
  const counter: number = useSelector<app_state>(
    state => state.portReducer.counter,
  );
  const {colors, dark} = useTheme();
  const {toggleModal} = useContext(CoinInputContext);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({scene, previous, navigation}) => {
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
              {title !== 'Home' && <Appbar.Content title="" />}
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
        },
      }}>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={({route}) => {
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : 'Home';
          return {headerTitle: routeName};
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{headerTitle: 'Settings'}}
      />
      <Stack.Screen
        name="SearchCoins"
        component={SearchCoins}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
