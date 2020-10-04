import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AlertModal} from './alertModal';

export const DeletePorfolioButton = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [visible, toggleAlert] = useState(true);

  const setAlert = () => toggleAlert(!visible);

  const deleteData = async () => {
    await dispatch({type: 'CLEAR_PORT'});
    await dispatch({type: 'DELETE_RETURNS'});
    navigation.navigate('Portfolio');
  };

  const deleteConfirm = () => {
    /* return ( */
    /*   <AlertModal */
    /*     title="Are you sure?" */
    /*     description="All of your data will be deleted" */
    /*     act={deleteData} */
    /*     suppress={setAlert} */
    /*     visible={visible} */
    /*   /> */
    /* ); */
    Alert.alert('Are you sure?', 'All of your data will be deleted.', [
      {text: 'Delete', onPress: async () => await deleteData()},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <TouchableOpacity onPress={deleteConfirm}>
      <Icon name="delete-forever" size={40} color={colors.notification} />
    </TouchableOpacity>
  );
};

export const ThemeSwitchButton = () => {
  const dispatch = useDispatch();
  const {colors, dark} = useTheme();

  const onToggleSwitch = () =>
    dispatch({type: 'SET_THEME', theme: dark ? 'light' : 'dark'});

  return (
    <Switch
      color={colors.notification}
      value={dark ? false : true}
      onValueChange={onToggleSwitch}
    />
  );
};
