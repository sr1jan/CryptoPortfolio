import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import {material} from 'react-native-typography';

import HomeStackHeader from './homeStackHeader';
import Setting from '../screens/setting';
import SearchCoins from '../screens/searchCoin';
import CoinDetail from '../screens/coinDetail';
import {BottomTabs} from './bottomTabs';

const Stack = createStackNavigator();
export const HomeStack = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        header: ({scene, previous, navigation}) => (
          <HomeStackHeader
            scene={scene}
            previous={previous}
            navigation={navigation}
          />
        ),
        headerTitleStyle: {...material.titleObject, color: colors.text},
      }}>
      <Stack.Screen
        name="Home"
        component={BottomTabs}
        options={({route}) => {
          const routeName = route.state
            ? route.state.routes[route.state.index].name
            : 'Home';
          return {
            headerTitle: routeName,
          };
        }}
      />
      <Stack.Screen name="CoinDetail" component={CoinDetail} />
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{
          headerTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name="SearchCoins"
        component={SearchCoins}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
