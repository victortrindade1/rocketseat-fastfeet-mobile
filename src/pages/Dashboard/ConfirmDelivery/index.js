import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import { storeDeliveryData } from '~/store/modules/delivery/actions';

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
  const dispatch = useDispatch();

  const deliveryStored = useSelector(state => state.delivery);

  const [pictureUri, setPictureUri] = useState(null);
  const [hasPicture, setHasPicture] = useState(false);
  const [loading, setLoading] = useState(false);

  const addFieldsDelivery = (delivery, endDate) => {
    const endDateFormatted = format(endDate, 'dd/MM/yyyy');

    return {
      ...delivery.deliveryDetails,
      end_date: endDate,
      end_date_formatted: endDateFormatted,
      status: 'Entregue',
    };
  };

  const handleSendPicture = async () => {
    try {
      setLoading(true);

      const pictureName = pictureUri.split('/').pop();

      const dataFile = new FormData();

      dataFile.append('file', {
        uri: pictureUri,
        type: 'image/jpg',
        name: pictureName,
      });

      // Cadastra foto
      const responseFile = await api.post('delivery/signature', dataFile);

      // Atualiza deliveries
      const endDate = new Date();
      const signatureId = responseFile.data.id;
      const updateDelivery = {
        end_date: endDate,
        signature_id: signatureId,
      };

      const { deliveryId } = navigation.state.params;

      await api.put(`mobile/deliveries/${deliveryId}`, updateDelivery);

      // Atualiza state
      const deliveryDetails = addFieldsDelivery(deliveryStored, endDate);
      dispatch(storeDeliveryData(deliveryDetails));

      setLoading(false);

      Toast.showWithGravity('Enviado com sucesso!', Toast.LONG, Toast.TOP);

      // Volta pra tela anterior
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        'Falha no envio',
        'Não foi possível enviar foto, por favor tente mais tarde.',
      );
      setLoading(false);
    }
  };

  const takePicture = async camera => {
    try {
      if (camera) {
        const options = { quality: 0.5, base64: true };

        const data = await camera.takePictureAsync(options);

        setPictureUri(data.uri);
        setHasPicture(true);
      }
    } catch (error) {
      Alert.alert('Falha ao tirar foto', 'Não foi possível tirar foto.');
    }
  };

  useEffect(() => {
    setHasPicture(false);
  }, []);

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
      {hasPicture && (
        <SendButton onPress={handleSendPicture} loading={loading}>
          Enviar
        </SendButton>
      )}
    </Background>
  );
};

export default ConfirmDelivery;

ConfirmDelivery.navigationOptions = {
  title: 'Confirmar entrega',
};
