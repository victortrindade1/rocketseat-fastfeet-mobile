import React from 'react';

import Timeline from '~/components/Timeline';

import {
  Container,
  Title,
  DeliveryIcon,
  TitleText,
  TimelineContainer,
  FooterContainer,
  FooterTitle,
  FooterText,
  Div,
  LinkDetails,
  LinkDetailsText,
} from './styles';

const Delivery = ({ data }) => {
  // const start = data.start_date ? true : false;
  const start = !!data.start_date;
  const finish = !!data.end_date;

  return (
    <Container>
      <Title>
        <DeliveryIcon name={'local-shipping'} size={22} />
        <TitleText>Encomenda {data.stringId}</TitleText>
      </Title>

      <TimelineContainer>
        <Timeline waiting={true} start={start} finish={finish} />
      </TimelineContainer>

      <FooterContainer>
        <Div>
          <FooterTitle>Data</FooterTitle>
          <FooterText>{data.start_date_formatted}</FooterText>
        </Div>
        <Div>
          <FooterTitle>Cidade</FooterTitle>
          <FooterText>{data.recipient.city}</FooterText>
        </Div>
        <Div>
          <LinkDetails>
            <LinkDetailsText>Ver detalhes</LinkDetailsText>
          </LinkDetails>
        </Div>
      </FooterContainer>
    </Container>
  );
};

export default Delivery;
