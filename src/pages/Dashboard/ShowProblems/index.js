import React from 'react';

import Background from '~/components/Background';

import {
  TitleContainer,
  Title,
  ListProblems,
  ProblemContainer,
  Message,
  Date,
} from './styles';

const data = [
  {
    id: 1,
    message: 'Destinatário ausente',
    date: '14/01/2020',
  },
  {
    id: 2,
    message: 'Destinatário ausente',
    date: '15/01/2020',
  },
];

// * Aqui vou fazer request pra api a partir do delivery id q foi passado no store do navigation
const ShowProblems = ({ navigation }) => {
  const { stringId } = navigation.state.params;
  const { id } = navigation.state.params;

  return (
    <Background isFlatlist={true}>
      <TitleContainer>
        <Title>Encomenda {stringId}</Title>
      </TitleContainer>

      <ListProblems
        keyExtractor={item => String(item.id)}
        data={data}
        renderItem={({ item }) => (
          <ProblemContainer>
            <Message>{item.message}</Message>
            <Date>{item.date}</Date>
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
