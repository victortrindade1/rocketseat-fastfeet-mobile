import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Container = styled.View``;

export const LoginInput = styled(Input).attrs({
  placeholderTextColor: 'rgba(255,255,255,0.8)',
})`
  font-size: 26px;
  margin-left: 10px;
  color: #edabcd;
  background-color: #3cbc8d;
`;
