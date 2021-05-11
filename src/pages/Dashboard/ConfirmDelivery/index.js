import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Background from '~/components/Background';

import {
  PhotoContainer,
  Photo,
  Camera,
  CameraButton,
  CameraIcon,
  SendButton,
} from './styles';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

const ConfirmDelivery = () => {
  const [pictureUri, setPictureUri] = useState(null);

  // const cameraRef = useRef(null);
  // let camera;

  const takePicture = async camera => {
    // console.tron.log('takePicture: ', cameraRef);

    try {
      // if (cameraRef) {
      if (camera) {
        // console.tron.log('camera: ', camera);
        const options = { quality: 0.5, base64: true };
        // const data = await cameraRef.current.takePictureAsync(options);
        const data = await camera.takePictureAsync(options);
        console.tron.log('Data: ', data.uri);

        setPictureUri(data.uri);
      }
    } catch (error) {
      console.tron.log('Error: ', error);
    }

    // }
  };

  return (
    <>
      <Background isFlatlist>
        {/* <PhotoContainer> */}
        {/* <Photo /> */}
        <View style={styles.container}>
          {pictureUri ? (
            <Photo source={{ uri: pictureUri }} />
          ) : (
            <RNCamera
              // ref={ref => (camera = ref)}
              style={styles.preview}
              // type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              {({ camera, status }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <View
                    style={{
                      flex: 0,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => takePicture(camera)}
                      style={styles.capture}
                    >
                      <Text style={{ fontSize: 14 }}> SNAPA </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </RNCamera>
          )}
        </View>

        {/* <CameraButton>
          <CameraIcon />
        </CameraButton> */}
        {/* </PhotoContainer> */}
        {/* <SendButton onPress={takePicture}>SNAP</SendButton> */}
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default ConfirmDelivery;

ConfirmDelivery.navigationOptions = {
  title: 'Confirmar entrega',
};
