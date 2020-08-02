import React, {Component} from 'react';
import {View} from 'react-native';

import {Header, Icon} from 'react-native-elements';

import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Home from './home';
import Portfolio from './screens/Stack/portfolio';

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

export default class Nav extends Component {
  constructor(props) {
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
        component={Portfolio}
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
          component={Portfolio}
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
      </Tab.Navigator>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationContainer theme={this.state.dark ? MyTheme : DefaultTheme}>
          <Header
            statusBarProps={{
              backgroundColor: this.state.dark
                ? MyTheme.colors.background
                : DefaultTheme.colors.background,
              barStyle: this.state.dark ? 'light-content' : 'dark-content',
            }}
            leftComponent={{
              icon: 'home',
              color: this.state.dark ? '#fff' : '#000',
            }}
            centerComponent={{
              text: 'CryptoPortfolio',
              style: {
                fontWeight: 'bold',
                color: this.state.dark ? '#fff' : '#000',
              },
            }}
            rightComponent={this.bulb}
            containerStyle={{
              backgroundColor: this.state.dark
                ? MyTheme.colors.background
                : DefaultTheme.colors.background,
            }}
          />
          {this.createBottomTabs()}
        </NavigationContainer>
      </View>
    );
  }
}
