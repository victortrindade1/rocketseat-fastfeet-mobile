import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import ListDeliveries from './ListDeliveries';

import { colors } from '~/styles/colors';

import {
  StatusBarStyled,
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
} from './styles';

export default function Dashboard() {
  const [filter, setFilter] = useState('pending');

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(signOut()), []);

  // O React garante q o useState é seguro sem precisar de useCallback
  const handleFilter = status => {
    setFilter(status);
  };

  return (
    <>
      <StatusBarStyled barStyle={'dark-content'} />

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
              width={68}
              textSize={31}
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
              <Link onPress={() => handleFilter('pending')}>
                <LinkText activated={filter === 'pending'}>Pendentes</LinkText>
              </Link>
              <Link onPress={() => handleFilter('delivered')}>
                <LinkText activated={filter === 'delivered'}>
                  Entregues
                </LinkText>
              </Link>
            </FilterContainer>
          </HeaderBody>

          <ListDeliveries filter={filter} userId={user.profile.id} />
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
