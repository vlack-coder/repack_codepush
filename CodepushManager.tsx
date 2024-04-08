import {View, Text, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import CodePush from 'react-native-code-push';
import {Alert as NativeAlert, Platform} from 'react-native';
import * as Progress from 'react-native-progress';

const CodepushManager = () => {
  const [installing, setInstalling] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const codePushSyncCallback = (status: any) => {
    switch (status) {
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setDownloading(true);
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setDownloading(false);
        setInstalling(true);
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setDownloading(false);
        setInstalling(false);
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        // Show the update popup when an update is installed
        showUpdatePopup();
        break;
      default:
        // Do nothing for other status
        break;
    }
  };

  // CodePush download progress callback
  const codePushDownloadProgressCallback = (progress: any) => {
    const {receivedBytes, totalBytes} = progress;
    const progressPercent = receivedBytes / totalBytes;
    setDownloadProgress(progressPercent);
  };
  const showUpdatePopup = () => {
    NativeAlert.alert(
      'Update Available',
      'A new update is available for the app. Do you want to install it?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Install',
          onPress: () => {
            // Perform the update
            CodePush.sync(
              {
                // updateDialog: {title: 'An update is available!'},
                installMode: CodePush.InstallMode.IMMEDIATE,
              },
              codePushSyncCallback,
              codePushDownloadProgressCallback,
            );
          },
        },
      ],
      {cancelable: false},
    );
  };
  useEffect(() => {
    CodePush.checkForUpdate().then(update => {
      if (!update) {
      } else {
        showUpdatePopup();
      }
    });
  }, []);

  return (
    <View>
      <Text>CodepushManager</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={installing || downloading}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View
          style={{
            flex: 1,
            // backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
          }}>
          {installing || downloading ? (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Downloading update...
              </Text>
              <Progress.Circle
                size={100}
                color="#ffcb05"
                progress={downloadProgress}
                showsText
                formatText={() => `${Math.floor(downloadProgress * 100)}%`}
              />
            </View>
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

export default CodepushManager;
