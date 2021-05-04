import React from 'react';
import { View } from 'react-native';
import {
  StatusBarStyled,
  Wrapper,
  Header,
  Container,
  ScrollContainer,
} from './styles';

const Background = ({ children, isFlatlist = false }) => {
  return (
    <>
      <StatusBarStyled barStyle={'light-content'} />

      <Wrapper>
        <Header />
        {isFlatlist ? (
          <Container>{children}</Container>
        ) : (
          <ScrollContainer>{children}</ScrollContainer>
        )}
      </Wrapper>
    </>
  );
};

export default Background;
