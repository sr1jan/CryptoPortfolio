import React, {useState, useLayoutEffect, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme as RNDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import {getStoredTheme, storeTheme} from '../helpers/asyncStorage';
import {CoinInputContext} from '../context/coinInputContext';
import {SearchCoinContext} from '../context/searchCoinContext';
import {ThemeContext} from '../context/themeContext';
import {HomeStack} from './homeStack';

const MyRNTheme = {
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
  const [theme, setTheme] = useState<string>('dark');
  const [coinInputModal, setCoinInputModal] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  useLayoutEffect(() => {
    const type = async () => {
      const defaultTheme = await getStoredTheme();
      setTheme(defaultTheme);
    };
    type();
  }, []);

  useEffect(() => {
    const storeLocalTheme = async () => {
      await storeTheme(theme);
    };
    storeLocalTheme();
  }, [theme]);

  const toggleTheme = async () => {
    setTheme(type => (type === 'dark' ? 'light' : 'dark'));
  };

  const changeQuery = q => setQuery(q);

  const toggleModal = () => {
    setCoinInputModal(coinInputModal => !coinInputModal);
  };

  const paperTheme = theme === 'dark' ? MyPaperDarkTheme : PaperDefaultTheme;
  const rnTheme = theme === 'dark' ? MyRNTheme : RNDefaultTheme;

  return (
    <ThemeContext.Provider value={{toggleTheme, theme}}>
      <CoinInputContext.Provider value={{toggleModal, coinInputModal}}>
        <SearchCoinContext.Provider value={{changeQuery, query}}>
          <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={rnTheme}>
              <HomeStack />
            </NavigationContainer>
          </PaperProvider>
        </SearchCoinContext.Provider>
      </CoinInputContext.Provider>
    </ThemeContext.Provider>
  );
}
