import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {app_state, totalPort} from '../types';
import {connect} from 'react-redux';
import {valueDisplay} from '../helpers/currency';
import {styles} from '../styles/styles';

interface Props {
  toggleOverlay: () => void;
  inr: totalPort;
  counter: number;
}

function PortHeader(props: Props) {
  const Profit = () => {
    return (
      <View style={styles.grContainer}>
        <Text style={localStyles.grProfitAmount}>
          {valueDisplay(props.inr.totalPortAmount)}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <View style={{marginRight: 3}}>
            <Icon
              name="long-arrow-alt-up"
              type="font-awesome-5"
              color="#fff"
              size={15}
            />
          </View>
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
      <View style={styles.grContainer}>
        <Text style={localStyles.grLossAmount}>
          {valueDisplay(Math.abs(props.inr.totalPortAmount))}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <View style={{marginRight: 3}}>
            <Icon
              name="long-arrow-alt-down"
              type="font-awesome-5"
              color="#fff"
              size={15}
            />
          </View>
          <View style={styles.lossBox}>
            <Text style={localStyles.grLossPercent}>
              {Math.abs(props.inr.totalPortPercent).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const GrossReturns = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={styles.grText}>Gross Returns</Text>
      </View>
    );
  };

  return (
    <View style={styles.addCoinContainer}>
      <View style={{alignSelf: 'flex-start'}}>
        <View style={styles.addCoinLeftComponent}>
          <Icon
            name="plus-circle"
            type="font-awesome-5"
            size={28}
            color="#fff"
            onPress={props.toggleOverlay}
          />
          <Text style={styles.addCoinText}>add a new coin</Text>
        </View>
      </View>
      <View style={{alignSelf: 'flex-end', marginRight: 10}}>
        {<GrossReturns />}
        {Math.sign(props.inr.totalPortAmount) === 1 ? <Profit /> : <Loss />}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  grProfitAmount: {
    ...styles.grAmount,
    color: '#32CD32',
  },
  grProfitPercent: {
    ...styles.grPercent,
    backgroundColor: '#32CD32',
  },
  grLossAmount: {
    ...styles.grAmount,
    color: '#c52a0d',
  },
  grLossPercent: {
    ...styles.grPercent,
    backgroundColor: '#c52a0d',
  },
});

const mapStateToProps = (state: app_state) => {
  return {
    inr: state.portReducer.inr,
    counter: state.portReducer.counter,
  };
};

export default connect(mapStateToProps)(PortHeader);
