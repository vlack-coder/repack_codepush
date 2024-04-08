/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Federated, Script, ScriptManager} from '@callstack/repack/client';

const resolveUrl = () => {

  const resolveURL = Federated.createURLResolver({
    containers: {
      // BusinessTv: 'http://localhost:9003/[name][ext]',
      // app1: 'http://localhost:9005/[name][ext]',
      // MiniApp: 'http://localhost:9000/[name][ext]',
    },
  });
  // Create resolve function
  ScriptManager.shared.addResolver(async (scriptId, caller) => {
    // Try to resolve URL based on scriptId and caller
    let url;
    console.log('caller', caller);
    if (caller === 'main') {
      url = Script.getDevServerURL(scriptId);
    } else {
      url = resolveURL(scriptId, caller);
      console.log('urlmememe', url);
    }
    if (!url) {
      return undefined;
    }
    console.log('urlssuwggy', url);

    return {
      url,
      cache: false, // For development
      timeout: 1000000,
      query: {
        platform: Platform.OS,
      },
      verifyScriptSignature: __DEV__ ? 'off' : 'strict',
    };
  });
};
resolveUrl();

AppRegistry.registerComponent(appName, () => App);
