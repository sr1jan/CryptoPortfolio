import React from 'react';
import {View, Text} from 'react-native';
import {Icon, ThemeConsumer} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import {theme_prop} from '../types';

interface Props {
  theme: theme_prop;
  toggleOverlay: () => void;
  empty: boolean;
}

export default function NewCoin(props: Props) {
  if (props.empty) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          name="plus"
          type="font-awesome-5"
          size={150}
          color={props.theme.card}
          onPress={props.toggleOverlay}
        />
        {/* <Text style={{fontWeight: '200', color: '#808080', paddingTop: 15}}>
          Add your first coin
        </Text> */}
      </View>
    );
  } else {
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
          fontSize: 17,
          fontFamily: 'Recursive',
          fontStyle: 'italic',
          color: 'lightgrey',
          textAlign: 'center',
          letterSpacing: 2,
        }}
        chevron={{color: 'lightgrey', size: 17}}
      />
    );
  }
}
