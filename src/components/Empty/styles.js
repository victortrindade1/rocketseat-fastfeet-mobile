import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

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
