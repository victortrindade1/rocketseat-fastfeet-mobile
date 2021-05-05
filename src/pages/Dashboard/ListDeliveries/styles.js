import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
// import LottieView from 'lottie-react-native';

import { colors } from '~/styles/colors';

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})``;

export const LoadingMoreContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  padding-bottom: 10px;
`;

export const LoadingMoreSpinner = styled(ActivityIndicator).attrs({
  size: 'small',
  color: colors.primary,
})``;

export const LoadingMoreText = styled.Text`
  color: #999;
  font-size: 12px;
  /* font-weight: bold; */
  margin-left: 10px;
`;

export const Refresh = styled.RefreshControl.attrs({
  colors: [colors.primary, '#9Bd35A'],
})``;
