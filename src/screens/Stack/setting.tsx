import React from 'react';
import {View, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import {clearPort} from '../../actions/port';
import {clearPortType} from '../../types';
import {deletePortfolio} from '../../helpers/asyncStorage';

interface Props {
  clearData: () => clearPortType;
}

function Setting(props: Props) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const deleteData = async () => {
    try {
      props.clearData();
    } catch (e) {
      console.log('Could not delete the local data', e);
      return;
    }
    await deletePortfolio();
    navigation.navigate('Portfolio');
  };

  const deleteConfirm = () => {
    Alert.alert('Are you sure?', 'All of your data will be deleted.', [
      {text: 'Delete', onPress: async () => await deleteData()},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <BorderlessButton onPress={deleteConfirm}>
        <Icon name="delete-forever" size={200} color={colors.accent} />
      </BorderlessButton>
    </View>
  );
}

// const mapStateToProps = (state: app_state) => {
//   return {};
// };

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearData: () => dispatch(clearPort()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Setting);
