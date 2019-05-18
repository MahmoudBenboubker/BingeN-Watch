import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList,NativeModules, ActivityIndicator } from 'react-native';
import {  Container, Content, Header, Left, Right, Icon, Body } from 'native-base'
import {getUserWatchListMovies} from '../API/Firebase'
import {getFilmDetailFromApi} from '../API/TMDBApi'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import FilmDetail from '../Components/FilmDetail'
import FilmsTrend from '../Home/FilmsTrend'
import FilmItem from '../Components/FilmItem'
import * as firebase from 'firebase'
class WatchLater extends React.Component {

  _displayDetailForFilm = (idFilm) => {
  //  console.log("Display film with id " + idFilm)
  //  getFilmCreditsFromApi(idFilm).then(data => console.log(data));
     this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }


    constructor(props) {
      NativeModules.ExceptionsManager = null;
        super(props)
        this._films =
        this.state = {
          refresh : false,
            isLoading : false,
          launch : false,
          film: undefined,
                arrData:[]
                  };
      }


        refresh(){

          this.setState({
    refresh: !this.state.refresh
})
        }
      _displayLoading() {
           if (this.state.isLoading) {
             return (
               <View style={styles.loading_container}>
                 <ActivityIndicator size='large' />
                 {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
               </View>
             )
           }
         }


        _loadFilms() {
              const user = firebase.auth().currentUser
              getUserWatchListMovies(user.uid).then(data => {
                this._films = data.Object
                this.forceUpdate()
              })
            }

          async   componentDidMount(){
console.error = (error) => error.apply;
  this.setState({ isLoading: true })

              const highestTimeoutId = setTimeout(() => ';');
for (let i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
}

              const user = firebase.auth().currentUser
              var ref = firebase.database().ref('users/' + user.uid+'/WatchListMovies'); //Here assuming 'Users' as main table of contents

              ref.once('value').then(snapshot => {
              //  console.log("Snapshot")
                // console.log(snapshot.val());
 // get children as an array
  var items = [];
  snapshot.forEach((child) => {
  items.push({
    id: child.val().idWatchList,
    title : child.val().title,
    poster_path : child.val().poster_path,
    vote_average :child.val().vote_average,
    overview : child.val().overview,
    release_date : child.val().release_date,
   });
});

this.setState({ arrData: items, launch : true, isLoading : false});
//console.log("Ceci est le this.state.arrData:")
//console.log(this.state.arrData[0].idWatchList)

//const newarrData = this.state.arrData.slice() //copy the array

/*  for (let i = 0; i < this.state.arrData.length; i++){
        console.log("ede"+i)
              getFilmDetailFromApi(this.state.arrData[i].idWatchList).then(data => {
                this.setState({
                  film: data
                })
              //  console.log(this.state.film)
              //  console.log("+++++++++++++++++++++++++++++++++++++++")
                const newarrData = this.state.arrData.slice()
                newarrData[i] = JSON.parse(JSON.stringify(this.state.film))
              //  console.log("+++++++++++++++++++++++++++++++++++++++")
              //  console.log(newarrData[0])
              //  console.log("------------------------------------")
                      this.setState({arrData: newarrData})
                //console.log("------------------------------------")
                //    console.log(this.state.arrData)
                    if (i==(this.state.arrData.length-1)){

                      this.setState({launch : true,
                                      isLoading : false})


                    }
              })}*/

            //  console.log("Before")
              //  console.log(this.state.arrData[0])
              //  console.log("State.film")
              //  console.log(this.state.film)

              //console.log(this.state.film)
              //newarrData[0] = JSON.parse(JSON.stringify(film)) //execute the manipulations
              //this.setState({arrData: newarrData})
            //  console.log(newarrData[0])
            //  console.log("New")
              //console.log(this.state.arrData[0])
});
            }



            _displayFav(){


                  if (this.state.launch == true ){
                    console.log(this.state.launch)
              return (
                <FlatList
  data={this.state.arrData}
  eextraData={this.state.refresh}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
/>
              )
              }


              }


  render() {
    //this._loadFilms()
  //    console.log("Resultat:")
  //  console.log(this._films)
    return (
      <Container>
          <Header style={{ marginTop: 24, backgroundColor: '#fff',   height: 50 }} >
            <Left  style={{marginRight: 15, flexDirection:'row', flex:1}} >
                <Icon name='md-menu' style={{marginRight: 20}} onPress={()  => this.props.navigation.openDrawer()} />
                  <Text style={{marginRight: 0, fontSize:20,fontWeight:'bold'}}>À voir</Text>
            </Left>
            <Body>

            </Body>
            <Right style={{flex: 1}}>
                  <Icon name='refresh' style={{marginLeft: 20}} onPress={()  => this.componentDidMount()} />
            </Right>

          </Header>
          {this._displayLoading()}
          {this._displayFav()}

      </Container>
    );
  }

}

const RootStack = createStackNavigator({
  WatchLater:{
    screen: WatchLater,
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
     title: 'À voir',
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
    backgroundColor: '#000',
  }, loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
