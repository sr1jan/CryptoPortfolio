import React, {useEffect} from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import {useSelector, useDispatch} from 'react-redux';
import isEqual from 'lodash/isEqual';

import {UpdateCoins} from './helpers/coinOperations';
import {app_state, token_prop} from './types';

export const BackgroundTasks = props => {
  const dispatch = useDispatch();
  const token: token_prop[] = useSelector<app_state, token_prop[]>(
    state => state.portReducer.token,
    isEqual,
  );

  const priceDataUpdate = (data: object) => {
    dispatch({type: 'ADD_PRICE_DATA', data: data});
  };

  const updatePrices = (coinDetail: token_prop, idx: number) => {
    dispatch({type: 'UPDATE_PRICES', newCoinDetail: coinDetail, idx: idx});
  };

  useEffect(() => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        forceAlarmManager: false,
        enableHeadless: true,
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
        requiresCharging: false,
        requiresDeviceIdle: false,
        requiresBatteryNotLow: false,
        requiresStorageNotLow: false,
      },
      async taskId => {
        console.log('[js] Received background-fetch event: ', taskId);

        await UpdateCoins({
          token: token,
          priceDataUpdate: priceDataUpdate,
          updatePrices: updatePrices,
        });

        console.log(
          '[js] Successfully implemented background-fetch event: ',
          taskId,
        );

        BackgroundFetch.finish(taskId);
      },
      error => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );

    BackgroundFetch.status(status => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  }, []);

  return <>{props.children}</>;
};
