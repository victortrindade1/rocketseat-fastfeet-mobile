import React from 'react';
import { Wrapper, Header, Body } from './styles';

const LayoutDefault = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Body>{children}</Body>
    </Wrapper>
  );
};

export default LayoutDefault;
