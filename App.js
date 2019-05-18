import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import AuthApp from './AuthApp'
import AfterLogin from './AfterLogin'
import SettingsScreen from './Settings/SettingsScreen'
import AuthLoadingScreen from './AuthLoadingScreen'
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation'
console.disableYellowBox = true;

const SwitchStack = createSwitchNavigator({
  AuthApp:{
    screen: AuthApp,
    headerMode: 'none',
    navigationOptions: {
       title: 'Recherche de films',
       header: null,
      tabBarLabel: 'Séries',
       headerVisible: false,
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },

  AfterLogin:{
    screen: AfterLogin,
    navigationOptions: {
     title: 'Tendance',
     header: null,
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },

  AuthLoadingScreen:{
    screen: AuthLoadingScreen,
    navigationOptions: {
     title: 'Tendance',
     header: null,
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },
  SettingsScreen:{
    screen: SettingsScreen,
    navigationOptions: {
     title: 'Tendance',
     header: null,
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  }


},
{
    initialRouteName: 'AuthLoadingScreen',
  })



const App = createAppContainer(SwitchStack);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
});
