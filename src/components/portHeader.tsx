import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {BorderlessButton} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';

import {styles} from '../styles/styles';
import {valueDisplay} from '../helpers/currency';
import {app_state, totalPort} from '../types';
interface Props {
  toggleOverlay: () => void;
  inr: totalPort;
  counter: number;
}

function PortHeader(props: Props) {
  const theme = useTheme();
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
            <Icon name="trending-up" color="#32CD32" size={15} />
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
            <Icon name="trending-down" color="#c52a0d" size={15} />
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

  return (
    <View
      style={{
        ...styles.addCoinContainer,
        backgroundColor: theme.colors.surface,
      }}>
      <View style={{alignSelf: 'flex-start'}}>
        <BorderlessButton onPress={props.toggleOverlay}>
          <View style={styles.addCoinLeftComponent}>
            <Icon name="add-circle" size={35} color={theme.colors.text} />
          </View>
        </BorderlessButton>
      </View>
      <View style={{alignSelf: 'flex-end', marginRight: 10}}>
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
