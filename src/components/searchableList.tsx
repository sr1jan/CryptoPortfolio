import React from 'react';
import {View, Text} from 'react-native';
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
      <RectButton onPress={() => props.setValue(title)}>
        <View
          accessible
          style={{...styles.dropDownView, backgroundColor: colors.accent}}>
          <Text style={{...styles.dropDownText, color: colors.text}}>
            {title.toUpperCase()}
          </Text>
        </View>
      </RectButton>
    );
  };

  const results = props.data.filter(val =>
    val.startsWith(props.value.toLowerCase()),
  );

  return (
    <View style={{alignSelf: 'stretch'}}>
      <FlatList
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
