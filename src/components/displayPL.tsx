import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {token_prop, app_state} from '../types';
import {styles} from '../styles/styles';
import {FlatList} from 'react-native-gesture-handler';

import PortHeader from '../components/portHeader';
import {Profit, Loss} from './returns';
import {SwipeableReturns} from './returnsSwipeable';

interface Props {
  token: token_prop[];
  priceData: object;
  toggleOverlay: () => void;
}

const DisplayPL = (props: Props) => {
  const flatList = useRef(null);

  const Row = ({item}: {item: token_prop}) => {
    return (
      <View style={styles.coinList}>
        <View style={{marginLeft: 10, alignItems: 'flex-start'}}>
          <Text style={styles.coinTitle}>{item.coin.toUpperCase()}</Text>
          <Text style={styles.coinSub}>{item.market.toUpperCase()}</Text>
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

  return (
    <View style={{flex: 1}}>
      <PortHeader toggleOverlay={props.toggleOverlay} />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={props.token}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: 71,
          offset: 71 * index,
          index,
        })}
        initialNumToRender={10}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ref={flatList}
        onContentSizeChange={() =>
          flatList.current.scrollToIndex({
            index: props.token.length - 1,
            animated: true,
          })
        }
      />
    </View>
  );
};

const mapStateToProps = (state: app_state) => {
  return {
    token: state.portReducer.token,
    priceData: state.portReducer.priceData,
  };
};

export default connect(mapStateToProps)(DisplayPL);
