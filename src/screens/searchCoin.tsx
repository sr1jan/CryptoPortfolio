import React, {useState} from 'react';
import {View} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {useTheme} from 'react-native-paper';

import {styles} from '../styles/styles';
import {app_state} from '../types';
import DisplayPL from '../components/displayPL';
import {SearchBar} from '../components/searchBar';
import {SearchCoinContext} from '../context/searchCoinContext';

export default function SearchCoins() {
  const {colors} = useTheme();
  const [query, setQuery] = useState<string>('');

  const changeQuery = q => setQuery(q);

  const token: any = useSelector<app_state>(
    state => state.portReducer.token,
    shallowEqual,
  );

  return (
    <SearchCoinContext.Provider value={{changeQuery, query}}>
      <View style={{...styles.container, backgroundColor: colors.background}}>
        <SearchBar />
        {query !== '' && <DisplayPL token={token} />}
      </View>
    </SearchCoinContext.Provider>
  );
}
