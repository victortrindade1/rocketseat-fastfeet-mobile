import React, { useState } from 'react';
import { Alert } from 'react-native';

import Background from '~/components/Background';

import {
  PhotoContainer,
  Photo,
  Camera,
  CameraButton,
  CameraIcon,
  SendButton,
  PendingView,
  PendingText,
} from './styles';

const ConfirmDelivery = () => {
  const [pictureUri, setPictureUri] = useState(null);

  const handleSendPicture = () => {};

  const takePicture = async camera => {
    try {
      if (camera) {
        const options = { quality: 0.5, base64: true };

        const data = await camera.takePictureAsync(options);

        setPictureUri(data.uri);
      }
    } catch (error) {
      console.tron.log('Error: ', error);
      Alert.alert('Falha ao tirar foto', 'Não foi possível tirar foto.');
    }
  };

  return (
    <Background useScroll={false}>
      <PhotoContainer>
        {pictureUri ? (
          <Photo source={{ uri: pictureUri }} />
        ) : (
          <Camera
            androidCameraPermissionOptions={{
              title: 'Permissão para usar câmera',
              message: 'Nós precisamos de sua permissão para usar a câmera.',
              buttonPositive: 'Permitir',
              buttonNegative: 'Cancelar',
            }}
          >
            {({ camera, status }) => {
              if (status !== 'READY')
                return (
                  <PendingView>
                    <PendingText>Aguardando...</PendingText>
                  </PendingView>
                );
              return (
                <CameraButton onPress={() => takePicture(camera)}>
                  <CameraIcon name={'add-a-photo'} size={50} />
                </CameraButton>
              );
            }}
          </Camera>
        )}
      </PhotoContainer>
      <SendButton onPress={handleSendPicture}>Enviar</SendButton>
    </Background>
  );
};

export default ConfirmDelivery;

ConfirmDelivery.navigationOptions = {
  title: 'Confirmar entrega',
};
