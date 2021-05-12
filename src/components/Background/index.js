import React from 'react';
import { View } from 'react-native';
import {
  StatusBarStyled,
  Wrapper,
  Header,
  Container,
  ScrollContainer,
} from './styles';

const Background = ({ children, useScroll = true }) => {
  return (
    <>
      <StatusBarStyled barStyle={'light-content'} />

      <Wrapper>
        <Header />
        {useScroll ? (
          <ScrollContainer>{children}</ScrollContainer>
        ) : (
          <Container>{children}</Container>
        )}
      </Wrapper>
    </>
  );
};

export default Background;
