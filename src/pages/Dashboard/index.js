import React, { useState, useEffect, useCallback } from 'react';
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
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(signOut()), []);

  // O React garante q o useState é seguro sem precisar de useCallback
  const handleFilter = status => setFilter(status);

  const parseDeliveries = useCallback(data => {
    return data.map(delivery => {
      delivery.stringId = delivery.id <= 9 ? `0${delivery.id}` : delivery.id;

      delivery.start_date_formatted = delivery.start_date
        ? format(parseISO(delivery?.start_date), 'dd/MM/yyyy')
        : '--/--/--';

      delivery.end_date_formatted = delivery.end_date
        ? format(parseISO(delivery?.end_date), 'dd/MM/yyyy')
        : '--/--/--';

      return delivery;
    });
  }, []);

  const loadMoreDeliveries = useCallback(async () => {
    // Não tem mais deliveries
    if (!hasMore) return;

    try {
      const response = await api.get(
        `mobile/deliverymen/${user.profile.id}/deliveries`,
        {
          params: {
            q: filter,
            page: page + 1,
          },
        },
      );
      console.tron.log(response);
      if (response.data.items.length > 0) {
        // Parsing data:
        const data = parseDeliveries(response.data.items);
        // setState(valor anterior, próximo valor)
        setDeliveries([...deliveries, ...data]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      Alert.alert(
        'Falha na requisição',
        'Não foi possível buscar as entregas, por favor tente mais tarde.',
      );
    }
  }, [hasMore, user, filter, api, page, deliveries]);

  const loadDeliveries = useCallback(async () => {
    console.tron.log('to em load. Este é o hasMore: ', hasMore);
    setDeliveries([]);
    // setLoading(true);
    setPage(1);
    setHasMore(true);

    try {
      const response = await api.get(
        `mobile/deliverymen/${user.profile.id}/deliveries`,
        {
          params: {
            q: filter,
            page,
          },
        },
      );

      // Parsing data:
      const data = parseDeliveries(response.data.items);

      setDeliveries(data);
    } catch (error) {
      Alert.alert(
        'Falha no carregamento dos dados',
        'Ocorreu um erro inesperadíssississimo',
      );
    }
  }, [api, user, filter]);

  useEffect(() => {
    loadDeliveries();
  }, [filter]);

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
              // alt="Avatar"
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

          <ListDeliveries
            data={deliveries}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.5}
            onEndReached={loadMoreDeliveries}
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
