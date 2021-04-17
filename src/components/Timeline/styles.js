import styled from 'styled-components/native';
import { colors } from '~/styles/colors';

export const Container = styled.View`
  background-color: #fff;
`;

export const DivTimeLine = styled.View`
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  margin: 0px 25px;
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${colors.primary};
  position: absolute;
  align-items: stretch;
  top: 4.5px;
  z-index: 9;
`;

export const Status = styled.View`
  height: 9px;
  width: 9px;
  background-color: ${props => (props.checked ? colors.primary : '#fff')};
  border-radius: 4.5px;
  border: 1px solid ${colors.primary};
  position: relative;
  z-index: 10;
`;

export const DivLabel = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 5px;
`;

export const SubDivLabel = styled.View`
  width: 55px;
  align-items: center;
`;

export const StatusLabel = styled.Text`
  font-size: 8px;
  color: #999;
`;
