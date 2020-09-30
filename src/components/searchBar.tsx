import React, {useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {TextInput, useTheme} from 'react-native-paper';
import {SearchCoinContext} from '../context/searchCoinContext';

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
        <BorderlessButton onPress={() => changeQuery('')}>
          <Text
            style={{
              color: colors.accent,
              fontSize: 12,
              fontFamily: 'Hack',
              fontWeight: '100',
              marginRight: 3,
              textDecorationLine: 'underline',
            }}>
            clear
          </Text>
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
