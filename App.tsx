/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import CodePush from 'react-native-code-push';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CodepushManager from './CodepushManager';

let codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.sectionContainer}>
        {/* <Text style={styles.headerText}>CodePush Test with RePack</Text> */}
        <Text style={styles.headerText}>This is the latest CodePush Test with RePack</Text>
        <CodepushManager />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// export default App;
// export default CodePush(App);
export default CodePush(codePushOptions)(App);
