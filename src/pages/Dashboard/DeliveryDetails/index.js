import React, { useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import { StackActions, NavigationActions } from 'react-navigation';

import Background from '~/components/Background';

import api from '~/services/api';

import {
  Container,
  Title,
  IconStyled,
  TitleText,
  Row,
  RowTitle,
  RowText,
  Div,
  StartButton,
  SubMenuContainer,
  SubMenuButton,
  SubMenuButtonIcon,
  SubMenuButtonText,
  Separator,
} from './styles';

const DeliveryDetails = ({ navigation }) => {
  const delivery = navigation.state.params;

  const [loading, setLoading] = useState(false);

  delivery.recipient.address = `${delivery.recipient.street}, ${delivery.recipient.number}, ${delivery.recipient.city} - ${delivery.recipient.state}, ${delivery.recipient.zipcode}`;

  const navigationReset = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
    });
    navigation.dispatch(resetAction);
  };

  const handleStart = async () => {
    setLoading(true);

    try {
      const startDate = new Date();

      await api.post(`delivery/${delivery.id}`, {
        start_date: startDate,
      });

      Toast.showWithGravity('Retirado com sucesso!', Toast.LONG, Toast.TOP);

      delivery.start_date = startDate;

      delivery.status = status();

      navigationReset();
    } catch (error) {
      if (error.response) {
        console.tron.log(error.response.data);
        Alert.alert('Falha no envio', error.response.data.error);
      } else {
        Alert.alert(
          'Falha no envio',
          'Não foi possível retirar para entrega. Tente novamente mais tarde.',
        );
      }
    }

    setLoading(false);
  };

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

      {delivery.status === 'Pendente' ? (
        <StartButton onPress={handleStart} loading={loading}>
          Retirar para entrega
        </StartButton>
      ) : (
        <SubMenuContainer>
          <SubMenuButton
            onPress={() => {
              navigation.navigate('AddProblem', delivery.id);
            }}
          >
            <SubMenuButtonIcon type={'danger'} name={'highlight-off'} />
            <SubMenuButtonText>Informar{'\n'}Problema</SubMenuButtonText>
          </SubMenuButton>
          <Separator />
          <SubMenuButton
            onPress={() => {
              navigation.navigate('ShowProblems', {
                id: delivery.id,
                stringId: delivery.stringId,
              });
            }}
          >
            <SubMenuButtonIcon type={'warn'} name={'info-outline'} />
            <SubMenuButtonText>Visualizar{'\n'}Problemas</SubMenuButtonText>
          </SubMenuButton>
          <Separator />
          <SubMenuButton>
            <SubMenuButtonIcon type={'ok'} name={'check-circle-outline'} />
            <SubMenuButtonText>Confirmar{'\n'}Entrega</SubMenuButtonText>
          </SubMenuButton>
        </SubMenuContainer>
      )}
    </Background>
  );
};

export default DeliveryDetails;

DeliveryDetails.navigationOptions = {
  title: 'Detalhes da encomenda',
};
