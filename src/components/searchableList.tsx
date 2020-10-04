import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {FlatList, RectButton} from 'react-native-gesture-handler';
import {styles} from '../styles/styles';

interface Props {
  value: string;
  data: string[];
  setValue: (val: string) => void;
}

const DropDownList = (props: Props) => {
  const {colors} = useTheme();

  const Item = ({title}: {title: string}) => {
    return (
      <TouchableOpacity
        onPress={() => props.setValue(title)}
        style={{...styles.dropDownView, backgroundColor: colors.background}}>
        <Text style={{...styles.dropDownText, color: colors.text}}>
          {title.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const results =
    props.value !== ''
      ? props.data.filter(val => val.startsWith(props.value.toLowerCase()))
      : props.data;

  return (
    <View style={{alignSelf: 'stretch'}}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        keyExtractor={index => index.toString()}
        data={results}
        getItemLayout={(data, index) => ({
          length: 27,
          offset: 27 * index,
          index,
        })}
        renderItem={({item}) => <Item title={item} />}
        ItemSeparatorComponent={() => (
          <View style={{...styles.separator, backgroundColor: '#000'}} />
        )}
        style={styles.dropDownBox}
      />
    </View>
  );
};

export default DropDownList;
