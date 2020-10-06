import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme, Searchbar} from 'react-native-paper';
import {SearchCoinContext} from '../context/searchCoinContext';

export const SearchBar = () => {
  const navigation = useNavigation();
  const {colors, dark} = useTheme();
  const {changeQuery, query} = React.useContext(SearchCoinContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        changeQuery('');
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Searchbar
      autoFocus={true}
      style={{backgroundColor: colors.background}}
      placeholder="Search coin..."
      icon="arrow-left"
      onIconPress={() => {
        changeQuery('');
        navigation.goBack();
      }}
      onChangeText={q => changeQuery(q)}
      value={query}
      theme={{colors: {primary: colors.text}}}
    />
  );
};
