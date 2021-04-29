import styled from 'styled-components/native';
import { colors } from '~/styles/colors';

export const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  position: relative;
  align-items: center;
`;

export const Header = styled.View`
  background-color: ${colors.primary};
  flex: 0.3;
  width: 100%;
`;

export const Body = styled.View`
  position: absolute;
  top: 20%;
  width: 80%;
  /* background-color: #fff; */
`;
