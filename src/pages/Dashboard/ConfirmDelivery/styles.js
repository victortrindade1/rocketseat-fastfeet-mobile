import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';

import Button from '~/components/Button';

export const PhotoContainer = styled.View``;

export const Photo = styled.Image`
  height: 100%;
  width: 100%;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const CameraButton = styled.View``;

export const CameraIcon = styled.View``;

export const SendButton = styled(Button)``;
