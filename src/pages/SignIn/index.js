import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '~/components/Button';

import { Container, LoginInput } from './styles';

export default function SignIn() {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = data => console.log(data);

  return (
    <Container>
      <LoginInput
        icon="call"
        placeholder="Digite seu nome"
        control={control}
        errors={errors}
        name="login"
      />
      <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
    </Container>
  );
}
