import styled from 'styled-components/native';
import Input from '~/components/Input';
import Button from '~/components/Button';

import { colors } from '~/styles/colors';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${colors.primary};
`;

export const FormContainer = styled.View`
  align-self: stretch;
  margin-top: 50px;
  padding: 0 25px;
`;

export const Logo = styled.Image.attrs({
  tintColor: '#fff',
})``;

export const LoginInput = styled(Input)`
  margin-bottom: 15.5px;
`;

export const LoginButton = styled(Button)`
  background-color: #82bf18;
`;
