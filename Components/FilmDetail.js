// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Button, ScrollView, Image,Modal, TouchableHighlight, FlatList, TouchableOpacity, Alert, Share, ImageBackground  } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi, getFilmCreditsFromApi, getFilmVideosFromAPI, getImageHQFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { createMaterialTopTabNavigator, createAppContainer  } from 'react-navigation'
import {  Container, Content, Header, Left, Right, Body } from 'native-base'
import { Icon } from 'react-native-elements'
import FilmCast from './Cast/FilmCast'
import * as firebase from 'firebase'
import FilmVideo from './Cast/FilmVideo'

class FilmInfo extends React.Component {



  constructor(props) {
    super(props)
    this._films = [],
    this.state = {
      film: undefined,
      isLoading: true,
      idWatchList: this.props.navigation.state.params.idFilm,
      exist_fav : undefined,
      crew: undefined,
      modalVisible: false,
    }
  }

  setModalVisible(visible) {
     this.setState({modalVisible: visible});
   }


   modal() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          transparent = {true}
          presentationStyle = 'overFullScreen'
          animationType="slide"
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center'}}>

      <View style={{
        width:'100%',

          borderRadius:5,
          backgroundColor:'rgba(128,128,128,0.3)',
          justifyContent: 'center',
          alignItems: 'center'}}>

            <TouchableOpacity
            onPress={ () => this.handleClickFav()}
             style={{
                marginTop : 0,
                height: "15%",
                   borderRadius:5,
                   width:'95%',
                    backgroundColor:'rgba(255,255,255,1)',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
              <Text>Favoris</Text>
              </TouchableOpacity>

              <TouchableOpacity
              onPress={ () => this.handleClick()} style={{
                marginTop : 5,
                height: "15%",
                   borderRadius:5,
                   width:'95%',
                    backgroundColor:'rgba(255,255,255,1)',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                <Text>À voir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={ () => this.handleClickShare()} style={{
                  marginTop : 5,
                  height: "15%",
                     borderRadius:5,
                     width:'95%',
                      backgroundColor:'rgba(255,255,255,1)',
                      justifyContent: 'center',
                      alignItems: 'center'}}>
                  <Text>Partager ce Film</Text>
                  </TouchableOpacity>




              <TouchableHighlight
              style={{
                marginTop : 5,
                height: "15%",
                   borderRadius:5,
                   width:'95%',
                    backgroundColor:'rgba(255,255,255,1)',
                    justifyContent: 'center',
                    alignItems: 'center'}}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Fermer</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
        style={styles.share_touchable_floatingactionbutton}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Image
           style={styles.share_image}
           source={require('../Images/floating_button.png')} />
        </TouchableHighlight>
      </View>
    );
  }



  handleClick = () => {

     const idWatchList = this.state.idWatchList
      const user = firebase.auth().currentUser
      const database = firebase.database();

      const {film} = this.state

       var ref = firebase.database().ref('users/' + user.uid+'/WatchListMovies/'+idWatchList).once('value', function(snapshot) {
         if (snapshot.exists()) {


          // console.log('exist');
           Alert.alert(
        '',
        'Ce film ne vous intéresse plus',
        [
        //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.setState(this.state)},
        ],
        { cancelable: false }
      )
          firebase.database().ref('users/' + user.uid+'/WatchListMovies').child(idWatchList).remove();
         }
          else {
        //  console.log('not exist');
          Alert.alert(
       '',
       'Ce film vous intéresse',
       [
       //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
       ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'OK', onPress: () => this.forceUpdate()},
       ],
       { cancelable: false }
     )
          firebase.database().ref('users/' + user.uid+'/WatchListMovies/'+idWatchList).set({
             idWatchList : idWatchList,
              title : film.title,
              id : film.id,
              poster_path : film.poster_path,
              vote_average :film.vote_average,
              overview : film.overview,
              release_date : film.release_date});
      //    console.log(this.state.idWatchList)
      //    console.log(idWatchList)
              }
         }.bind(this));
}

handleClickFav = () => {

   const idWatchList = this.state.idWatchList
    const user = firebase.auth().currentUser
    const database = firebase.database();

const {film} = this.state

     var ref = firebase.database().ref('users/' + user.uid+'/FavListMovies/'+idWatchList).once('value', function(snapshot) {
       if (snapshot.exists()) {


      //   console.log('exist');
         Alert.alert(
      '',
      'Film retiré des favoris',
      [
      //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.setState(this.state)},
      ],
      { cancelable: false }
    )
        firebase.database().ref('users/' + user.uid+'/FavListMovies').child(idWatchList).remove();
       }
        else {
      //  console.log('not exist');
        Alert.alert(
     '',
     'Film ajouté aux favoris',
     [
     //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
     ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
       {text: 'OK', onPress: () => this.forceUpdate()},
     ],
     { cancelable: false }
   )
        firebase.database().ref('users/' + user.uid+'/FavListMovies/'+idWatchList).set({
          idWatchList : idWatchList,
           title : film.title,
           id : film.id,
           poster_path : film.poster_path,
           vote_average :film.vote_average,
           overview : film.overview,
           release_date : film.release_date});
      //  console.log(this.state.idWatchList)
    //    console.log(idWatchList)
            }
       }.bind(this));
}

  handleClickShare = () => {
      const { film } = this.state
      const date = moment(new Date(film.release_date)).format('DD/MM/YYYY')
      const contenu = film.title+'\n'+'Sortie le : '+date+'\n\n'+film.overview+'\n\nhttps://www.imdb.com/title/'+film.imdb_id+"\nEnvoyé depuis l'application Binge&Watch"
      Share.share({ title: film.title, message: contenu })
      console.log("Share")
    }

  _displayFavoriteImage() {

      const idWatchList = this.state.idWatchList
       const user = firebase.auth().currentUser
       const database = firebase.database();


        var ref = firebase.database().ref('users/' + user.uid+'/WatchListMovies/'+idWatchList).once('value', function(snapshot) {
          if (snapshot.exists()) {
            console.log('exist');
            this.setState({
              exist_fav : true
            });


          }       else{
           console.log('not exist');
          /*this.setState({
            exist_fav : false
          });*/

          }
     }.bind(this));

      const { exist_fav } = this.state



       if (this.state.exist_fav==true) {
        // Film dans nos favoris
        sourceImage = require('../Images/fav.png')
      }else {

          sourceImage = require('../Images/non_fav.png')
      }

        return (
          <TouchableOpacity
          style={styles.favorite_container}
          onPress={this.handleClick}>
          <Image
            style={styles.favorite_image}
            source={sourceImage}
            />
          </TouchableOpacity>


          )

      }

      _loadFilms() {
            getFilmCreditsFromApi(this.props.navigation.state.params.idFilm).then(data => {
           this._films = data.crew
           this.forceUpdate()
         })

        }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
      this.setState({
        film: data,
        isLoading : false,
        idWatchList : this.props.navigation.state.params.idFilm
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
      var directors = [];
      var writers = [];
      this._films.forEach(function(entry){
   if (entry.job === 'Director') {
       directors.push(entry.name);
   }
   if (entry.job === 'Screenplay') {
       writers.push(entry.name);
   }
})

      return (

        <ScrollView style={styles.scrollview_container}>
        <Image
          style={styles.image}
          source={{uri: getImageHQFromApi(film.backdrop_path)}}
        />


          <Text style={styles.title_text}>{film.title}</Text>
          <Text>     </Text>
          <Text style={{fontWeight: 'bold'}}> Synopsis:    </Text>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Titre original : {film.original_title}</Text>
          <Text style={styles.default_text}>Réalisateur : {directors[0]}</Text>
          <Text style={styles.default_text}>Scénariste : {writers[0]}</Text>
          <Text style={styles.default_text}>Sortie le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>



        </ScrollView>
      )
    }
  }

  _displayShare(){
        sourceImage = require('../Images/share.png')
    return (
      <TouchableOpacity
      style={styles.favorite_container}
      onPress={this.handleClickShare}>
      <Image
        style={styles.favorite_image}
        source={sourceImage}
        />
      </TouchableOpacity>
    )
    }

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




  render() {
    return (

      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this.modal()}
      { /* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        {this._displayFav()}
        {this._displayFavoriteImage()}
        {this._displayShare()}
        </View>*/
}
        </View>
    )
  }
}

class Cast extends React.Component {



  constructor(props) {
    super(props)
    this._films = []
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
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
        renderItem={({item}) => <FilmCast film={item}/>}
  />
        </View>
      )
    }
  }

  _loadFilms() {
        getFilmCreditsFromApi(this.props.navigation.state.params.idFilm).then(data => {
       this._films = data.cast
       this.forceUpdate()
     })
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


class FilmVideos extends React.Component {



  constructor(props) {
    super(props)
    this._films = []
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getFilmVideosFromAPI(this.props.navigation.state.params.idFilm).then(data => {
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
        renderItem={({item}) => <FilmVideo film={item}/>}
  />
        </View>
      )
    }
  }

  _loadFilms() {
        getFilmVideosFromAPI(this.props.navigation.state.params.idFilm).then(data => {
       this._films = data.results
       this.forceUpdate()
     })
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
share_touchable_floatingactionbutton: {
   position: 'absolute',
   width: 50,
   height: 50,
   right: 30,
   bottom: 30,
   borderRadius: 30,
   backgroundColor: '#e91e63',
   justifyContent: 'center',
   alignItems: 'center'
 },
 share_image: {
   width: 50,
   height:50
 }
})



const TabNavigator = createMaterialTopTabNavigator({

  Informations: FilmInfo,
  Casting: Cast,
  Videos: FilmVideos,
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

const FilmDetail = createAppContainer(TabNavigator);

export default FilmDetail
