import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
/* import {Icon} from 'react-native-elements'; */

import {styles} from '../../styles/styles';
import {totalPort, app_state, token_prop, loadDataType} from '../../types';
import {loadDataFromStorage} from '../../actions/port';

import {valueDisplay} from '../../helpers/currency';

import {
  getCoinDetail,
  getCounter,
  getTotalPort,
  getMarketData,
} from '../../helpers/asyncStorage';

interface Props {
  counter: number;
  inr: totalPort;
  loadDataFromStorage: (
    coinDetailList: token_prop[],
    counter: number,
    portData: totalPort,
    marketData: object,
  ) => loadDataType;
}

const Home = (props: Props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function retrieveLocalData() {
      try {
        const counter: number | null | undefined = await getCounter();
        if (
          counter !== null &&
          counter !== undefined &&
          props.counter !== counter
        ) {
          const coinDetailList: token_prop[] | null = await getCoinDetail();
          const portData: totalPort | null = await getTotalPort();
          const marketData: object | null = await getMarketData();
          if (
            coinDetailList !== null &&
            portData !== null &&
            marketData !== null
          ) {
            props.loadDataFromStorage(
              coinDetailList,
              counter,
              portData,
              marketData,
            );
          }
        }
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    retrieveLocalData();
  }, []);

  const Profit = () => {
    return (
      <View style={localStyles.grContainer}>
        <Text style={localStyles.grProfitAmount}>
          {valueDisplay(props.inr.totalPortAmount)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          {/* <View style={{marginRight: 3}}> */}
          {/*   <Icon */}
          {/*     name="long-arrow-alt-up" */}
          {/*     type="font-awesome-5" */}
          {/*     color="#fff" */}
          {/*     size={55} */}
          {/*   /> */}
          {/* </View> */}
          <View style={styles.profitBox}>
            <Text style={localStyles.grProfitPercent}>
              {props.inr.totalPortPercent.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const Loss = () => {
    return (
      <View style={localStyles.grContainer}>
        <Text style={localStyles.grLossAmount}>
          {valueDisplay(Math.abs(props.inr.totalPortAmount))}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          {/* <View style={{marginRight: 3}}> */}
          {/*   <Icon */}
          {/*     name="long-arrow-alt-down" */}
          {/*     type="font-awesome-5" */}
          {/*     color="#fff" */}
          {/*     size={55} */}
          {/*   /> */}
          {/* </View> */}
          <View style={styles.lossBox}>
            <Text style={localStyles.grLossPercent}>
              {Math.abs(props.inr.totalPortPercent).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  } else if (props.counter > 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          {Math.sign(props.inr.totalPortAmount) === 1 ? <Profit /> : <Loss />}
        </View>
        <View
          style={{
            height: 0.8,
            width: '100%',
            backgroundColor: 'black',
            marginVertical: 5,
          }}
        />
        <View style={{flex: 2}}>
          {/* <Text style={{color: '#fff'}}>Test</Text> */}
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#222831',
        }}>
        <Text style={{color: '#fff', fontFamily: 'monospace'}}>
          Your portofolio is empty!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Portfolio')}
          style={{
            borderRadius: 3,
            backgroundColor: '#393e46',
            marginTop: 5,
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'monospace',
              fontSize: 13,
              paddingVertical: 5,
              paddingHorizontal: 10,
            }}>
            Add Coin
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const localStyles = StyleSheet.create({
  grContainer: {
    ...styles.grContainer,
    alignItems: 'center',
  },
  grProfitAmount: {
    ...styles.grAmount,
    color: '#32CD32',
    fontSize: 50,
    letterSpacing: 1,
  },
  grProfitPercent: {
    ...styles.grPercent,
    backgroundColor: '#32CD32',
    fontSize: 50,
    paddingHorizontal: 15,
    letterSpacing: 1,
  },
  grLossAmount: {
    ...styles.grAmount,
    color: '#c52a0d',
    fontSize: 60,
    letterSpacing: 1,
  },
  grLossPercent: {
    ...styles.grPercent,
    backgroundColor: '#c52a0d',
    fontSize: 60,
    paddingHorizontal: 15,
    letterSpacing: 1,
  },
});

const mapStateToProps = (state: app_state) => {
  return {
    counter: state.portReducer.counter,
    inr: state.portReducer.inr,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadDataFromStorage: (
      coinDetailList: token_prop[],
      counter: number,
      portData: totalPort,
      marketData: object,
    ) =>
      dispatch(
        loadDataFromStorage(coinDetailList, counter, portData, marketData),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
