import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';

import {Icon} from 'react-native-elements';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Home from './home';
import Port from './screens/Stack/port';
import Setting from './screens/Stack/setting';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MyTheme = {
  dark: true,
  colors: {
    primary: '#3c3c3d',
    background: '#222831',
    card: '#393e46',
    text: '#fff',
    border: 'rgb(199, 199, 204)',
  },
};

interface IState {
  dark: boolean;
}

export default class Nav extends Component<null, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dark: true,
    };
  }

  changeTheme = () => {
    this.setState({dark: !this.state.dark});
  };

  bulb = () => {
    return (
      <View>
        {this.state.dark ? (
          <Icon
            name="lightbulb-off-outline"
            type="material-community"
            color="#fff"
            onPress={this.changeTheme}
          />
        ) : (
          <Icon
            name="lightbulb-on-outline"
            type="material-community"
            onPress={this.changeTheme}
          />
        )}
      </View>
    );
  };

  createHomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        children={this.createBottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Portfolio"
        component={Port}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );

  createBottomTabs = () => {
    return (
      <Tab.Navigator
        barStyle={{
          backgroundColor: this.state.dark
            ? MyTheme.colors.card
            : DefaultTheme.colors.card,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <Icon
                name="home"
                type="material-community"
                color={this.state.dark ? '#fff' : '#000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={Port}
          options={{
            tabBarLabel: 'Portfolio',
            tabBarIcon: () => (
              <Icon
                name="cash-multiple"
                type="material-community"
                color={this.state.dark ? '#fff' : '#000'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: () => (
              <Icon
                name="account-settings"
                type="material-community"
                color="#fff"
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={MyTheme.colors.background}
        />
        <NavigationContainer theme={this.state.dark ? MyTheme : DefaultTheme}>
          {this.createBottomTabs()}
        </NavigationContainer>
      </View>
    );
  }
}
