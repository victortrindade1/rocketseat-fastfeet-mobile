import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { StackActions, NavigationActions } from 'react-navigation';

import Background from '~/components/Background';

import api from '~/services/api';

import { TInput, SendButton, ContadorContainer, Contador } from './styles';

const AddProblem = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    problemTextInput: Yup.string()
      .min(3, 'Mensagem vazia!')
      .max(255, 'Você excedeu o limite de 255 caracteres.')
      .required('Campo obrigatório'),
  });

  const {
    control,
    handleSubmit,
    errors,
    clearErrors,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const char = watch('problemTextInput');

  const navigationReset = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
    });
    navigation.dispatch(resetAction);
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      const problemText = getValues('problemTextInput');

      const deliveryId = navigation.state.params;

      await api.post(`delivery/${deliveryId}/problems`, {
        description: problemText,
        delivery_id: deliveryId,
      });

      Toast.showWithGravity('Enviado com sucesso!', Toast.LONG, Toast.TOP);

      setLoading(false);

      navigationReset();
    } catch (error) {
      Alert.alert(
        'Falha no envio',
        'Não foi possível enviar o problema, por favor tente mais tarde.',
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue('problemTextInput', '');
    clearErrors();
  }, []);

  return (
    <Background isFlatlist={false}>
      <TInput
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        control={control}
        errors={errors}
        name="problemTextInput"
        multiline
        numberOfLines={15}
      />

      <SendButton onPress={handleSubmit(onSubmit)} loading={loading}>
        Enviar
      </SendButton>

      <ContadorContainer>
        <Contador>{String(char).length} / 255</Contador>
      </ContadorContainer>
    </Background>
  );
};

export default AddProblem;

AddProblem.navigationOptions = {
  title: 'Informar problema',
};
