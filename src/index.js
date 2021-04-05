import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';
import colors from '~/styles/colors';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <Routes />
    </>
  );
}

export default App;
