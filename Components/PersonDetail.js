// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity, Alert, Linking,Share } from 'react-native'
import {getPersonDetailFromApi , getImageFromApi, getPersonCreditsFromApi, getImageHQFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { createMaterialTopTabNavigator, createAppContainer  } from 'react-navigation'
import {  Container, Content, Header, Left, Right, Body } from 'native-base'
import { Icon } from 'react-native-elements'
import MultipleItemActor from './MultipleItemActor'

import * as firebase from 'firebase'


class PersonInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      film: undefined,
      isLoading: true,

    }
  }


  /*handleClickShare = () => {
      const { film } = this.state
      const date = moment(new Date(film.release_date)).format('DD/MM/YYYY')
      const contenu = film.title+'\n'+'Sortie le : '+date+'\n\n'+film.overview+'\n\nhttps://www.imdb.com/title/'+film.imdb_id+"\nEnvoyé depuis l'application AFLAMi"
      Share.share({ title: film.title, message: contenu })
      console.log("Share")
    }*/




  componentDidMount() {
    getPersonDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading: false,

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
    if (film != undefined) {
      return (

        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageHQFromApi(film.profile_path)}}
          />

          <Text style={styles.title_text}>{film.name}</Text>
          <Text>     </Text>
          <Text style={{fontWeight: 'bold'}}>{"    "}Biographie:    </Text>
          <Text style={styles.description_text}>{film.biography}</Text>
          <Text style={styles.default_text}>Né(e) à : {film.place_of_birth}</Text>
          <Text style={styles.default_text}>Né(e) le : {moment(new Date(film.birthday)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Connu(e) principalement pour : {film.known_for_department} </Text>
          <Text onPress={() =>  { Linking.openURL("https://www.imdb.com/name/"+film.imdb_id)}}
          style={styles.link_text}>Profil IMDB</Text>

        </ScrollView>
      )
    }
  }

/*

    _displayFav(){
          sourceImage = require('../Images/watch_later.png')
      return (
        <TouchableOpacity
        style={styles.favorite_container}
        onPress={this.handleClickFav}>
        <Image
          style={styles.favorite_image}
          source={sourceImage}
          />
        </TouchableOpacity>
      )
      }
*/



  render() {
    return (

      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}

        </View>
    )
  }
}

class Credits extends React.Component {



  constructor(props) {
    super(props)
    this._films = []
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getPersonCreditsFromApi(this.props.navigation.state.params.idFilm).then(data => {
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
    if (film != undefined) {
        this._loadFilms()
      return (
     <View style={styles.scrollview_container}>

        <FlatList
        data={this._films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <MultipleItemActor film={item}/>}
  />
        </View>
      )
    }
  }

  _loadFilms() {
        getPersonCreditsFromApi(this.props.navigation.state.params.idFilm).then(data => {
       this._films = data.cast
       this.forceUpdate()
     })
    }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm() }

      </View>
    )
  }
}




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
    height: 200,
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
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
    alignItems: 'center', // Alignement des components enfants sur l'axe secondaire, X ici
},
favorite_image: {
    width: 40,
    height: 40
},
link_text: {
  color: '#6495ed',
  margin: 5,
  marginBottom: 0
}
})



const TabNavigator = createMaterialTopTabNavigator({

  Informations: PersonInfo,
  Crédits: Credits,

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

const PersonDetail = createAppContainer(TabNavigator);

export default PersonDetail
