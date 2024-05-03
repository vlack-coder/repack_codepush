import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import QRCode from 'qrcode';
import encrypt, {decrypt} from '../utils/cryptojs';
import CryptoJS from 'crypto-js';
// import {v4 as uuid} from 'uuid';
// import {Yansh} from  'react-native-get-random-values'


const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  QRCode.toDataURL('I am a pony!', function (err, url) {
    console.log(url);
  });

  // console.log(uuid())
  const a = encrypt({love: 'yes'});

  console.log('a', a);
  // Yansh.
  const handleLogin = async () => {
    // Perform validation, e.g., check if fields are not empty

    // Call login function from AuthContext to authenticate user
    // login();
    // const ass = await decrypt('0+sgFG+pZPLPGFTrb5Ril9fwELmy74pp5la2VB1Z87s=');
    // var salt = await CryptoJS.lib.WordArray.random(128 / 8);
    // console.log('salt', salt)
    // const ass = await CryptoJS.PBKDF2('Secret Passphrase', salt, {keySize: 256 / 32});
    // const derivedKey = ass.toString(CryptoJS.enc.Hex);
    // // console.log('ass', ass);
    // console.log('derivedKey', derivedKey)
    // const keyLength = 32; // 32 bytes for a 256-bit key
    const randomBytes = await CryptoJS.randomBytes(8)
    // // const randomBytes = CryptoJS.lib.WordArray.random(keyLength);
    console.log(' randomBytes.toString();', randomBytes.toString());
    // return randomBytes.toString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={'#000'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={'#000'}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default LoginScreen;
