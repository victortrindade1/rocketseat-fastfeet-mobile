import React, { useState, useEffect, useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { Alert } from 'react-native';

import noVisibility from '~/assets/visibility-off.json';

import api from '~/services/api';

import { signOut } from '~/store/modules/auth/actions';

import Delivery from '~/components/Delivery';

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
  ListDeliveries,
  EmptyContainer,
  EmptyText,
  Lottie,
  Loading,
  LoadingMoreContainer,
  LoadingMoreSpinner,
  LoadingMoreText,
  Refresh,
} from './styles';

export default function Dashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(signOut()), []);

  // O React garante q o useState é seguro sem precisar de useCallback
  const handleFilter = status => {
    setPage(1);
    setFilter(status);
  };

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

  const handleRefresh = useCallback(async () => {
    setHasMore(false);
    setRefreshing(true);
    setDeliveries([]);
    setPage(1);

    // Por mais idêntico q seja o código com o loadDeliveries(), tenho q fazer
    // separado pq senão zera o filtro pro estado inicial 'pending'
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

      setDeliveries(parseDeliveries(response.data.items));
    } catch (error) {
      Alert.alert(
        'Falha na requisição',
        'Não foi possível buscar as entregas, por favor tente mais tarde.',
      );
    }

    setRefreshing(false);
    setHasMore(true);
  }, [api, user, filter]);

  const loadMoreDeliveries = useCallback(async () => {
    /**
     * Não faz consulta se não tiver mais.
     * Não faz consulta se já estiver fazendo consulta. Isto pq a função roda
     * sempre q o usuário chega no limite do parâmetro onEndReachedThreshold do
     * flatlist
     */
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

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

    setLoadingMore(false);
  }, [hasMore, user, filter, api, page, deliveries, loadingMore]);

  const loadDeliveries = useCallback(async () => {
    setDeliveries([]);
    setLoading(true);
    setPage(1);

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

      setDeliveries(parseDeliveries(response.data.items));
    } catch (error) {
      Alert.alert(
        'Falha no carregamento dos dados',
        'Ocorreu um erro inesperadíssississimo',
      );
    }

    setLoading(false);
  }, [api, user, filter, deliveries]);

  useEffect(() => {
    loadDeliveries();
  }, [filter]);

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
              {/* <Link onPress={() => handleFilter('pending')}> */}
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

          {loading ? (
            <Loading />
          ) : (
            <>
              {deliveries.length > 0 ? (
                <>
                  <ListDeliveries
                    data={deliveries}
                    keyExtractor={item => String(item.id)}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMoreDeliveries}
                    refreshControl={
                      <Refresh
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                      />
                    }
                    renderItem={({ item }) => <Delivery data={item} />}
                    ListFooterComponent={
                      hasMore && (
                        <LoadingMoreContainer>
                          <LoadingMoreSpinner />
                          <LoadingMoreText>Carregando...</LoadingMoreText>
                        </LoadingMoreContainer>
                      )
                    }
                  />
                </>
              ) : (
                <EmptyContainer>
                  <Lottie source={noVisibility} autoPlay loop />
                  <EmptyText>Não existem entregas!</EmptyText>
                </EmptyContainer>
              )}
            </>
          )}
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
