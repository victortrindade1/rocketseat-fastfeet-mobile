import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';

import Background from '~/components/Background';

import api from '~/services/api';

import { TInput, SendButton, ContadorContainer, Contador } from './styles';

const AddProblem = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    problemTextInput: Yup.string()
      .min(3, 'Mensagem vazia!')
      .max(500, 'Você excedeu o limite de 500 caracteres.')
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

  const onSubmit = async () => {
    try {
      const problemText = getValues('problemTextInput');

      const deliveryId = navigation.state.params;

      await api.post(`delivery/${deliveryId}/problems`, {
        description: problemText,
        delivery_id: deliveryId,
      });

      // Mostrar toast de OK
      // Zerar navigation stack
      // Direcionar pro dashboard

      Toast.show('teste');
    } catch (error) {
      Alert.alert(
        'Falha no envio',
        'Não foi possível enviar o problema, por favor tente mais tarde.',
      );
    }
  };

  useEffect(() => {
    setValue('problemTextInput', '');
    clearErrors();
  }, []);

  return (
    <Background>
      <TInput
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        control={control}
        errors={errors}
        name="problemTextInput"
        multiline
        numberOfLines={15}
        // onSubmitEditing={handleSubmit(onSubmit)}
      />

      <SendButton onPress={handleSubmit(onSubmit)}>Enviar</SendButton>

      <ContadorContainer>
        <Contador>{String(char).length} / 500</Contador>
      </ContadorContainer>
    </Background>
  );
};

export default AddProblem;

AddProblem.navigationOptions = {
  title: 'Informar problema',
};
