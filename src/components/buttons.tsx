import React, {useState, useEffect} from 'react';
import {View, Text, Modal, PermissionsAndroid, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme, Switch, RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import {material} from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import qs from 'qs';

import {app_state, port_state, returns_state} from '../types';
import {styles} from '../styles/styles';
import AlertModal from '../modals/alertModal';
import ActionModal from '../modals/actionModal';
import SnackBar from '../modals/snackBar';
import Loading from './loading';

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

const requestPermission = async (): Promise<boolean> => {
  if (
    !(await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ))
  ) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return false;
  }
  if (
    !(await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ))
  ) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return false;
  }
  return true;
};

export const ExportData = () => {
  const {colors} = useTheme();
  const [visible, setModal] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({visible: false, msg: ''});
  const [file, setFile] = useState('');
  const portData: port_state = useSelector<app_state>(
    state => state.portReducer,
  );
  const returnsData: returns_state = useSelector<app_state>(
    state => state.returnsReducer,
  );

  const toggleModal = () => setModal(!visible);
  const toggleSnack = () => setSnackBar(!snackBar);
  const toggleError = () => setError({...error, visible: !error.visible});

  useEffect(() => {
    if (!snackBar) return;
    const _snackTimeout = setTimeout(() => {
      setSnackBar(false);
    }, 5000);
    return () => clearTimeout(_snackTimeout);
  }, [snackBar]);

  useEffect(() => {
    if (!error) return;
    const _snackTimeout = setTimeout(() => {
      setError({...error, visible: false});
    }, 5000);
    return () => clearTimeout(_snackTimeout);
  }, [error]);

  const handleOpen = async () => {
    try {
      await RNFetchBlob.android.actionViewIntent(file, 'text/plain');
    } catch (e) {
      console.log(e);
    }
  };

  const exportData = async () => {
    setModal(false);

    const granted = await requestPermission();
    if (!granted) {
      setError({visible: true, msg: 'Permissions required to export data!'});
      return;
    }

    if (portData.counter < 1) {
      setError({
        visible: true,
        msg: 'No data to export, try adding coins.',
      });
      return;
    }

    setLoading(true);
    const fs = RNFetchBlob.fs;
    const dir = `/storage/emulated/0/CryptoPortfolio/exported_data`;
    const data = {};
    try {
      data['Total Coins'] = portData.counter;
      data['Currency'] = portData.currency;
      data['Total Investment'] = portData[portData.currency].totalInvestment;
      data['Total Return'] = portData[portData.currency].totalPortAmount;
      data['Total Return %'] = portData[portData.currency].totalPortPercent;
      data['Coins'] = portData.token;
      /* data['Returns'] = returnsData[portData.currency]['returns'].flatMap( */
      /*   (val, i) => */
      /*     i % 15 !== 0 ? [] : {Date: returnsData.time[i], Return: val}, */
      /* ); */
      data['Returns'] = returnsData[portData.currency]['returns'].flatMap(
        (val, i) => ({Date: returnsData.time[i], Return: val}),
      );
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError({visible: true, msg: 'Something went wrong, try later!'});
      return;
    }

    const date = `${new Date()
      .toString()
      .slice(0, 15)} ${new Date().toLocaleString().slice(11, 22)}`;
    const filePath = `${dir}/${date.replace(/\s/g, '_')}.json`;
    try {
      if (await fs.isDir(dir)) {
        await fs.createFile(filePath, JSON.stringify(data), 'utf8');
      } else {
        await fs.mkdir(dir);
        await fs.createFile(filePath, JSON.stringify(data), 'utf8');
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      setError({visible: true, msg: 'Something went wrong, try again later!'});
      return;
    }

    setLoading(false);
    setFile(filePath);
    setSnackBar(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Icon
          name="file-download"
          size={ICON_SIZE}
          color={colors.notification}
        />
      </TouchableOpacity>
      {loading && (
        <Modal visible={loading} transparent={true}>
          <Loading />
        </Modal>
      )}
      {visible && (
        <AlertModal
          title="Confirm to export"
          description="This will export the data as a JSON file."
          suppress={toggleModal}
          act={exportData}
          actText="Export"
          suppressText="Cancel"
          visible={visible}
        />
      )}
      {snackBar && (
        <SnackBar
          visible={snackBar}
          msgText="Data Exported Successfully!"
          act={handleOpen}
          actText="Open"
          suppress={toggleSnack}
        />
      )}
      {error && (
        <SnackBar
          visible={error.visible}
          msgText={error.msg}
          suppress={toggleError}
        />
      )}
    </View>
  );
};

export const TwitterButton = () => {
  const {colors} = useTheme();
  const twitterURL = 'https://twitter.com/sr1jann';

  return (
    <TouchableOpacity onPress={() => Linking.openURL(twitterURL)}>
      <Icon name="twitter" size={ICON_SIZE} color={colors.notification} />
    </TouchableOpacity>
  );
};

export const MailButton = () => {
  const {colors} = useTheme();
  const email = 'srofficialsingh@gmail.com';

  const sendEmail = async to => {
    let url = `mailto:${to}`;
    const query = qs.stringify({subject: 'CryptoPortfolio: '});
    url += `?${query}`;
    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) {
      throw new Error('Provided URL can not be handled');
    }
    return Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={async () => await sendEmail(email)}>
      <Icon name="email" size={ICON_SIZE} color={colors.notification} />
    </TouchableOpacity>
  );
};
