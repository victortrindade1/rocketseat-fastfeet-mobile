import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';
import { signFailure } from '~/store/modules/auth/actions';

import DismissKeyboard from '~/util/DismissKeyboard';

import logo from '~/assets/logo/fastfeet-logo.png';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  Container,
  FormContainer,
  LoginInput,
  LoginButton,
  Logo,
} from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .max(10, 'O ID possui até 10 caracteres')
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

  // Campo login sendo digitado pelo usuário
  const watchId = watch('login');

  const onSubmit = () => {
    try {
      dispatch(signInRequest(watchId));
    } catch (error) {
      Alert.alert(
        'Falha no login',
        'Não foi possível efetuar o login, por favor tente mais tarde.',
      );
      dispatch(signFailure);
    }
  };

  useEffect(() => {
    setValue('login', '');
    clearErrors();
  }, []);

  return (
    <>
      <DismissKeyboard>
        <Container>
          <Logo source={logo} />
          <FormContainer>
            <LoginInput
              id="login"
              icon="perm-identity"
              placeholder="Informe seu ID de cadastro"
              control={control}
              errors={errors}
              name="login"
              keyboardType="number-pad"
              autoCorrect={false}
              returnKeyType="send"
              onSubmitEditing={handleSubmit(onSubmit)}
            />
            <LoginButton onPress={handleSubmit(onSubmit)} loading={loading}>
              Entrar no sistema
            </LoginButton>
          </FormContainer>
        </Container>
      </DismissKeyboard>
    </>
  );
}
