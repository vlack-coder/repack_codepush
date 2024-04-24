import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext, AuthProvider} from './contexts/AuthContext';
import AuthStack from './navigators/AuthStack';
import MainAppStack from './navigators/MainAppStack';
import CodepushManager from '../CodepushManager';

const Stack = createNativeStackNavigator();

const App = () => {
  const {isAuthenticated} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={MainAppStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
      <CodepushManager />
    </NavigationContainer>
  );
};

export default App