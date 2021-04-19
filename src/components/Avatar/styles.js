import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  border-radius: ${props => props.width / 2}px;
  /* position: relative; */
  /* width: 68px; */
  width: ${props => props.width}px;
  height: ${props => props.width}px;
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
  text-align: center;
  font-size: ${props => props.textSize}px;
`;
