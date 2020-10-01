import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme, ActivityIndicator, Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../../styles/styles';
import {totalPort, app_state, token_prop, loadDataType} from '../../types';
import {loadDataFromStorage} from '../../actions/port';
import {ReturnsGraph} from '../../components/returnsGraph';

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

const Profit = ({props}: {props: Props}) => {
  return (
    <View style={localStyles.grContainer}>
      <Text
        style={localStyles.grProfitAmount}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {valueDisplay(props.inr.totalPortAmount)}
      </Text>
      <View style={styles.profitBox}>
        <Text
          style={localStyles.grProfitPercent}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {props.inr.totalPortPercent.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const Loss = ({props}, {props: Props}) => {
  return (
    <View style={localStyles.grContainer}>
      <Text
        style={localStyles.grLossAmount}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {valueDisplay(Math.abs(props.inr.totalPortAmount))}
      </Text>
      <View style={styles.lossBox}>
        <Text
          style={localStyles.grLossPercent}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {Math.abs(props.inr.totalPortPercent).toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const Home = (props: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [graphType, setGraphType] = useState<'line' | 'bar'>('line');

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

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color={colors.onSurface} />
      </View>
    );
  } else if (props.counter > 0) {
    return (
      <View style={{...styles.mainContent, justifyContent: 'space-evenly'}}>
        <Surface
          style={{
            ...styles.surface,
            backgroundColor: colors.surface,
            height: '33%',
            elevation: 2,
          }}>
          {Math.sign(props.inr.totalPortAmount) === 1 ? (
            <Profit props={props} />
          ) : (
            <Loss props={props} />
          )}
        </Surface>

        <Surface
          style={{
            ...styles.surface,
            backgroundColor: colors.surface,
            height: '60%',
            elevation: 2,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignSelf: 'flex-end',
            }}>
            <View style={{marginRight: 5}}>
              <TouchableOpacity onPress={() => setGraphType('line')}>
                <Icon
                  name="chart-line"
                  color={
                    graphType === 'line' ? colors.onSurface : colors.placeholder
                  }
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setGraphType('bar')}>
              <Icon
                name="chart-bar"
                color={
                  graphType === 'bar' ? colors.onSurface : colors.placeholder
                }
                size={25}
              />
            </TouchableOpacity>
          </View>

          <ReturnsGraph graphType={graphType} />
        </Surface>
      </View>
    );
  } else {
    return (
      <View
        style={{
          ...styles.mainContent,
          backgroundColor: colors.background,
        }}>
        <Text
          style={{
            color: colors.placeholder,
            fontFamily: 'monospace',
            letterSpacing: 0.8,
          }}>
          Your portofolio is empty!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Portfolio')}
          style={{
            ...styles.addCoinHomeTouchable,
            backgroundColor: colors.accent,
          }}>
          <Text style={{...styles.addCoinHomeText, color: colors.text}}>
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
    fontSize: 45,
    letterSpacing: 1,
  },
  grProfitPercent: {
    ...styles.grPercent,
    backgroundColor: '#32CD32',
    fontSize: 45,
    paddingHorizontal: 10,
    letterSpacing: 1,
  },
  grLossAmount: {
    ...styles.grAmount,
    color: '#c52a0d',
    fontSize: 45,
    letterSpacing: 1,
  },
  grLossPercent: {
    ...styles.grPercent,
    backgroundColor: '#c52a0d',
    fontSize: 45,
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
