import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import Avatar from '~/components/Avatar';
import { colors } from '~/styles/colors';
import LottieView from 'lottie-react-native';

export const StatusBarStyled = styled.StatusBar.attrs({
  backgroundColor: '#fff',
})``;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;

  padding-top: 20.5px;
`;

export const UserContainer = styled.View`
  flex-direction: row;
  padding-left: 20px;
`;

export const UserAvatar = styled(Avatar)``;

export const UserNameContainer = styled.View`
  justify-content: center;
  padding: 12px;
  max-width: 80%;
`;

export const WelcomeText = styled.Text`
  color: #666;
  font-size: 12px;
`;

export const UserName = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #444;
  font-size: 22px;
  /* max-width: 180px; */
  font-weight: bold;
`;

export const LogoutContainer = styled.View`
  justify-content: center;
  margin-right: 32.5px;
`;

export const DeliveriesContainer = styled.View`
  flex: 1;
  padding: 20px 20px 0px 20px;
  background-color: #fff;
  /* align-items: center; */
`;

export const HeaderBody = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
`;

export const Link = styled.TouchableOpacity`
  padding-left: 15px;
`;

export const LinkText = styled.Text`
  color: ${props => (props.activated ? colors.primary : '#999')};
  text-decoration: ${props => (props.activated ? 'underline' : 'none')};
  font-weight: bold;
  font-size: 12px;
`;

export const ListDeliveries = styled.FlatList.attrs({
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
