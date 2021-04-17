import React from 'react';

import Timeline from '~/components/Timeline';

import {
  Container,
  Title,
  DeliveryIcon,
  TitleText,
  // Timeline,
  FooterContainer,
  FooterTitle,
  FooterText,
  Div,
  LinkDetails,
  LinkDetailsText,
} from './styles';

const Delivery = () => {
  return (
    <Container>
      <Title>
        <DeliveryIcon name={'local-shipping'} size={22} />
        <TitleText>Encomenda 01</TitleText>
      </Title>

      <Timeline />

      <FooterContainer>
        <Div>
          <FooterTitle>Data</FooterTitle>
          <FooterText>15/01/2020</FooterText>
        </Div>
        <Div>
          <FooterTitle>Cidade</FooterTitle>
          <FooterText>Rio do Sul</FooterText>
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
