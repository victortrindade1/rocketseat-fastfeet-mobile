import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '~/styles/colors';

export const Container = styled.View`
  padding: 0 25px;
  height: 45px;
  background: #fff;
  border-color: ${({ errorStyle }) => (errorStyle ? colors.danger : '#ddd')};
  border-width: 1px;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  color: #999;
  font-size: 16px;
`;

export const InputIcon = styled(Icon)`
  color: #999;
`;

export const ErrorMessage = styled.Text`
  margin-top: -10px;
  margin-bottom: 20px;
  color: ${colors.danger};
`;
