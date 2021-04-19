import React from 'react';

import {
  Container,
  DivTimeLine,
  Line,
  DivLabel,
  SubDivLabel,
  Status,
  StatusLabel,
} from './styles';

const Timeline = ({ waiting, start, finish }) => {
  return (
    <Container>
      <DivTimeLine>
        <Line />
        <Status checked={waiting} />
        <Status checked={start} />
        <Status checked={finish} />
      </DivTimeLine>

      <DivLabel>
        <SubDivLabel>
          <StatusLabel>Aguardando</StatusLabel>
          <StatusLabel>Retirada</StatusLabel>
        </SubDivLabel>
        <SubDivLabel>
          <StatusLabel>Retirada</StatusLabel>
        </SubDivLabel>
        <SubDivLabel>
          <StatusLabel>Entregue</StatusLabel>
        </SubDivLabel>
      </DivLabel>
    </Container>
  );
};

export default Timeline;
