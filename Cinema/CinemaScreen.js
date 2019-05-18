import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import {  Container, Content, Header, Left, Right, Icon, Body } from 'native-base'
import cinemas from './dataCinema'
import CinemaItem from './CinemaItem'
import CinemaDetail from './CinemaDetail'
import films from './dataCinema'
import { createStackNavigator, createAppContainer } from 'react-navigation'

class CinemaScreen extends React.Component {


  constructor(props) {
   super(props)
   this.state = { cinema: undefined,
             isLoading: false


                }
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
   _displayDetailForFilm = (idFilm) => {
//    console.log("Display cinema with id " + idFilm)
  const cinema1=films[idFilm-1]
  this.setState({
    cinema: films[idFilm-1]
  })

  //  getFilmCreditsFromApi(idFilm).then(data => console.log(data));
     this.props.navigation.navigate("CinemaDetail", { idFilm: idFilm })
  }

  render() {
    return (
      <Container>
          <Header style={{ marginTop: 24, backgroundColor: '#fff',   height: 50 }} >
            <Left  style={{marginRight: 15, flexDirection:'row', flex:1}} >
                <Icon name='md-menu' style={{marginRight: 20}} onPress={()  => this.props.navigation.openDrawer()} />
                  <Text style={{marginRight: 0, fontSize:20,fontWeight:'bold'}}>Cinémas</Text>
            </Left>
            <Body>

            </Body>
            <Right />
          </Header>

          <FlatList
            data={cinemas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <CinemaItem film={item}
            displayDetailForFilm={this._displayDetailForFilm} />}
          />

      </Container>
    );
  }
}

const RootStack = createStackNavigator({
  CinemaScreen:{
    screen:  CinemaScreen,
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

  CinemaDetail:{
    screen: CinemaDetail,
    navigationOptions: {
     title: 'Cinéma',
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  }

})

const CinemasScreen = createAppContainer(RootStack);


export default CinemasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
