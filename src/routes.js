import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import { colors } from '~/styles/colors';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Dashboard,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: colors.primary,
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                height: 70,
                paddingTop: 12,
                borderTopWidth: 0,
                elevation: 8,
              },
              labelStyle: {
                fontSize: 14,
                paddingBottom: 12,
              },
            },
          },
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'SignIn',
      },
    ),
  );
