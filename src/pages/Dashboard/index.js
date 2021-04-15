import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import Delivery from '~/components/Delivery';

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
  HeaderBody,
  Title,
  FilterContainer,
  Link,
  LinkText,
  ListDeliveries,
} from './styles';

export default function Dashboard() {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  const data = [1, 2, 3, 4, 5];

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <Container>
        <HeaderContainer>
          <UserContainer>
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
              alt="Avatar"
            />
            <UserNameContainer>
              <WelcomeText>Bem-vindo de volta,</WelcomeText>
              <UserName>{user.profile.name}</UserName>
            </UserNameContainer>
          </UserContainer>

          <LogoutContainer>
            <TouchableOpacity onPress={handleLogout}>
              <Icon name="logout" size={25} color={colors.red} />
            </TouchableOpacity>
          </LogoutContainer>
        </HeaderContainer>

        <DeliveriesContainer>
          <HeaderBody>
            <Title>Entregas</Title>

            <FilterContainer>
              <Link onPress={() => navigation.navigate('Pendentes')}>
                <LinkText>Pendentes</LinkText>
              </Link>
              <Link onPress={() => navigation.navigate('Entregues')}>
                <LinkText>Entregues</LinkText>
              </Link>
            </FilterContainer>
          </HeaderBody>

          <ListDeliveries
            data={data}
            keyExtractor={item => String(item)}
            renderItem={({ item }) => <Delivery data={item} />}
          />
        </DeliveriesContainer>
      </Container>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="reorder" size={20} color={tintColor} />
  ),
};
