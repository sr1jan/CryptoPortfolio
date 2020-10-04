import React from 'react';
import {View} from 'react-native';
import {useTheme, Portal, Modal, Text} from 'react-native-paper';

interface Props {
  title: string;
  description: string;
  act: () => void;
  suppress: () => void;
  visible: boolean;
}

export const AlertModal = (props: Props) => {
  const {colors} = useTheme();
  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.suppress}>
        <View
          style={{
            height: 150,
            width: 150,
            backgroundColor: colors.background,
          }}>
          <Text>{props.title}</Text>
          <Text>{props.description}</Text>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
            <Text onPress={props.act}>Act</Text>
            <Text onPress={props.suppress}>Suppress</Text>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
