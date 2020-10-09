import React, {useRef, useState} from 'react';
import {View, Animated, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {RectButton} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

import AlertModal from '../modals/alertModal';

export const SwipeableReturns = props => {
  const swipeRef = useRef();
  const dispatch = useDispatch();
  const [visible, toggleAlert] = useState(false);
  const {colors} = useTheme();

  const toggleAlertModal = () => toggleAlert(!visible);

  const deleteCoin = (): void => {
    toggleAlertModal();
    swipeRef.current.close();
    dispatch({type: 'DELETE_COIN', index: props.index});
  };

  const cancelDelete = (): void => {
    swipeRef.current.close();
    toggleAlertModal();
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 55, 105, 106],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <>
        <View
          style={{
            ...styles.rightAction,
            marginVertical: 5,
            marginHorizontal: 10,
            marginTop: props.index > 0 ? 5 : 10,
            width: '94%',
          }}>
          <AnimatedIcon
            name="delete-forever"
            size={30}
            color={colors.notification}
            style={[styles.actionIcon, {transform: [{translateX: scale}]}]}
          />
        </View>
        {visible && (
          <AlertModal
            title="Are you sure?"
            description="This coin will be permanently deleted from your portfolio."
            act={deleteCoin}
            suppress={cancelDelete}
            actText="Delete"
            suppressText="Cancel"
            visible={visible}
          />
        )}
      </>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      friction={1.2}
      onSwipeableRightOpen={toggleAlertModal}
      renderRightActions={renderRightActions}
      rightThreshold={100}
      {...props}
    />
  );
};
