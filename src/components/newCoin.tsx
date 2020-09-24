import React from 'react';
import {View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme_prop, app_state, totalPort} from '../types';
import {connect} from 'react-redux';
import {styles} from '../styles/styles';

interface Props {
  theme: theme_prop;
  toggleOverlay: () => void;
  empty: boolean;
  inr: totalPort;
  counter: number;
}

function NewCoin(props: Props) {
  return (
    <View style={styles.mainContent}>
      <Icon
        reverse
        name="plus"
        type="font-awesome-5"
        size={90}
        color={props.theme.card}
        onPress={props.toggleOverlay}
      />
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
