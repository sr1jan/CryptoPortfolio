import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';

import {HomeStack} from './homeStack';

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      overlayColor={theme.colors.background}
      drawerStyle={{backgroundColor: theme.colors.primary}}
      drawerContentOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'grey',
      }}>
      <Drawer.Screen name="Home" children={HomeStack} />
    </Drawer.Navigator>
  );
};
