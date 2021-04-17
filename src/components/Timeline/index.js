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

const Timeline = () => {
  return (
    <Container>
      <DivTimeLine>
        <Line />
        <Status checked={true} />
        <Status checked={true} />
        <Status checked={false} />
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
