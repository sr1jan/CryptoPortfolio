import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  NavigationContainer,
  DefaultTheme as RNDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import {app_state} from '../types';
import {CoinInputContext} from '../context/coinInputContext';
import {HomeStack} from './homeStack';
import {BackgroundTasks} from '../backgroundTasks';

const MyRNDarkTheme = {
  dark: true,
  colors: {
    ...RNDefaultTheme.colors,
    primary: '#3c3c3d',
    background: '#222831',
    card: '#393e46',
    text: '#fff',
    border: 'rgb(199, 199, 204)',
  },
};

const MyPaperLightTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    accent: '#e0e0e0',
  },
};

const MyPaperDarkTheme = {
  ...PaperDarkTheme,
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#3c3c3d',
    background: '#222831',
    surface: '#393e46',
    text: '#fff',
    accent: '#393e46',
    border: 'rgb(199, 199, 204)',
  },
};

export default function Nav() {
  const theme = useSelector<app_state>(state => state.portReducer.theme);
  const [coinInputModal, setCoinInputModal] = useState<boolean>(false);
  const toggleModal = () => {
    setCoinInputModal(coinInputModal => !coinInputModal);
  };

  const paperTheme = theme === 'dark' ? MyPaperDarkTheme : MyPaperLightTheme;
  const rnTheme = theme === 'dark' ? MyRNDarkTheme : RNDefaultTheme;

  return (
    <>
      <BackgroundTasks>
        <CoinInputContext.Provider value={{toggleModal, coinInputModal}}>
          <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={rnTheme}>
              <HomeStack />
            </NavigationContainer>
          </PaperProvider>
        </CoinInputContext.Provider>
      </BackgroundTasks>
    </>
  );
}
