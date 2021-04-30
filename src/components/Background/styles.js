import styled from 'styled-components/native';
import { colors } from '~/styles/colors';

export const Wrapper = styled.SafeAreaView`
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

export const ScrollContainer = styled.ScrollView.attrs({})`
  width: 90%;
  position: absolute;
  top: 20%;
  bottom: 0;
`;
