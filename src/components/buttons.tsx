import React, {useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme, Switch} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../styles/styles';
import {AlertModal} from './alertModal';

const ICON_SIZE = 32;

export const DeletePorfolioButton = () => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [visible, toggleAlert] = useState(false);

  const deleteData = async () => {
    await dispatch({type: 'CLEAR_PORT'});
    await dispatch({type: 'DELETE_RETURNS'});
    navigation.navigate('Portfolio');
  };

  const deleteConfirm = () => {
    toggleAlert(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={deleteConfirm}>
        <Icon
          name="delete-forever"
          size={ICON_SIZE}
          color={colors.notification}
        />
      </TouchableOpacity>
      {visible && (
        <AlertModal
          title="Are you sure?"
          description="All of your data will be deleted."
          act={deleteData}
          suppress={deleteConfirm}
          actText="Delete"
          suppressText="Cancel"
          visible={visible}
        />
      )}
    </View>
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

export const SearchCoinButton = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchCoins')}>
      <Icon name="magnify" size={ICON_SIZE} color={colors.notification} />
    </TouchableOpacity>
  );
};

export const AddCoinButton = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Portfolio', {addCoin: true})}>
      <Icon name="plus" size={ICON_SIZE} color={colors.notification} />
    </TouchableOpacity>
  );
};
