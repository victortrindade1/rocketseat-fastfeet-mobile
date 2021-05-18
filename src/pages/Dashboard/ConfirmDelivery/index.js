import React, { useState } from 'react';
import { Alert } from 'react-native';

import api from '~/services/api';

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

const ConfirmDelivery = ({ navigation }) => {
  const [pictureUri, setPictureUri] = useState(null);
  // const [picture, setPicture] = useState(null);

  const handleSendPicture = async () => {
    try {
      const pictureName = pictureUri.split('/').pop();

      const dataFile = new FormData();

      dataFile.append('file', {
        uri: pictureUri,
        type: 'image/jpg',
        // type: 'image/jpeg',
        name: pictureName,
      });

      // Cadastra foto
      const responseFile = await api.post('delivery/signature', dataFile);

      // Atualiza deliveries
      const endDate = new Date();
      const signatureId = responseFile.data.id;
      const delivery = {
        end_date: endDate,
        signature_id: signatureId,
      };

      const { deliveryId } = navigation.state.params;

      await api.put(`mobile/deliveries/${deliveryId}`, delivery);

      // Volta pra tela anterior
      navigation.goBack();

      // Fazer toast

      // Queria q o botão de enviar só aparecesse ao tirar a foto

      // Tenho q editar um useEffect pra verificar se está concluido ao renderizar, q aí nem abre o submenu, e mostra data de entrega
    } catch (error) {
      console.tron.log(error);
    }
  };

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
