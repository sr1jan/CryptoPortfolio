import React from 'react';
import {ListItem} from 'react-native-elements';
import {theme_prop} from '../types';

interface Props {
  theme: theme_prop;
  toggleOverlay: () => void;
}

export default function NewCoin(props: Props) {
  return (
    <ListItem
      key="add"
      containerStyle={{
        backgroundColor: props.theme.card,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={props.toggleOverlay}
      title="click here to add a new coin"
      titleStyle={{
        fontSize: 15,
        fontFamily: 'monospace',
        fontStyle: 'italic',
        color: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      chevron={{color: 'lightgrey', size: 15}}
    />
  );
}
