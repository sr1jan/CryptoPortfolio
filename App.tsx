import React, {Component} from 'react';
import Nav from './src/nav';
import {enableScreens} from 'react-native-screens';

export default class App extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    enableScreens();
    return <Nav />;
  }
}
