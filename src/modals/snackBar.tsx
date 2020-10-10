import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {material} from 'react-native-typography';
import {styles} from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface snackBarType {
  act?: () => void;
  suppress: () => void;
  actText?: string;
  msgText: string;
  visible: boolean;
}

const SnackBar = (props: snackBarType) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      transparent={true}
      onRequestClose={props.suppress}>
      <View
        style={{
          ...styles.modalMain,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0)',
        }}>
        <View
          style={{
            ...styles.modalView,
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginHorizontal: 15,
            marginBottom: 20,
            borderRadius: 3,
            elevation: 2,
            backgroundColor: colors.background,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                ...material.body1Object,
                color: colors.placeholder,
                fontSize: 14,
                letterSpacing: 0.3,
                marginRight: 5,
              }}>
              {props.msgText}
            </Text>
            {props.actText !== undefined && (
              <TouchableOpacity onPress={props.act}>
                <Text
                  style={{
                    ...material.buttonObject,
                    color: colors.notification,
                    fontSize: 14,
                    letterSpacing: 1,
                  }}>
                  {props.actText.toUpperCase()}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={props.suppress}>
              <Text
                style={{
                  ...material.buttonObject,
                  color:
                    props.actText === undefined
                      ? colors.notification
                      : colors.placeholder,
                  fontSize: 14,
                  letterSpacing: 1,
                }}>
                HIDE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SnackBar;
