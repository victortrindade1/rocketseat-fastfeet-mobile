import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { Alert } from 'react-native';

import api from '~/services/api';

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
  // console.tron.log(user);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const response = await api.get(
          `mobile/deliverymen/${user.profile.id}/deliveries`,
        );

        // Parsing data:
        const data = response.data.items.map(delivery => ({
          ...delivery,
          // Coloca o zero se id for menor que 10
          stringId: delivery.id <= 9 ? `0${delivery.id}` : delivery.id,
          // Format dates to dd/mm/yyyy
          start_date_formatted: delivery.start_date
            ? format(parseISO(delivery?.start_date), 'dd/MM/yyyy')
            : '--/--/--',
          end_date_formatted: delivery.end_date
            ? format(parseISO(delivery?.end_date), 'dd/MM/yyyy')
            : '--/--/--',
        }));

        setDeliveries(data);
      } catch (error) {
        Alert.alert(
          'Falha no carregamento dos dados',
          'Ocorreu um erro inesperadíssississimo',
        );
      }
    }

    loadDeliveries();
  }, []);

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
            data={deliveries}
            keyExtractor={item => String(item.id)}
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
