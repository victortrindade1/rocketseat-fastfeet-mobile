import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  PhotoAvatar,
  ProfileContainer,
  Row,
  Label,
  LabelText,
  ProfileText,
  LogoutButton,
} from './styles';

export default function Profile() {
  return (
    <Container>
      <PhotoAvatar />
      <ProfileContainer>
        <Row>
          <Label>
            <LabelText>Nome completo</LabelText>
            <ProfileText>Gaspar Antunes</ProfileText>
          </Label>
        </Row>
        <Row>
          <Label>
            <LabelText>E-mail</LabelText>
            <ProfileText>example@rocketseat.com.br</ProfileText>
          </Label>
        </Row>
        <Row>
          <Label>
            <LabelText>Data de cadastro</LabelText>
            <ProfileText>10/01/2020</ProfileText>
          </Label>
        </Row>
      </ProfileContainer>
      <LogoutButton />
    </Container>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={20} color={tintColor} />
  ),
};
