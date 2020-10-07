import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, Switch, RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {material} from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {app_state} from '../types';
import {styles} from '../styles/styles';
import AlertModal from '../modals/alertModal';
import ActionModal from '../modals/actionModal';

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

export const ChangeCurrencyButton = () => {
  const currency: any = useSelector<app_state>(
    state => state.portReducer.currency,
  );
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [visible, setModal] = useState(false);

  const toggleModal = () => setModal(!visible);

  const setCurrency = (value: string) => {
    dispatch({type: 'SET_CURRENCY', currency: value});
  };

  const CheckBox = () => {
    return (
      <View style={{justifyContent: 'space-between', alignItems: 'stretch'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="currency-inr" size={38} color={colors.notification} />
            <Text
              style={{
                ...material.buttonObject,
                color: colors.text,
                fontSize: 18,
              }}>
              INR
            </Text>
          </View>
          <RadioButton
            value="INR"
            uncheckedColor={colors.primary}
            status={currency === 'inr' ? 'checked' : 'unchecked'}
            color={colors.notification}
            onPress={() => setCurrency('inr')}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 50,
            }}>
            <Icon name="currency-usd" size={38} color={colors.notification} />
            <Text
              style={{
                ...material.buttonObject,
                color: colors.text,
                fontSize: 18,
              }}>
              USDT
            </Text>
          </View>
          <RadioButton
            value="USDT"
            uncheckedColor={colors.primary}
            status={currency === 'usdt' ? 'checked' : 'unchecked'}
            color={colors.notification}
            onPress={() => setCurrency('usdt')}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Icon
          name={currency === 'inr' ? 'currency-inr' : 'currency-usd'}
          size={ICON_SIZE}
          color={colors.notification}
        />
      </TouchableOpacity>

      {visible && (
        <ActionModal
          action={<CheckBox />}
          visible={visible}
          close={toggleModal}
          closeText="Close"
        />
      )}
    </View>
  );
};
