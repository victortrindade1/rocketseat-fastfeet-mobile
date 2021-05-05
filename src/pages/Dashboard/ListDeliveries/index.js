import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import { Alert } from 'react-native';

import api from '~/services/api';

import Delivery from '~/components/Delivery';
import Loading from '~/components/Loading';
import Empty from '~/components/Empty';

import {
  List,
  LoadingMoreContainer,
  LoadingMoreSpinner,
  LoadingMoreText,
  Refresh,
} from './styles';

const ListDeliveries = ({ filter, userId }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

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
        `mobile/deliverymen/${userId}/deliveries`,
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
  }, [api, filter, page]);

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
        `mobile/deliverymen/${userId}/deliveries`,
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

        // setDeliveries(valor anterior, próximo valor)
        setDeliveries([...deliveries, ...data]);
        setPage(page + 1);
      } else {
        setHasMore(false);
        setPage(1); // Zerei page pois se roda o loadMore, o page não volta pro 1 qnd muda o filtro
      }
    } catch (error) {
      Alert.alert(
        'Falha na requisição',
        'Não foi possível buscar as entregas, por favor tente mais tarde.',
      );
    }

    setLoadingMore(false);
  }, [hasMore, filter, api, page, deliveries, loadingMore]);

  const loadDeliveries = useCallback(async () => {
    setDeliveries([]);
    setLoading(true);
    setPage(1);
    try {
      const response = await api.get(
        `mobile/deliverymen/${userId}/deliveries`,
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
  }, [api, filter, page]);

  useEffect(() => {
    // Zera o hasMore e loadingMore pro loadMore não atrapalhar qnd muda filtro
    setHasMore(true);
    setLoadingMore(false);

    loadDeliveries();
  }, [filter]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {deliveries.length > 0 ? (
            <>
              <List
                data={deliveries}
                keyExtractor={item => String(item.id)}
                onEndReachedThreshold={0.5}
                onEndReached={loadMoreDeliveries}
                refreshControl={
                  <Refresh refreshing={refreshing} onRefresh={handleRefresh} />
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
            <Empty message="Não existem entregas!" />
          )}
        </>
      )}
    </>
  );
};

export default ListDeliveries;
