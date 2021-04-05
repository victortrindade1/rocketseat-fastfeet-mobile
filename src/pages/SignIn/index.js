import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StatusBar } from 'react-native';

import DismissKeyboard from '~/util/DismissKeyboard';

import logo from '~/assets/logo/fastfeet-logo.png';
import colors from '~/styles/colors';

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
  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .min(5, 'O ID possui no mínimo 5 caracteres')
      .max(10, 'O ID possui até 10 caracteres')
      .required('Required'),
  });

  const { control, handleSubmit, errors, clearErrors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    // clearErrors();
    return console.log(data);
  };

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <>
      {console.log(errors)}
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
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
            <LoginButton onPress={handleSubmit(onSubmit)}>
              Entrar no sistema
            </LoginButton>
          </FormContainer>
        </Container>
      </DismissKeyboard>
    </>
  );
}
