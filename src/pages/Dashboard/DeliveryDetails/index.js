import React from 'react';

import Background from '~/components/Background';

import {
  Container,
  Title,
  IconStyled,
  TitleText,
  Row,
  RowTitle,
  RowText,
  Div,
  SubMenuContainer,
} from './styles';

const DeliveryDetails = ({ navigation }) => {
  const delivery = navigation.state.params;

  delivery.recipient.address = `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zipcode}`;

  const status = () => {
    if (delivery.canceled_at) {
      return 'Cancelado';
    } else if (!delivery.start_date) {
      return 'Pendente';
    } else if (delivery.end_date) {
      return 'Entregue';
    } else {
      return 'Retirado';
    }
  };

  delivery.status = status();

  return (
    <Background>
      <Container>
        <Title>
          <IconStyled name={'local-shipping'} />
          <TitleText>Informações da entrega</TitleText>
        </Title>
        <Row>
          <RowTitle>DESTINATÁRIO</RowTitle>
          <RowText>{delivery.recipient.name}</RowText>
        </Row>
        <Row>
          <RowTitle>ENDEREÇO DE ENTREGA</RowTitle>
          <RowText>{delivery.recipient.address}</RowText>
        </Row>
        <Row>
          <RowTitle>PRODUTO</RowTitle>
          <RowText>{delivery.product}</RowText>
        </Row>
      </Container>
      <Container>
        <Title>
          <IconStyled name={'event'} />
          <TitleText>Situação da entrega</TitleText>
        </Title>
        <Row>
          <RowTitle>STATUS</RowTitle>
          <RowText>{delivery.status}</RowText>
        </Row>
        <Div>
          <Row>
            <RowTitle>DATA DE RETIRADA</RowTitle>
            <RowText>{delivery.start_date_formatted}</RowText>
          </Row>
          <Row>
            <RowTitle>DATA DE ENTREGA</RowTitle>
            <RowText>{delivery.end_date_formatted}</RowText>
          </Row>
        </Div>
      </Container>

      <SubMenuContainer />
    </Background>
  );
};

export default DeliveryDetails;

DeliveryDetails.navigationOptions = {
  title: 'Detalhes da encomenda',
};
