import React, {useContext} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/styles';
import {CoinInputContext} from '../context/coinInputContext';

function NewCoin() {
  const {colors} = useTheme();
  const {toggleModal} = useContext(CoinInputContext);

  return (
    <View style={styles.mainContent}>
      <BorderlessButton onPress={toggleModal}>
        <Icon name="add-circle" size={200} color={colors.accent} />
      </BorderlessButton>
    </View>
  );
}

export default NewCoin;
