import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';

import { colors } from '~/styles/colors';

export const PhotoContainer = styled.View`
  flex: 1;
  border-radius: 4px;
  background-color: #000;
  overflow: hidden; // P/ a câmera ficar dentro do border-radius
`;

export const Photo = styled.Image`
  height: 100%;
  width: 100%;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const CameraButton = styled.TouchableOpacity`
  background-color: #0000004d;
  margin: 20px;
  padding: 15px;
  height: 100px;
  width: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export const CameraIcon = styled(Icon)`
  color: #fff;
`;

export const SendButton = styled(Button)`
  margin: 15px 0px;
  background-color: ${colors.primary};
`;

export const PendingView = styled.View`
  flex: 1;
  background-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

export const PendingText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
