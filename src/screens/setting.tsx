import React, {useRef, MutableRefObject} from 'react';
import {View, Text, Linking} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {material} from 'react-native-typography';
import {useTheme, Surface} from 'react-native-paper';
import qs from 'qs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from '../styles/styles';
import {settingSections} from '../data/settingsData';

interface rowDataProps {
  title: string;
  description?: string;
  button?: JSX.Element;
}

interface rowItemProps {
  heading: string;
  data: rowDataProps[];
  index: number;
}

export default function Setting() {
  const {colors} = useTheme();
  const settingsRef = useRef<FlatList<any>>(null);

  const RowItemChild = (props: rowDataProps) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginLeft: 10,
        }}>
        {props.description !== undefined ? (
          <View
            style={{
              flexDirection: 'column',
              width: '85%',
            }}>
            <Text
              style={{
                ...material.titleObject,
                color: colors.text,
                fontSize: 14,
              }}>
              {props.title}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={2}
              style={{
                ...material.subheadingObject,
                color: colors.placeholder,
                fontSize: 12,
              }}>
              {props.description}
            </Text>
          </View>
        ) : (
          <Text style={{...material.titleObject, color: colors.text}}>
            {props.title}
          </Text>
        )}
        {props.button}
      </View>
    );
  };

  const RowItem = (props: rowItemProps) => {
    return (
      <Surface
        style={{
          ...styles.surface,
          alignItems: 'stretch',
          width: '94%',
          marginHorizontal: 11,
          marginTop: props.index > 0 ? 0 : 10,
          backgroundColor: colors.accent,
          paddingHorizontal: 12,
          paddingBottom: 5,
        }}>
        <View style={{padding: 2}}>
          <Text
            style={{
              ...material.captionObject,
              color: colors.placeholder,
              marginBottom: 10,
              letterSpacing: 1.2,
            }}>
            {props.heading}
          </Text>
          <FlatList
            data={props.data}
            keyExtractor={item => item.title}
            renderItem={({item}) => (
              <RowItemChild
                title={item.title}
                description={item.description}
                button={item.button}
              />
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  borderWidth: 0.2,
                  borderColor: colors.background,
                  marginLeft: 10,
                  marginVertical: 10,
                }}
              />
            )}
          />
        </View>
      </Surface>
    );
  };

  const SettingFooter = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            settingsRef.current?.scrollToIndex({index: 0, animated: true})
          }>
          <Icon
            name="arrow-up-circle-outline"
            color={colors.accent}
            size={50}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
      }}>
      <FlatList
        ref={settingsRef}
        data={settingSections}
        keyExtractor={item => item.heading}
        renderItem={({item, index}) => (
          <RowItem heading={item.heading} data={item.data} index={index} />
        )}
        ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
        ListFooterComponent={() => <SettingFooter />}
      />
    </View>
  );
}
