import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '~/styles/colors';

export const Container = styled.View.attrs({
  // ########### Shadow effects ###########
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  // ########### Shadow effects ###########
})`
  background-color: #fff;
  margin-bottom: 29px;
  border-radius: 4px;
`;

export const Title = styled.View`
  flex-direction: row;
  padding: 13px;
`;

export const DeliveryIcon = styled(Icon)`
  color: ${colors.primary};
`;

export const TitleText = styled.Text`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: bold;
  padding-left: 10px;
`;

export const FooterContainer = styled.View`
  height: 64px;
  background-color: #f8f9fd;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  border-radius: 4px;
`;

export const Div = styled.View``;

export const TimelineContainer = styled.View`
  margin: 0px 20px;
`;

export const FooterTitle = styled.Text`
  font-size: 8px;
  font-weight: bold;
  color: #999;
`;

export const FooterText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444;
`;

export const LinkDetails = styled.TouchableOpacity``;

export const LinkDetailsText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.primary};
`;
