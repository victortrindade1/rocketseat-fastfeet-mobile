import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  createStackNavigator,
  TransitionPresets,
} from 'react-navigation-stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import DeliveryDetails from './pages/Dashboard/DeliveryDetails';
import Profile from './pages/Profile';
import AddProblem from './pages/Dashboard/AddProblem';
import ShowProblems from './pages/Dashboard/ShowProblems';
import ConfirmDelivery from './pages/Dashboard/ConfirmDelivery/';

import { colors } from '~/styles/colors';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                {
                  Dashboard,
                  DeliveryDetails,
                  AddProblem,
                  ShowProblems,
                  ConfirmDelivery,
                },
                {
                  defaultNavigationOptions: ({ navigation }) => ({
                    gestureEnabled: true, // Habilita voltar arrastando do canto esquerdo da tela
                    ...TransitionPresets.SlideFromRightIOS, // Transição de tela por slide

                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      paddingTop: 20,
                      paddingLeft: 15,
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      paddingTop: 20,
                    },
                    headerLeft: () => (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.goBack();
                        }}
                      >
                        <Icon name="chevron-left" size={20} color="#fff" />
                      </TouchableOpacity>
                    ),
                  }),
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Entregas',
                activeTintColor: colors.primary,
                inactiveTintColor: '#999',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="reorder" size={20} color={tintColor} />
                ),
              },
            },
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
