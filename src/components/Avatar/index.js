import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  PhotoAvatar,
  LetterAvatarContainer,
  LetterAvatarText,
} from './styles';

import { createLetterAvatar } from '~/util/letterAvatar';

function Avatar({ url, name, index, width = 68, textSize = 31 }) {
  const letterAvatar = createLetterAvatar(name, index);

  return (
    <Container width={width}>
      {url ? (
        <PhotoAvatar source={{ uri: url }} />
      ) : (
        <LetterAvatarContainer color={letterAvatar.color}>
          <LetterAvatarText color={letterAvatar.color} textSize={textSize}>
            {letterAvatar.letters}
          </LetterAvatarText>
        </LetterAvatarContainer>
      )}
    </Container>
  );
}

Avatar.propTypes = {
  // url: PropTypes.string,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

Avatar.defaultProps = {
  // url: '',
};

export default Avatar;
