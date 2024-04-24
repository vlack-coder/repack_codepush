import React, {useContext, useState} from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Box from '../Box';

const EmptyScreen = () => {
  const {logout} = useContext(AuthContext);
  const isDarkMode = useColorScheme() === 'dark';
  const [show, setShow] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleLogin = () => {
    // Perform validation, e.g., check if fields are not empty

    // Call login function from AuthContext to authenticate user
    logout();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'green',
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          paddingHorizontal: 40,
          marginTop: 20,
        }}>
        <Button title="Logout" onPress={handleLogin} />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.headerText}>Test the money wella leiedjf</Text>
        <Text style={styles.headerText}>
          What are you saying is correct small What are you saying is correct
          small What are you saying is correct small
        </Text>

        {show && <Box />}
        <View
          style={{
            marginTop: 30,
          }}>
          <Button
            title={show ? 'Hide' : 'Show'}
            onPress={() => {
              setShow(p => !p);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  headerText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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
export default EmptyScreen;
