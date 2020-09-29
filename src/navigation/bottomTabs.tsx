import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Stack/home';
import Portfolio from '../screens/Stack/portfolio';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      shifting={true}
      activeColor={theme.colors.text}
      inactiveColor="grey"
      barStyle={{
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        paddingBottom: 2,
        paddingTop: 2,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={25}
              color={focused ? theme.colors.text : 'grey'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({focused}) => (
            <Icon
              name="finance"
              size={25}
              color={focused ? theme.colors.text : 'grey'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
