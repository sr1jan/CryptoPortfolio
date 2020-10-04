import React, {useContext} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from '../styles/styles';
import {CoinInputContext} from '../context/coinInputContext';

function NewCoin() {
  const {colors} = useTheme();
  const {toggleModal} = useContext(CoinInputContext);

  return (
    <View style={styles.mainContent}>
      <TouchableOpacity onPress={toggleModal} activeOpacity={0.7}>
        <Icon name="add-circle" size={200} color={colors.accent} />
      </TouchableOpacity>
    </View>
  );
}

export default NewCoin;
