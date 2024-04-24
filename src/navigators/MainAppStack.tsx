import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import EmptyScreen from '../screens/EmptyScreen';
// import SignupScreen from '../screens/SignupScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="mainstack"
      // screenOptions={{
      // }}
    >
      <Stack.Screen name="mainstack" component={EmptyScreen} />
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
