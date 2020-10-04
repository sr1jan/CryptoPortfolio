import React, {Component} from 'react';
import Nav from './src/navigation/nav';
import {enableScreens} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import {BackgroundTasks} from './src/backgroundTasks';

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
