import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import {Icon} from 'react-native-elements';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Home from './screens/Stack/home';
import Portfolio from './screens/Stack/portfolio';
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
        activeColor="#fff"
        inactiveColor="grey"
        barStyle={{
          backgroundColor: this.state.dark
            ? MyTheme.colors.card
            : DefaultTheme.colors.card,
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
                type="font-awesome-5"
                color={focused ? '#fff' : 'grey'}
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
                name="coins"
                type="font-awesome-5"
                color={focused ? '#fff' : 'grey'}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({focused}) => (
              <Icon
                name="user-cog"
                type="font-awesome-5"
                color={focused ? '#fff' : 'grey'}
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
