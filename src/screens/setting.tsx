import React from 'react';
import {View, Linking} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useTheme, Surface, Text, Title, Paragraph} from 'react-native-paper';
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

  const RenderRowItem = (props: rowDataProps) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          marginBottom: 5,
        }}>
        {props.description !== undefined ? (
          <View
            style={{
              flexDirection: 'column',
            }}>
            <Text style={{color: colors.text}}>{props.title}</Text>
            <Paragraph style={{color: colors.placeholder, fontSize: 10}}>
              {props.description}
            </Paragraph>
          </View>
        ) : (
          <Text style={{color: colors.text}}>{props.title}</Text>
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
        }}>
        <View style={{padding: 2}}>
          <Title style={{color: colors.placeholder, marginBottom: 5}}>
            {props.heading}
          </Title>
          <FlatList
            data={props.data}
            keyExtractor={item => item.title}
            renderItem={({item}) => (
              <RenderRowItem
                title={item.title}
                description={item.description}
                button={item.button}
              />
            )}
            ItemSeparatorComponent={() => <View style={{marginBottom: 5}} />}
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
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={async () => await Linking.openURL(url)}>
          <Text
            style={{
              color: colors.notification,
              fontSize: 12,
              fontFamily: 'monospace',
              textDecorationLine: 'underline',
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
