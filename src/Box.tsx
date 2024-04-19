import {View, Text} from 'react-native';
import React from 'react';
import Animated, {BounceInDown, BounceInUp, BounceOutDown} from 'react-native-reanimated';

const Box = () => {
  return (
    <Animated.View
    //   layout={BounceInDown.delay(2000)}
      entering={BounceInUp.delay(500)}
      exiting={BounceOutDown}
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
      }}
    />
  );
};

export default Box;
