import React, { useContext } from 'react';
import { NavigationContext } from 'react-navigation';
import { useDispatch } from 'react-redux';

import { storeDeliveryData } from '~/store/modules/delivery/actions';

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
  const dispatch = useDispatch();

  const navigation = useContext(NavigationContext);

  // const start = data.start_date ? true : false;
  const start = !!data.start_date;
  const finish = !!data.end_date;

  const status = delivery => {
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

  const parseDelivery = data => {
    const delivery = data;

    const address = `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zipcode}`;
    delivery.recipient.address = address;

    delivery.status = status(delivery);

    return delivery;
  };

  const handleLinkDetails = data => {
    const delivery = parseDelivery(data);

    // Alimenta state delivery
    dispatch(storeDeliveryData(delivery));

    navigation.navigate('DeliveryDetails');
  };

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
          <LinkDetails onPress={() => handleLinkDetails(data)}>
            <LinkDetailsText>Ver detalhes</LinkDetailsText>
          </LinkDetails>
        </Div>
      </FooterContainer>
    </Container>
  );
};

export default Delivery;
