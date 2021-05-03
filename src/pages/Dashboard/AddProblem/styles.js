import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { colors } from '~/styles/colors';

export const TInput = styled(Input)`
  padding: 20px 20px;
`;

export const SendButton = styled(Button)`
  background-color: ${colors.primary};
  margin-top: 20px;
`;

export const ContadorContainer = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const Contador = styled.Text`
  color: #999;
  font-size: 12px;
`;
