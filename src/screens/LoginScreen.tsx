import React, {useState, useContext} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import QRCode from 'qrcode';
import encrypt, {decrypt} from '../utils/cryptojs';
import CryptoJS from 'crypto-js';
import {
  decryptPayload,
  decryptPayloadAES,
  encryptPayload,
  encryptPayloadAES,
} from '../utils/forge';
import {buttocksObj} from './paylo0ad';
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
  const [nyanshs, setNyanshs] = useState('');
  console.log('a', a);
  // Yansh.
  const handleLogin = async () => {
    // encryptPayload({love: 'love you'});
    // encryptPayload(buttocksObj)
    // encryptPayloadAES(buttocksObj);

    await decryptPayloadAES(
      'QDrb3ZM2tPbz++HZtWEP9guI78hy3Hn58dZQ2LVjBr5gUOyf7EY9Si/94ngwKea1gmVCEGdymHbZ3uEOg9JxBgl01GMtwKLXNettWaPeGR0zfDzlZl6lyVC3MZLGSLwhJZhBhoiu5aq3t2s+ejIZhnVmLCzpu+HO4p45qd0fJb6Eb7P+Ng1cJvoqscuUUiiO5CRCAHoIHUSrTJcSImR0WE9H7vI=',
      'jhtVNbd5e94nF7eC4NPAo7nXQSGcGFHfogXT4WJ3+MhFRdB22h9iifH17AD/2z3BMaIBZvaov+6vl3Pw1A86lptP2+Me7OQNzI79Zx9L+Lm/iUHbjffbBKGWTR3onIERN28pDCK1o48eFKVcP3nCGv6K2237e+99OrAJmuy/uvQ=',
    );

    // const nyansh = await decryptPayload(
    //   'p3HAqgxumXMCSeoS07BStO5g+FFh/vJ0u/Q/zMNwmYtYwXNkUznZvN4RDYGvgA52k90u974qKk25geAQyuJfTjElNcteEAJbjmoXa76Uug27UihTj9dFmVnMq6qd/OUY8s6ZmCXKcUtYPeERBYvwyO4shAPY1EuIi2hct6ZIx14=',
    // );
    // setNyanshs(nyansh);
    // decryptPayload(
    //   'O3HWeODSohc3KRego73YZThPJcEUUrrdCR9Dc+nGlzHJWBMsiay0phPHsSi+BiqWWLou20Jz3tC66yfvLuXZmEXc9MB/UWM71LDfOcFi/x7SCmsDvZ7MaU04J0NccE7qFiL/t6MpPvduhi0Xe2WHzCRXa0GUfW1c283vnuG3vMssJw8uiZfjSz1KttgLWmH37CRLUjkgchaFEiNQgUALTmDIK/hbRiRDdi0a92rfQt4LjcTddvBQzg79WxXnu86RIyII5rLyQTE8d/YP8SxSdTcjAxc8Kyyqrvx4UkmDho1nArkRuN7vS9KD7XF0r0aIc5h9uwV/CjN5typrNMeZTA==',
    // );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.title}>{JSON.stringify(nyanshs)}</Text>
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
