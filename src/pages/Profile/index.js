import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';

import { signOut } from '~/store/modules/auth/actions';

import {
  ScrollContainer,
  Container,
  UserAvatar,
  ProfileContainer,
  Row,
  LabelText,
  ProfileText,
  LogoutButton,
} from './styles';

export default function Profile() {
  const user = useSelector(state => state.user);

  const registerDate = format(parseISO(user.profile.created_at), 'dd/MM/yyyy');

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <ScrollContainer>
      <Container>
        <UserAvatar
          url={
            user.profile.avatar
              ? __DEV__
                ? 'https://avatars.githubusercontent.com/u/40868932?s=400&u=a6990d8f4600c7503111aaa2448b37f4c86f2a91&v=4'
                : user.profile.avatar.url
              : undefined
          }
          name={user.profile.name}
          index={0} // Não é lista
          width={136}
          textSize={60}
        />
        <ProfileContainer>
          <Row>
            <LabelText>Nome completo</LabelText>
            <ProfileText>{user.profile.name}</ProfileText>
          </Row>
          <Row>
            <LabelText>E-mail</LabelText>
            <ProfileText>{user.profile.email}</ProfileText>
          </Row>
          <Row>
            <LabelText>Data de cadastro</LabelText>
            <ProfileText>{registerDate}</ProfileText>
          </Row>
        </ProfileContainer>
        <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
      </Container>
    </ScrollContainer>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="account-circle" size={20} color={tintColor} />
  ),
};
