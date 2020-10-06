import React from 'react';
import {View, Text, Linking} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {material} from 'react-native-typography';
import {useTheme, Surface} from 'react-native-paper';
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
}

export default function Setting() {
  const {colors} = useTheme();

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
          backgroundColor: colors.accent,
          paddingHorizontal: 12,
          paddingBottom: 10,
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
    const url = 'https://twitter.com/sr1jann';
    return (
      <View
        style={{
          alignItems: 'center',
          marginTop: 15,
        }}>
        <TouchableOpacity onPress={async () => await Linking.openURL(url)}>
          <Text
            style={{
              ...material.captionObject,
              color: colors.notification,
              textDecorationLine: 'underline',
              letterSpacing: 1,
            }}>
            contact developer
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginTop: 10,
      }}>
      <FlatList
        data={settingSections}
        keyExtractor={item => item.heading}
        renderItem={({item}) => (
          <RowItem heading={item.heading} data={item.data} />
        )}
        ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
        ListFooterComponent={() => <SettingFooter />}
      />
    </View>
  );
}
