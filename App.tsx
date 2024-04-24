/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import CodePush from 'react-native-code-push';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Rootstack from './src/Rootstack';
import {AuthProvider} from './src/contexts/AuthContext';

let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};

function App(): JSX.Element {
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <AuthProvider>
          <Rootstack />
        </AuthProvider>
      </SafeAreaView>
    // </GestureHandlerRootView>
  );
}

// export default App;
// export default CodePush(App);
export default CodePush(codePushOptions)(App);
