// Components/SearchShow.js
import React from 'react'
import { Stylesheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import { Image } from 'react-native'
import ShowItem from './ShowItem.js'
import { getShowsFromApiWithSearchedText } from '../API/TMDBApi'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import ShowDetail from './ShowDetail.js'
import {  Container, Content, Header, Left, Right, Icon, Body } from 'native-base'
import HomeScreen from '../Home/HomeScreen'
import HomeSearch from './Search'

class SearchShow extends React.Component {

  _displayDetailForShow = (idShow) => {
    console.log("Display show with id " + idShow)

    this.props.navigation.navigate("ShowDetail", { idShow: idShow })
  }


  _searchShows() {
    this.page = 0
   this.totalPages = 0
   this.setState({
     shows: [],
   }, () => {
    //   console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de shows : " + this.state.shows.length)
       this._loadShows()
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

  _loadShows() {
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
     this.setState({ isLoading: true })
      getShowsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
      this.totalPages = data.total_pages
      this.setState({
        shows: [ ...this.state.shows, ...data.results ],
        isLoading: false
      })
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
     shows: [],
     isLoading: false
   }
    }

  render() {
     return (
       <Container>
       <Header style={{ marginTop: 24, backgroundColor: '#fff',   height: 50 }}>
         <Left>
             <Icon name='md-arrow-back' style={{marginLeft: 5}}  onPress={() => this.props.navigation.navigate("HomeSearch")}/>
         </Left>
         <Body style={{flex:3}}>
             <Text style={{marginRight: 0, fontSize:20,fontWeight:'bold'}}>{"    "}Recherche de séries </Text>
         </Body>
         <Right />
       </Header>
        <View  style={{ marginTop: 0 }}>
          <View style={{flexDirection: 'row'}}>
        {this._displayLoading()}
        <TextInput
                 style={styles.textinput}
                 placeholder='Titre de la série'
                 onChangeText={(text) => this._searchTextInputChanged(text)}
                 onSubmitEditing={() => this._searchShows()}
                 returnKeyType="search"
                 onPress={() => this.props.navigation.push('')}
               />
     <Button title='Rechercher' style={{height:35}}  onPress={() => this._searchShows()}/>
     </View>
     <FlatList
      data={this.state.shows}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <ShowItem show={item} displayDetailForShow={this._displayDetailForShow} />}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (this.state.shows.length > 0  && this.page < this.totalPages) {
    //  console.log("onEndReached"),
        this._loadShows()

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
    flex:1

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
  SearchShow:{
    screen: SearchShow,
    headerMode: 'none',
    navigationOptions: {
       title: 'Recherche de séries',
       header: null,
      tabBarLabel: 'Séries',
      headerVisible: false,
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },

  ShowDetail:{
    screen: ShowDetail,
    navigationOptions: {
       tabBarVisible: false ,
    title: 'Série',
    tabBarLabel: 'Séries',
    tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  }

})

const App = createAppContainer(RootStack);

export default App;
