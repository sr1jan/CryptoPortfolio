import React from 'react';
import {useTheme} from '@react-navigation/native';
import Portfolio from './portfolio';

function Port() {
  const {colors} = useTheme();
  return <Portfolio theme={colors} />;
}

export default Port;
