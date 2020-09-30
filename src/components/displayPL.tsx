import React, {useRef, useContext} from 'react';
import {View, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {token_prop} from '../types';
import {styles} from '../styles/styles';

import {Profit, Loss} from './returns';
import {SwipeableReturns} from './returnsSwipeable';
import {SearchCoinContext} from '../context/searchCoinContext';

interface Props {
  token: token_prop[];
  priceData: object;
}

const DisplayPL = (props: Props) => {
  const {query} = useContext(SearchCoinContext);
  const {colors} = useTheme();
  const flatList = useRef(null);

  const Row = ({item}: {item: token_prop}) => {
    return (
      <View style={{...styles.coinList, backgroundColor: colors.surface}}>
        <View style={{marginLeft: 10, alignItems: 'flex-start'}}>
          <Text style={{...styles.coinTitle, color: colors.text}}>
            {item.coin.toUpperCase()}
          </Text>
          <Text style={{...styles.coinSub, color: 'grey'}}>
            {item.market.toUpperCase()}
          </Text>
        </View>
        <View style={{marginRight: 10}}>
          {item.returns >= 0 ? (
            <Profit item={item} priceData={props.priceData} />
          ) : (
            <Loss item={item} priceData={props.priceData} />
          )}
        </View>
      </View>
    );
  };

  const renderItem = ({item, index}: {item: token_prop; index: number}) => {
    return (
      <SwipeableReturns index={index}>
        <Row item={item} />
      </SwipeableReturns>
    );
  };

  const results = props.token.filter(val =>
    val.coin.startsWith(query.toLowerCase()),
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={results}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: 71,
          offset: 71 * index,
          index,
        })}
        initialNumToRender={10}
        ItemSeparatorComponent={() => (
          <View style={{...styles.separator, backgroundColor: '#000'}} />
        )}
        ref={flatList}
        onContentSizeChange={() => {
          query === '' &&
            flatList.current.scrollToIndex({
              index: props.token.length - 1,
              animated: true,
            });
        }}
      />
    </View>
  );
};

export default DisplayPL;
