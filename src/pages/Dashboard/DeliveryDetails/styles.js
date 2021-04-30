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
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
  // ########### Shadow effects ###########
})`
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
  padding: 15px;
`;

export const Title = styled.View`
  flex-direction: row;
`;

export const IconStyled = styled(Icon).attrs({
  size: 22,
})`
  color: ${colors.primary};
`;

export const TitleText = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 14px;
  padding-left: 5px;
`;

export const Row = styled.View`
  margin-top: 15px;
`;

export const RowTitle = styled.Text`
  color: #999;
  font-weight: bold;
  font-size: 14px;
`;

export const RowText = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const Div = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const SubMenuContainer = styled.View``;
