import React, {useRef, useContext} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme, Surface, Text} from 'react-native-paper';
import {material} from 'react-native-typography';
import {token_prop} from '../types';
import {styles} from '../styles/styles';

import {Profit, Loss} from './returns';
import {SwipeableReturns} from './returnsSwipeable';
import {SearchCoinContext} from '../context/searchCoinContext';

interface Props {
  token: token_prop[];
}

const DisplayPL = (props: Props) => {
  const navigation = useNavigation();
  const flatList = useRef<FlatList<any>>(null);
  const {query} = useContext(SearchCoinContext);
  const {colors} = useTheme();

  const Row = ({item, index}: {item: token_prop; index: number}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('CoinDetail', {index: index});
        }}>
        <Surface
          style={{
            ...styles.surface,
            flexDirection: 'row',
            height: 70,
            width: '94%',
            justifyContent: 'space-between',
            backgroundColor: colors.accent,
            marginHorizontal: 11,
            marginBottom: 5,
            marginTop: index > 0 ? 5 : 10,
          }}>
          <View style={{marginLeft: 10, alignItems: 'flex-start'}}>
            <Text
              style={{
                ...material.titleObject,
                color: colors.text,
                fontSize: 17,
              }}>
              {item.coin.toUpperCase()}
            </Text>
            <Text
              style={{
                ...material.subheadingObject,
                color: colors.placeholder,
                fontSize: 12,
              }}>
              {item.market.toUpperCase()}
            </Text>
          </View>
          <View style={{marginRight: 10}}>
            {item.returns >= 0 ? <Profit item={item} /> : <Loss item={item} />}
          </View>
        </Surface>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}: {item: token_prop; index: number}) => {
    return (
      <SwipeableReturns token={item} index={index}>
        <Row item={item} index={index} />
      </SwipeableReturns>
    );
  };

  const results =
    query === ''
      ? props.token
      : props.token.filter(val => val.coin.startsWith(query.toLowerCase()));
  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={results}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: 75,
          offset: 75 * index,
          index,
        })}
        initialNumToRender={10}
        ref={flatList}
        onContentSizeChange={() => {
          query === '' &&
            flatList.current?.scrollToIndex({
              index: props.token.length - 1,
              animated: true,
            });
        }}
      />
    </View>
  );
};

export default DisplayPL;
