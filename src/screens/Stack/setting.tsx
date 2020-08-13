import React from 'react';
import {View, Text, Alert} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
// import {styles} from '../../styles/styles';
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
      {text: 'Sure', onPress: async () => await deleteData()},
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
      <Icon
        name="delete"
        size={150}
        color={colors.card}
        onPress={deleteConfirm}
      />
      <Text style={{fontWeight: '200', color: '#808080', padding: 5}}>
        Delete Portfolio
      </Text>
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
