import React from 'react';
import { Wrapper, Header, ScrollContainer } from './styles';

const LayoutDefault = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <ScrollContainer>{children}</ScrollContainer>
    </Wrapper>
  );
};

export default LayoutDefault;
