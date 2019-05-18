import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, WebView, FlatList,ActivityIndicator, ScrollView, Image } from 'react-native';
import {  Container, Content, Header, Left, Right, Icon, Body } from 'native-base'
import { createMaterialTopTabNavigator, createAppContainer  } from 'react-navigation'
import films from './dataCinema'
import WebSiteView from './Views/WebSiteView'
import CinemaScreen from './CinemaScreen'
import { counter } from './CinemaScreen';
import {getWebSitefromFirebase, getCinemaDetailfromFirebase, getMessagesfromFirebase} from '../API/Firebase'
import * as firebase from 'firebase'
import {config} from '../API/Firebase'


class CinemaInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,

    }
  }


    componentDidMount() {
      getCinemaDetailfromFirebase(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        })
      })
    }

    _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
        )
      }
    }

    _displayFilm() {
      const { film } = this.state
      if (this.state.film != undefined) {
        return (
          <ScrollView style={styles.scrollview_container}>
            <Image
              style={styles.image}
              source={{uri: film.poster_path}}
            />
            <Text style={styles.title_text}>{film.name}</Text>
            <Text>     </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
           <Text style={styles.default_text}>Ville :</Text>
           <Text  style={styles.description_text}>{film.city}</Text>
           </View>
           <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.default_text}>Adresse :</Text>
          <Text onPress={() =>  { Linking.openURL('http://maps.google.com/?q='+film.name)}}
           style={styles.link_text}>{film.address}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
         <Text style={styles.default_text}>Nombre de salles :</Text>
         <Text  style={styles.description_text}>{film.room_number}</Text>
         </View>
         <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={styles.default_text}>Film en Version Originale :</Text>
        <Text  style={styles.description_text}>{film.vo}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
       <Text style={styles.default_text}>Site Web :</Text>
       <Text onPress={() =>  { Linking.openURL(film.website)}}
        style={styles.link_text}>{film.website}</Text>
       </View>
       <View style={{flex: 1, flexDirection: 'row'}}>
      <Text style={styles.default_text}>Mail :</Text>
      <Text onPress={() =>  { Linking.openURL(`mailto:${film.mail}`)}}
       style={styles.link_text}>{film.mail}</Text>
      </View>
             <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.default_text}>Telephone :</Text>
            <Text onPress={() =>  { Linking.openURL(`tel:${film.phone}`)}}
             style={styles.link_text}>{film.phone}</Text>
            </View>
          </ScrollView>
        )
      }
    }

    render() {
      return (
        <View style={styles.main_container}>
          {this._displayLoading()}
          {this._displayFilm()}
        </View>
      )
    }
}

class Projection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,

    }
  }


  componentDidMount() {
    getWebSitefromFirebase(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false
      })
      })
  }



  render() {
    return (
           <WebView
             source={{uri: this.state.film}}
            />
    )
  }
}

class Localisation extends React.Component {



    render() {
      return (

          <Text> Soon </Text>

      )
    }
}

const TabNavigator = createMaterialTopTabNavigator({

  Informations: CinemaInfo,
  Projection: Projection,
},{
tabBarOptions: {
  activeTintColor: '#000',
  indicatorStyle: {
   opacity: 15,
     backgroundColor: 'white',
 },
  inactiveTintColor: '#000',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: 'white',
    borderDownColor: '#fff'
  },
}

})

const CinemaDetail = createAppContainer(TabNavigator);

export default CinemaDetail;

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 300,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 0
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  link_text: {
    color: '#6495ed',
    margin: 5,
    marginBottom: 0
  }
})
