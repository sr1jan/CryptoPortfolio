import React, {Component} from 'react';
import Nav from './src/nav';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    enableScreens();
    return <Nav />;
  }
}
