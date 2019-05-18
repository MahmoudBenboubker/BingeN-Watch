import React from 'react';
import { StyleSheet, Text, View, SafeArewView, Image, ScrollView, Dimensions,  AppRegistry, Button, AsyncStorage } from 'react-native';
import {createDrawerNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './Home/HomeScreen'
import SettingsScreen from './Settings/SettingsScreen'
import Search from './Components/Search'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { DrawerItems, DrawerNavigation } from 'react-navigation'
import Favoris from './Favoris/Favoris'
import FavorisShow from './Favoris/FavorisShow'
import WatchLater from './WatchLater/WatchLater'
import WatchLaterShow from './WatchLater/WatchLaterShow'
import SearchMovie from './Components/SearchMovie'
import CinemaScreen from './Cinema/CinemaScreen'
import * as firebase from 'firebase'
import {config} from './API/Firebase'
import ASynchInfo from './ASynch/ASynchInfo'




const DrawerContent = (props) => (

  <ScrollView>
    <View
      style={{
        backgroundColor: '#fff',
        height: 200,
        alignItems: 'center',
        marginTop:10,
        justifyContent: 'center',

      }}
    >
    <Image
            style={{marginTop:15, width: 120, height: 120, borderRadius: 60}}
             source={require('./assets/icon.png')}
          />
  <ASynchInfo />
    </View>
    <DrawerItems {...props} />
  </ScrollView>
)



const AppDrawerNavigator = createDrawerNavigator({

  Home:{
    screen :HomeScreen,
    navigationOptions: {
       title: 'Accueil',
      drawerLabel: 'Accueil',
      drawerIcon : ({tintColor}) => (
        <Icon name="home" color={tintColor} size={24} /> )

          }
  },
  Settings:{
    screen :SettingsScreen,
    navigationOptions: {
       title: 'Paramètres',
       drawerLabel: 'Paramètres',
       drawerIcon : ({tintColor}) => (
         <Icon name="settings" color={tintColor} size={24} /> )
          }
  },

  Favoris:{
    screen :Favoris,
    navigationOptions: {
       title: 'Favoris - Films',
       drawerLabel: 'Favoris - Films',
       drawerIcon : ({tintColor}) => (
         <Icon name="favorite" color={tintColor} size={24} /> )
          }
  },

  WatchLater:{
    screen :WatchLater,
    navigationOptions: {
       title: 'WatchLater - Films',
       drawerLabel: 'Voir plus tard',
       drawerIcon : ({tintColor}) => (
         <Icon name="visibility" color={tintColor} size={24} /> )
          }
  },
  SearchMovie:{
    screen :SearchMovie,
    navigationOptions: {
       title: 'Recherche de films/séries',
       drawerLabel: 'Recherche de films et séries',
       drawerIcon : ({tintColor}) => (
         <Icon name="search" color={tintColor} size={24} /> )
          }
  },

  CinemaScreen:{
    screen :CinemaScreen,
    navigationOptions: {
       title: 'Cinémas au Maroc',
       drawerLabel: 'Cinémas au Maroc',
       drawerIcon : ({tintColor}) => (
         <Icon name="theaters" color={tintColor} size={24} /> )
          }
  },
  FavorisShow:{
    screen :FavorisShow,
    navigationOptions: {
       title: 'Favoris - Séries',
       drawerLabel: 'Favoris - Séries',
       drawerIcon : ({tintColor}) => (
         <Icon name="tv" color={tintColor} size={24} /> )
          }
  },  WatchLaterShow:{
      screen :WatchLaterShow,
      navigationOptions: {
         title: 'WatchLater',
         drawerLabel: 'Voir plus tard - Séries',
         drawerIcon : ({tintColor}) => (
           <Icon name="screen-share" color={tintColor} size={24} /> )
            }
    }


},{

  contentComponent: DrawerContent,
}
)

const AfterLogin = createAppContainer(AppDrawerNavigator);
export default AfterLogin;
const styles = StyleSheet.create({
  container: {

    height: 40,
    marginTop: 25,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
