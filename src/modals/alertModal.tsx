import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {material} from 'react-native-typography';
import {alertModalType} from '../types';
import {styles} from '../styles/styles';

const AlertModal = (props: alertModalType) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={props.suppress}>
      <View style={styles.modalMain}>
        <View
          style={{
            ...styles.modalView,
            backgroundColor: colors.background,
          }}>
          <View style={{marginBottom: 23, alignSelf: 'flex-start'}}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                ...material.titleObject,
                fontSize: 20,
                color: colors.text,
                marginBottom: 3,
              }}>
              {props.title}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={{
                ...material.subheadingObject,
                fontSize: 14,
                letterSpacing: 0.1,
                color: colors.text,
              }}>
              {props.description}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginRight: 5,
            }}>
            <TouchableOpacity onPress={props.act}>
              <Text
                style={{
                  ...material.buttonObject,
                  fontSize: 15,
                  marginRight: 7,
                  color: colors.text,
                  letterSpacing: 0.1,
                }}>
                {props.actText}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={props.suppress}>
              <Text
                style={{
                  ...material.buttonObject,
                  fontSize: 15,
                  marginLeft: 7,
                  color: colors.text,
                  letterSpacing: 0.1,
                }}>
                {props.suppressText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
