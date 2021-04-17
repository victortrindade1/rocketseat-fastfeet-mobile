import styled from 'styled-components/native';
import Avatar from '~/components/Avatar';

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
  max-width: 180px;
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
  color: #999;
  font-weight: bold;
  font-size: 12px;
`;

export const ListDeliveries = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  // contentContainerStyle: { padding: 30 },
})``;
