import React from 'react';
import { StatusBarStyled, Wrapper, Header, ScrollContainer } from './styles';

const LayoutDefault = ({ children }) => {
  return (
    <>
      <StatusBarStyled barStyle={'light-content'} />

      <Wrapper>
        <Header />
        <ScrollContainer>{children}</ScrollContainer>
      </Wrapper>
    </>
  );
};

export default LayoutDefault;
