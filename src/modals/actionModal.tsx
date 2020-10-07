import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {material} from 'react-native-typography';
import {alertModalType} from '../types';
import {styles} from '../styles/styles';

interface actionModalType {
  action: JSX.Element;
  visible: boolean;
  close: () => void;
  closeText: string;
}

const ActionModal = (props: actionModalType) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={props.close}>
      <View style={styles.modalMain}>
        <View
          style={{
            ...styles.modalView,
            backgroundColor: colors.background,
          }}>
          <View style={{marginBottom: 23, alignSelf: 'flex-start'}}>
            {props.action}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginRight: 5,
            }}>
            <TouchableOpacity onPress={props.close}>
              <Text
                style={{
                  ...material.buttonObject,
                  fontSize: 15,
                  marginLeft: 7,
                  color: colors.text,
                  letterSpacing: 0.1,
                }}>
                {props.closeText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActionModal;
