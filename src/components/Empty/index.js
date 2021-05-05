import React from 'react';

import noVisibility from '~/assets/visibility-off.json';

import { EmptyContainer, Lottie, EmptyText } from './styles';

const Empty = ({ message }) => {
  return (
    <EmptyContainer>
      <Lottie source={noVisibility} autoPlay loop />
      <EmptyText>{message}</EmptyText>
    </EmptyContainer>
  );
};

export default Empty;
