import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { colors } from '~/styles/colors';

export const LoadingStyled = styled(ActivityIndicator).attrs({
  size: 'large',
  color: colors.primary,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
