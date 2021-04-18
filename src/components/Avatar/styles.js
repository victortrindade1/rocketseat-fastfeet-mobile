import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  border-radius: 34px;
  /* position: relative; */
  width: 68px;
  height: 68px;
  overflow: hidden;
`;

export const PhotoAvatar = styled.Image`
  height: 100%;
  width: 100%;
`;

export const LetterAvatarContainer = styled.View`
  background: ${props => props.color};
  height: 100%;
  width: 100%;
  justify-content: center;
`;

export const LetterAvatarText = styled.Text`
  color: ${props => darken(0.3, props.color)};
  /* line-height: 68px; */
  text-align: center;
  font-size: 31px;
`;
