import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {theme_prop, app_state, totalPort} from '../types';
import {connect} from 'react-redux';
import {valueDisplay} from '../helpers/currency';
import {styles} from '../styles/styles';

interface Props {
  theme: theme_prop;
  toggleOverlay: () => void;
  empty: boolean;
  inr: totalPort;
  counter: number;
}

function NewCoin(props: Props) {
  if (props.counter === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          reverse
          name="plus"
          type="font-awesome-5"
          size={90}
          color={props.theme.card}
          onPress={props.toggleOverlay}
        />
        <Text
          style={{
            fontWeight: '100',
            color: '#fff',
            marginTop: 15,
            fontFamily: 'Hack',
            letterSpacing: 3,
          }}>
          Add a new coin
        </Text>
      </View>
    );
  } else {
    return (
      <ListItem
        key="add"
        containerStyle={styles.addCoinContainer}
        onPress={props.toggleOverlay}
        leftIcon={
          <Icon
            name="plus-circle"
            type="font-awesome-5"
            size={28}
            color="#fff"
          />
        }
        title="add a new coin"
        titleStyle={styles.addCoinText}
        rightElement={
          <View>
            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
              <Text style={styles.grText}>Gross Returns</Text>
            </View>
            {Math.sign(props.inr.totalPortAmount) === 1 ? (
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
            ) : (
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
            )}
          </View>
        }
      />
    );
  }
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

export default connect(mapStateToProps)(NewCoin);
