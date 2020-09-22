import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

interface Props {
  value: string;
  data: string[];
  setValue: (val: string) => void;
}

const DropDownList = (props: Props) => {
  const Item = ({title}: {title: string}) => {
    return (
      <TouchableHighlight onPress={() => props.setValue(title)}>
        <View style={{backgroundColor: '#222831'}}>
          <Text
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              color: '#fff',
              padding: 3,
              textAlign: 'center',
            }}>
            {title.toUpperCase()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const ItemSeparator = () => {
    return (
      <View style={{height: 0.4, width: '100%', backgroundColor: 'grey'}} />
    );
  };

  const keyExtractor = (item: string, index: number) => index.toString();
  const results = props.data.filter(val => val.startsWith(props.value));
  return (
    <View style={{alignSelf: 'stretch'}}>
      <FlatList
        keyExtractor={keyExtractor}
        data={results}
        initialNumToRender={3}
        renderItem={({item}) => <Item title={item} />}
        ItemSeparatorComponent={ItemSeparator}
        style={{
          height: 85,
          borderTopWidth: 0.2,
          borderColor: 'grey',
          paddingHorizontal: 50,
        }}
      />
    </View>
  );
};

export default DropDownList;
