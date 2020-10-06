import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {material} from 'react-native-typography';

interface Props {
  title: string;
  description: string;
  act: () => void;
  suppress: () => void;
  actText: string;
  suppressText: string;
  visible: boolean;
}

export const AlertModal = (props: Props) => {
  const {colors} = useTheme();

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={props.suppress}>
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            marginHorizontal: 26,
            paddingHorizontal: 20,
            paddingVertical: 25,
            elevation: 10,
          }}>
          <View style={{marginBottom: 23}}>
            <Text
              style={{
                ...material.titleObject,
                fontSize: 20,
                color: colors.text,
                marginBottom: 3,
              }}>
              {props.title}
            </Text>
            <Text
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
