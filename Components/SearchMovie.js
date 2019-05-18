// Components/SearchMovie.js
import React from 'react'
import { Stylesheet, Text, View, TextInput, Button,FlatList, ActivityIndicator  } from 'react-native'
import { Image } from 'react-native'
import FilmItem from './FilmItem.js'
import films from '../Helpers/filmsData'
import HomeSearch from './Search'
import { getFilmsFromApiWithSearchedText, getFilmCreditsFromApi, getMultipleFromApiWithSearchedText } from '../API/TMDBApi'
import FilmDetail from './FilmDetail.js'
import ShowDetail from './ShowDetail.js'
import PersonDetail from './PersonDetail.js'
import MultipleItem from './MultipleItem.js'
import { createStackNavigator, createAppContainer, DrawerNavigation, openDrawer } from 'react-navigation'
import {  Container, Content, Header, Left, Right, Icon, Body } from 'native-base'



class SearchMovie extends React.Component {

  _displayDetailForFilm = (idFilm) => {
    console.log("Avant   "+idFilm)
      if (idFilm.charAt(0)=='a'){
        var s = idFilm;
        while(s.charAt(0) === 'a')
          {
              s = s.substr(1);
            }
        this.props.navigation.navigate("ShowDetail", { idShow: s })
        }

        if (idFilm.charAt(0)=='b'){
          var s = idFilm;
          while(s.charAt(0) === 'b')
            {
                s = s.substr(1);
              }
          this.props.navigation.navigate("FilmDetail", { idFilm: s })
          }

          if (idFilm.charAt(0)=='c'){
            var s = idFilm;
            while(s.charAt(0) === 'c')
              {
                  s = s.substr(1);
                }
            this.props.navigation.navigate("PersonDetail", { idFilm: s })
            }



         console.log("Apres   "+idFilm)
  }


  _searchFilms() {
    this.page = 0
   this.totalPages = 0
   this.setState({
     films: [],
   }, () => {
    //   console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
       this._loadFilms()
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
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
     this.setState({ isLoading: true })
      getMultipleFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
                  this.totalPages = data.total_pages
                  this.setState({
                    films: [ ...this.state.films, ...data.results ],
          isLoading: false })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
  }

  constructor(props) {
    super(props)
   this.searchedText = ""
   this.page = 0 // Compteur pour connaître la page courante
   this.totalPages = 0 // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
   this.state = {
     films: [],
     isLoading: false
   }
    }

  render() {

     return (
       <Container>
       <Header style={{ marginTop: 24, backgroundColor: '#fff',   height: 50 }} >
         <Left  style={{marginRight: 15, flexDirection:'row', flex:1}} >
             <Icon name='md-menu' color="white" style={{marginRight: 20}} onPress={()  => this.props.navigation.openDrawer()} />
               <Text style={{marginRight: 0, fontSize:20,fontWeight:'bold'}}>Recherche</Text>
         </Left>
         <Body>

         </Body>
         <Right />
       </Header>
        <View  style={{ marginTop: 0 }}>
        <View style={{flexDirection: 'row'}}>
        {this._displayLoading()}
        <TextInput
                 style={styles.textinput}
                 placeholder='Recherche de films, acteurs, séries ...'
                 onChangeText={(text) => this._searchTextInputChanged(text)}
                 onSubmitEditing={() => this._searchFilms()}
                 returnKeyType="search"
                 onPress={() => this.props.navigation.push('')}
               />
     <Button title='Rechercher' style={{height:35}} onPress={() => this._searchFilms()}/>
     </View>
     <FlatList


      data={this.state.films}
      keyExtractor={(item) => item.id.toString()}

      renderItem={({item}) => <MultipleItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (this.state.films.length > 0  && this.page < this.totalPages) {
      // console.log("onEndReached"),
        this._loadFilms()

   }
}}
     />

     </View>
 </Container>
     )
 }
}

const styles = {
  textinput: {
      marginLeft: 1,
      marginRight: 1,
      height: 35,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5,
      flex:2
  //    marginTop: 80
},
loading_container: {
   position: 'absolute',
   left: 0,
   right: 0,
   top: 100,
   bottom: 0,
   alignItems: 'center',
   justifyContent: 'center'
 }
}

const RootStack = createStackNavigator({
  SearchMovie:{
    screen: SearchMovie,
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
    headerMode: 'screen',
    navigationOptions: {
     title: 'Film',
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },

  ShowDetail:{
    screen: ShowDetail,
    headerMode: 'screen',
    navigationOptions: {
     title: 'Série',
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },



    PersonDetail:{
      screen: PersonDetail,
      headerMode: 'screen',
      navigationOptions: {
       title: 'Personnalité',
        tabBarLabel: 'Personnalité',
        tabBarIcon : ({tintColor}) => (
          <Icon name="tv" color={tintColor} size={24} />
        )
      }
    }

})

const App = createAppContainer(RootStack);

export default App;
//export default SearchMovie
