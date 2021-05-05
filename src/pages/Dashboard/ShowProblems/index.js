import React, { useEffect, useCallback, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Alert } from 'react-native';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  TitleContainer,
  Title,
  ListProblems,
  ProblemContainer,
  MessageContainer,
  Message,
  DateContainer,
  Date,
} from './styles';

const ShowProblems = ({ navigation }) => {
  const { stringId } = navigation.state.params;
  const { id } = navigation.state.params;

  const [problems, setProblems] = useState([]);

  const parseResponse = useCallback(data => {
    return data.map(item => {
      item.date = format(parseISO(item.created_at), 'dd/MM/yyyy');

      return item;
    });
  }, []);

  const loadProblems = useCallback(async () => {
    try {
      const response = await api.get(`delivery/${id}/problems`);

      if (response.data.length > 0) {
        // Parsing data:
        const data = parseResponse(response.data);

        setProblems(data);
      }
    } catch (error) {
      Alert.alert(
        'Falha no carregamento dos dados',
        'Não foi possível carregar os problemas.',
      );
    }
  }, [api, id]);

  useEffect(() => {
    loadProblems();
  }, []);

  return (
    <Background isFlatlist={true}>
      <TitleContainer>
        <Title>Encomenda {stringId}</Title>
      </TitleContainer>

      <ListProblems
        keyExtractor={item => String(item.id)}
        data={problems}
        renderItem={({ item }) => (
          <ProblemContainer>
            <MessageContainer>
              <Message>{item.description}</Message>
            </MessageContainer>

            <DateContainer>
              <Date>{item.date}</Date>
            </DateContainer>
          </ProblemContainer>
        )}
      />
    </Background>
  );
};

export default ShowProblems;

ShowProblems.navigationOptions = {
  title: 'Visualizar problemas',
};
