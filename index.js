/**
 * @format
 */
require.include('react-native-svg') 
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Federated, Script, ScriptManager} from '@callstack/repack/client';

const resolveUrl = () => {
  const resolveURL = Federated.createURLResolver({
    containers: {
      // ghanawater: 'http://localhost:9002/[name][ext]',
      ghanawater:
        'https://github.com/coderkomal/minighana/releases/download/Ghana/[name][ext]',

      // BusinessTv: 'http://localhost:9003/[name][ext]',
      BusinessTv:
        'https://github.com/coderkomal/miniapp/releases/download/TV/[name][ext]',
      // app1: 'http://localhost:9005/[name][ext]',
      // MiniApp: 'http://localhost:9000/[name][ext]',
      MiniApp:
        'https://github.com/vlack-coder/electricpack/releases/download/test1/[name][ext]',
      //   'https://github.com/vlack-coder/electricpack/releases/download/test2/[name][ext]',
      // // app1: 'https://github.com/vlack-coder/repacbundle/releases/download/repack-android/[name][ext]',
    },
  });
  // Create resolve function
  ScriptManager.shared.addResolver(async (scriptId, caller) => {
    // Try to resolve URL based on scriptId and caller
    let url;
    const callers = {};
    // ScriptManager.shared
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
      shouldUpdateScript: async (scriptId, caller, isScriptCacheOutdated) => {
        if (caller && callers[caller] !== undefined) {
          return callers[caller];
        }

        if (!isScriptCacheOutdated) {
          return true;
        }

        const shouldUpdate = await alertAsync(
          'Update available',
          'A new version of the app is available. Do you want to update?',
        );

        if (!caller) {
          callers[scriptId] = shouldUpdate;
        }

        return shouldUpdate;
      },
    };
  });
};
resolveUrl();

AppRegistry.registerComponent(appName, () => App);
