import React, {useState} from 'react';
import {View} from 'react-native';
import {useTheme, Surface} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../styles/styles';
import {ReturnsGraph} from '../components/returnsGraph';

export const ReturnsGraphView = () => {
  const {colors, dark} = useTheme();
  const [graphType, setGraphType] = useState<'line' | 'bar'>('line');

  return (
    <Surface
      style={{
        ...styles.surface,
        backgroundColor: colors.accent,
        height: '65%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          marginBottom: 5,
        }}>
        <TouchableOpacity
          onPress={() => setGraphType('line')}
          style={{marginHorizontal: 2}}>
          <Icon
            name="chart-line"
            color={graphType === 'line' ? colors.onSurface : colors.placeholder}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGraphType('bar')}
          style={{marginHorizontal: 2}}>
          <Icon
            name="chart-bar"
            color={graphType === 'bar' ? colors.onSurface : colors.placeholder}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <ReturnsGraph graphType={graphType} />
    </Surface>
  );
};
