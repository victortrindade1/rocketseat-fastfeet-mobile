import styled from 'styled-components/native';

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
`;

export const UserAvatar = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  margin-left: 20px;
`;

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

export const DeliveriesContainer = styled.View``;
