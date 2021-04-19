import styled from 'styled-components/native';

import Avatar from '~/components/Avatar';
import Button from '~/components/Button';

export const ScrollContainer = styled.ScrollView`
  background-color: #fff;
`;

export const Container = styled.SafeAreaView`
  align-items: center;
  padding-top: 83px;
  flex: 1;
  background-color: #fff;
`;

export const UserAvatar = styled(Avatar)``;

export const ProfileContainer = styled.View`
  padding-top: 40px;
  width: 80%;
`;

export const Row = styled.View`
  padding-top: 15px;
`;

export const LabelText = styled.Text`
  font-size: 12px;
  color: #666;
`;

export const ProfileText = styled.Text`
  font-size: 22px;
  color: #444;
  font-weight: bold;
`;

export const LogoutButton = styled(Button)`
  width: 80%;
  background-color: #e74040;
  margin: 30px 0px;
`;
