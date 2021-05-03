import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Background from '~/components/Background';

import { TInput, SendButton } from './styles';

const AddProblem = props => {
  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .min(3, 'Escreve alguma coisa, né...')
      .max(500, 'Você excedeu o limite de 500 caracteres.')
      .required('Campo obrigatório'),
  });

  const {
    control,
    handleSubmit,
    errors,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Background>
      <TInput
        // id="login"
        placeholder="Inclua aqui o problema que ocorreu na entrega."
        control={control}
        errors={errors}
        name="add-problem-input"
        multiline
        numberOfLines={15}
        // onSubmitEditing={handleSubmit(onSubmit)}
      />

      <SendButton>Enviar</SendButton>
    </Background>
  );
};

export default AddProblem;

AddProblem.navigationOptions = {
  title: 'Informar problema',
};
