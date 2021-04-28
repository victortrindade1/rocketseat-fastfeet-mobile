import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

import { colors } from '~/styles/colors';

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})``;

export const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  color: #ddd;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;

export const Lottie = styled(LottieView)`
  width: 80px;
  height: 80px;
`;

export const Loading = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#7D40E7',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingMoreContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 5px;
  padding-bottom: 10px;
`;

export const LoadingMoreSpinner = styled(ActivityIndicator).attrs({
  size: 'small',
  color: '#7D40E7',
})``;

export const LoadingMoreText = styled.Text`
  color: #999;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Refresh = styled.RefreshControl.attrs({
  colors: [colors.primary, '#9Bd35A'],
})``;
