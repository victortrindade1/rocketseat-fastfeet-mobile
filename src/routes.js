import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator({
          Dashboard,
        }),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      },
    ),
  );
