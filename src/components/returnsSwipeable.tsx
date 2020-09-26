import React, {useRef} from 'react';
import {Animated, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {styles} from '../styles/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export const SwipeableReturns = props => {
  const swipeRef = useRef();
  const dispatch = useDispatch();

  const deleteCoin = async (index: number) => {
    await swipeRef.current.close();
    dispatch({type: 'DELETE_COIN', index: index});
  };

  const deleteDialog = () => {
    Alert.alert(
      'Are you sure?',
      'This coin will be permanently deleted from your portfolio.',
      [
        {text: 'Delete', onPress: () => deleteCoin(props.index)},
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => swipeRef.current.close(),
        },
      ],
    );
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.rightAction}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, {transform: [{translateX: scale}]}]}
        />
      </RectButton>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      friction={1.5}
      onSwipeableRightOpen={deleteDialog}
      renderRightActions={renderRightActions}
      rightThreshold={150}
      {...props}
    />
  );
};
