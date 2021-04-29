import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import { Container } from './styles';

const DeliveryDetails = props => {
  console.tron.log('Delivery Details - props: ', props);

  return (
    <Background>
      <Container />
    </Background>
  );
};

export default DeliveryDetails;

DeliveryDetails.navigationOptions = ({ navigation }) => ({
  title: 'Detalhes da encomenda',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
