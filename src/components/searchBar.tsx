import React, {useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {TextInput, useTheme} from 'react-native-paper';
import {SearchCoinContext} from '../context/searchCoinContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SearchBar = ({toggleSearchBar}: {toggleSearchBar: () => void}) => {
  const {colors, dark} = useTheme();
  const {changeQuery, query} = React.useContext(SearchCoinContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        toggleSearchBar();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 35,
      }}>
      {query !== '' && (
        <BorderlessButton
          onPress={() => changeQuery('')}
          style={{marginRight: 3, marginTop: 3}}>
          <Icon name="close" color={colors.accent} size={20} />
        </BorderlessButton>
      )}
      <TextInput
        label="coin"
        placeholder="search.."
        value={query}
        onChangeText={q => changeQuery(q)}
        mode="outlined"
        selectionColor={colors.onSurface}
        theme={{colors: {primary: dark ? colors.primary : '#000'}}}
        onEndEditing={toggleSearchBar}
        style={{
          width: 70,
          height: 25,
          fontSize: 11,
          fontFamily: 'monospace',
          marginBottom: 2,
          marginRight: 10,
        }}
      />
    </View>
  );
};
