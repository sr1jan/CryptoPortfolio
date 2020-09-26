import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/styles';
import {app_state, totalPort} from '../types';
interface Props {
  toggleOverlay: () => void;
  empty: boolean;
  inr: totalPort;
  counter: number;
}

function NewCoin(props: Props) {
  return (
    <View style={styles.mainContent}>
      <BorderlessButton onPress={props.toggleOverlay}>
        <Icon name="add-circle" size={200} color="#393e46" />
      </BorderlessButton>
    </View>
  );
}

const mapStateToProps = (state: app_state) => {
  return {
    inr: state.portReducer.inr,
    counter: state.portReducer.counter,
  };
};

export default connect(mapStateToProps)(NewCoin);
