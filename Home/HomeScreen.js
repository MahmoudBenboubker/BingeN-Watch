import React, { Component } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import {  Container, Content, Header, Left, Right, Icon, Body } from 'native-base'
import Search from '../Components/Search'
import Swiper from 'react-native-swiper'
import FilmsTrend from './FilmsTrend'
import {getTrendingFilmsFromAPI} from '../API/TMDBApi'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import FilmDetail from '../Components/FilmDetail'
import * as firebase from 'firebase'
import {config} from '../API/Firebase'

class HomeScreen extends React.Component {

  _displayDetailForFilm = (idFilm) => {
  //  console.log("Display film with id " + idFilm)
  //  getFilmCreditsFromApi(idFilm).then(data => console.log(data));
     this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  constructor(props) {
      super(props)
      this._films = [],
      this.state = {
        myKey: null
      }
    }




    /*  _loadUser(){
        const getUserId = async () => {
          let userId = '';
          try {
            userId = await AsyncStorage.getItem('userId') || 'none';
          } catch (error) {
            // Error retrieving data
            console.log(error.message);
          }
          return userId;
          var user = firebase.auth().currentUser
          console.log("jk")
          console.log(userId)

            firebase.database().ref('users/' + user.uid).set({ username : "Hdksjknsjknkjsnkdskjqsnkjsndkn"});

          firebase.database().ref('users/' + uid).set({
            username: userId,
            email: user.email,
            profile_picture : "photoUrl"
          });

          firebase.database().ref('users/004').set(
                 {
                     name: 'Pheng Sengvuthy 004',
                     age: 24
                 }
             ).then(() => {
                 console.log('INSERTED !');
             }).catch((error) => {
                 console.log(error);
             });
}


}*/



componentDidMount() {

  const user = firebase.auth().currentUser
  const database = firebase.database();


this.displayData



// To Await 0 seconds to update a  user
setTimeout(() => {
   firebase.database().ref('users/'+user.uid).update(
       {
           dateLastLogin: new Date(),
           email:  user.email,

       }
   ).then(() => {

   }).catch((error) => {
       console.log(error);
   });
}, 0);

/* To set a user
firebase.database().ref('users/004').set({
   name: 'Pheng Sengvuthy'
});

*/


}


  _loadFilms() {
        getTrendingFilmsFromAPI('1').then(data => {
       this._films = data.results
       this.forceUpdate()
     })
    }

  render() {

    this._loadFilms()

    return (
      <Container>
          <Header style={{ marginTop: 24, backgroundColor: '#fff',   height: 50 }} >
            <Left  style={{marginRight: 15, flexDirection:'row', flex: 1}} >
                <Icon name='md-menu' style={{marginRight: 20}} onPress={()  => this.props.navigation.openDrawer()} />
                <Text style={{marginRight: 0, fontSize:20,fontWeight:'bold'}}>Accueil </Text>
            </Left>
            <Body style={{flex: 1}}>

            </Body>
            <Right style={{flex: 1}}>
                  <Icon name='md-search' style={{marginLeft: 20}} onPress={()  => this.props.navigation.navigate('SearchMovie')} />
            </Right>
          </Header>

          <Content>
            <Swiper autoplay={true} style={{height:180}} showsPagination={false}>

              <View style={{flex:1}}>
                          <Image
                          style={{flex:1,height:null, width:null, resizeMode: 'cover'}}
                           source={{uri: 'https://firebasestorage.googleapis.com/v0/b/projet-reborn-101.appspot.com/o/cover1.jpg?alt=media&token=4c06bd3a-8d00-4532-ade5-f2a86e2b8c56'}}/>

              </View>
              <View style={{flex:1}}>

                          <Image
                          style={{flex:1,height:null, width:null, resizeMode: 'cover'}}
                           source={{uri: 'https://firebasestorage.googleapis.com/v0/b/projet-reborn-101.appspot.com/o/cover2.jpg?alt=media&token=1f08b20b-2fe6-4528-8449-a6f64a731ea5'}}/>

              </View>
              <View style={{flex:1}}>

              <Image
              style={{flex:1,height:null, width:null, resizeMode: 'cover'}}
               source={{uri: 'https://firebasestorage.googleapis.com/v0/b/projet-reborn-101.appspot.com/o/cover3.jpg?alt=media&token=4b659f1d-0c5d-47bd-b03a-672042f29881'}} />

              </View>
            </Swiper>

            <FlatList
            data={this._films}
           keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <FilmsTrend film={item} displayDetailForFilm={this._displayDetailForFilm} />}
            />

          </Content>


      </Container>
    );
  }
}

const RootStack = createStackNavigator({
  HomeScreen:{
    screen: HomeScreen,
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

  FilmDetail:{
    screen: FilmDetail,
    navigationOptions: {
     title: 'Tendance',
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  }

})

const App = createAppContainer(RootStack);

export default App;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
