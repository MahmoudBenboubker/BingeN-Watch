// Components/ShowDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, FlatList, TouchableOpacity, Alert, Modal, TouchableHighlight, Share} from 'react-native'
import { getShowDetailFromApi, getImageFromApi, getShowCreditsFromApi, getImageHQFromApi,  getShowVideosFromAPI } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { createMaterialTopTabNavigator, createAppContainer  } from 'react-navigation'
import {  Container, Content, Header, Left, Right, Icon, Body } from 'native-base'
import * as firebase from 'firebase'
import ShowCast from './Cast/ShowCast'
import ShowSaison from './Cast/ShowSaison'
import Trailers from './Cast/Trailers'

class ShowInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Show: undefined,
      isLoading: true,
      idWatchListShowShow: this.props.navigation.state.params.idShow,
      exist_fav_show : undefined,
      modalVisible: false,
    }
  }


    setModalVisible(visible) {
       this.setState({modalVisible: visible}); //oui
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
                       <Text>Partager cette série</Text>
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


  handleClickShare = () => {
      const { Show } = this.state
      const date = moment(new Date(Show.first_air_date)).format('DD/MM/YYYY')
      const contenu = Show.name+'\n'+'Sortie le : '+date+'\n\n'+Show.overview+'\n\nhttps://www.themoviedb.org/tv/'+Show.id+"\nEnvoyé depuis l'application Binge&Watch"
      Share.share({ title: Show.name, message: contenu })
      console.log("Share")
    }


      handleClick = () => {

         const idWatchList = this.state.idWatchListShowShow
          const user = firebase.auth().currentUser
          const database = firebase.database();

          const {Show} = this.state

           var ref = firebase.database().ref('users/' + user.uid+'/WatchListShows/'+idWatchList).once('value', function(snapshot) {
             if (snapshot.exists()) {


              // console.log('exist');
               Alert.alert(
            '',
            'Cette série ne vous intéresse plus',
            [
            //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.setState(this.state)},
            ],
            { cancelable: false }
          )
              firebase.database().ref('users/' + user.uid+'/WatchListShows').child(idWatchList).remove();
             }
              else {
            //  console.log('not exist');
              Alert.alert(
           '',
           'Cette série vous intéresse',
           [
           //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
           ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
             {text: 'OK', onPress: () => this.forceUpdate()},
           ],
           { cancelable: false }
         )
              firebase.database().ref('users/' + user.uid+'/WatchListShows/'+idWatchList).set({
                 idWatchListShowShow : idWatchList,
                  name : Show.name,
                  id : Show.id,
                  poster_path : Show.poster_path,
                  vote_average :Show.vote_average,
                  overview : Show.overview,
                  first_air_date : Show.first_air_date});
          //    console.log(this.state.idWatchList)
          //    console.log(idWatchList)
                  }
             }.bind(this));
    }


    handleClickFav = () => {

       const idWatchList = this.state.idWatchListShowShow
        const user = firebase.auth().currentUser
        const database = firebase.database();

    const {Show} = this.state

         var ref = firebase.database().ref('users/' + user.uid+'/FavListShows/'+idWatchList).once('value', function(snapshot) {
           if (snapshot.exists()) {


          //   console.log('exist');
             Alert.alert(
          '',
          'Série retirée des favoris',
          [
          //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
          ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.setState(this.state)},
          ],
          { cancelable: false }
        )
            firebase.database().ref('users/' + user.uid+'/FavListShows').child(idWatchList).remove();
           }
            else {
          //  console.log('not exist');
            Alert.alert(
         '',
         'Série ajoutée aux favoris',
         [
         //  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
         ///  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
           {text: 'OK', onPress: () => this.forceUpdate()},
         ],
         { cancelable: false }
       )
            firebase.database().ref('users/' + user.uid+'/FavListShows/'+idWatchList).set({
              idWatchList : idWatchList,
               name : Show.name,
               id : Show.id,
               poster_path : Show.poster_path,
               vote_average :Show.vote_average,
               overview : Show.overview,
               first_air_date : Show.first_air_date});
          //  console.log(this.state.idWatchList)
        //    console.log(idWatchList)
                }
           }.bind(this));
    }

  _displayFavoriteImage() {

      const idWatchListShowShow = this.state.idWatchListShowShow
       const user = firebase.auth().currentUser
       const database = firebase.database();


        var ref = firebase.database().ref('users/' + user.uid+'/WatchListShows/'+idWatchListShowShow).once('value', function(snapshot) {
          if (snapshot.exists()) {
            console.log('exist');
            this.setState({
              exist_fav_show : true
            });


          }       else{
           console.log('not exist');
          /*this.setState({
            exist_fav : false
          });*/

          }
     }.bind(this));

      const { exist_fav_show } = this.state



       if (this.state.exist_fav_show==true) {
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



  componentDidMount() {
    getShowDetailFromApi(this.props.navigation.state.params.idShow).then(data => {
      this.setState({
        Show: data,
        isLoading: false,
        idWatchListShowShow : this.props.navigation.state.params.idShow
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

  _displayShow() {
    const { Show } = this.state
    if (Show != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageHQFromApi(Show.backdrop_path)}}
          />
          <Text style={styles.title_text}>{Show.name}</Text>
          <Text style={styles.description_text}>{Show.overview}</Text>
          <Text style={styles.default_text}>Titre original : {Show.original_name}</Text>
          <Text style={styles.default_text}>Créé par : {Show.created_by.map(function(genre){
              return genre.name;
            }).join(", ")}
          </Text>
          <Text style={styles.default_text}>Sortie le {moment(new Date(Show.first_air_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {Show.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {Show.vote_count}</Text>
          <Text style={styles.default_text}>Nombre d'épisodes : {Show.number_of_episodes}</Text>
          <Text style={styles.default_text}>Genre(s) : {Show.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Network(s) : {Show.networks.map(function(networks){
              return networks.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }








  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayShow()}
          {this.modal()}
      { /* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        {this._displayFav()}
        {this._displayFavoriteImage()}
        {this._displayShare()}
        </View>  */ }
      </View>
    )
  }
}

class Season extends React.Component {



  constructor(props) {
    super(props)
    this._shows = []
    this.state = {
      show: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getShowDetailFromApi(this.props.navigation.state.params.idShow).then(data => {
      this.setState({
        show: data,
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


  _displayShow() {
    const { show } = this.state
    if (show != undefined) {
        this._loadShows()
      return (
        <View style={styles.scrollview_container}>

        <FlatList
        data={this._shows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <ShowSaison show={item}/>}
  />
        </View>
      )
    }
  }

  _loadShows() {
        getShowDetailFromApi(this.props.navigation.state.params.idShow).then(data => {
       this._shows = data.seasons
       this.forceUpdate()
     })
    }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayShow()}
      </View>
    )
  }
}

class Cast extends React.Component {



  constructor(props) {
    super(props)
    this._shows = []
    this.state = {
      show: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getShowDetailFromApi(this.props.navigation.state.params.idShow).then(data => {
      this.setState({
        show: data,
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


  _displayShow() {
    const { show } = this.state
    if (show != undefined) {
        this._loadShows()
      return (
        <View style={styles.scrollview_container}>

        <FlatList
        data={this._shows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <ShowCast show={item}/>}
  />
        </View>
      )
    }
  }

  _loadShows() {
        getShowCreditsFromApi(this.props.navigation.state.params.idShow).then(data => {
       this._shows = data.cast
       this.forceUpdate()
     })
    }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayShow()}
      </View>
    )
  }
}

class ShowVideos extends React.Component {



  constructor(props) {
    super(props)
    this._shows = []
    this.state = {
      show: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    getShowVideosFromAPI(this.props.navigation.state.params.idShow).then(data => {
      this.setState({
        show: data,
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


  _displayShow() {
    const { show } = this.state
    if (show != undefined) {
        this._loadShows()
      return (
        <View style={styles.scrollview_container}>

        <FlatList
        data={this._shows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <Trailers show={item}/>}
  />
        </View>
      )
    }
  }

  _loadShows() {
        getShowVideosFromAPI(this.props.navigation.state.params.idShow).then(data => {
       this._shows = data.results
       this.forceUpdate()
     })
    }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayShow()}
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
    height: 169,
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

  Infos: ShowInfo,
  Casting: Cast,
  Saisons: Season,
  Vidéos: ShowVideos,
},{
tabBarOptions: {
  activeTintColor: '#000',

  indicatorStyle: {
   opacity: 15,
     backgroundColor: 'white',
 },
  inactiveTintColor: '#000',
  labelStyle: {
    fontSize: 10,
  },
  style: {
    backgroundColor: 'white',
    borderDownColor: '#fff'
  },
}

})



const ShowDetail = createAppContainer(TabNavigator);

export default ShowDetail
