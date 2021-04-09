import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { colors } from '~/styles/colors';

import {
  Container,
  HeaderContainer,
  UserContainer,
  UserAvatar,
  UserNameContainer,
  WelcomeText,
  UserName,
  LogoutContainer,
  DeliveriesContainer,
} from './styles';

export default function Dashboard() {
  const user = useSelector(state => state.user);

  console.tron.log(user.profile.avatar.url);

  return (
    <Container>
      <HeaderContainer>
        <UserContainer>
          <UserAvatar
            source={
              user.profile?.avatar
                ? {
                    uri: __DEV__
                      ? // O Android não aceita http://localhost, apenas https
                        'https://avatars.githubusercontent.com/u/40868932?s=400&u=a6990d8f4600c7503111aaa2448b37f4c86f2a91&v=4'
                      : user.profile.avatar.url,
                  }
                : null
            }
          />
          <UserNameContainer>
            <WelcomeText>Bem-vindo de volta,</WelcomeText>
            <UserName>{user.profile.name}</UserName>
          </UserNameContainer>
        </UserContainer>

        <LogoutContainer>
          <TouchableOpacity onPress={() => {}}>
            <Icon name="logout" size={25} color={colors.red} />
          </TouchableOpacity>
        </LogoutContainer>
      </HeaderContainer>

      <DeliveriesContainer />
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="reorder" size={20} color={tintColor} />
  ),
};
