import React from 'react'
import { Text, View, TouchableOpacity,Image } from 'react-native'
import { Container, Content, Header, Left, Right, Icon, Body, Form,ListItem,Item, Label, Input } from 'native-base'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Swiper from 'react-native-swiper'
import SearchMovie from './SearchMovie'
import SearchShow from './SearchShow'
import ShowDetail from './ShowDetail'
import FilmDetail from './FilmDetail'


class HomeSearch extends React.Component {



    goToSearchMovie = () => {
          this.props.navigation.navigate("SearchMovie")
    }


        goToSearchShow = () => {
              this.props.navigation.navigate("SearchShow")
        }



  render() {
    return (
      <Container style={{backgroundColor: '#fff'}}>
          <Header style={{ marginTop: 24, backgroundColor: '#fff',   height: 50 }} >
            <Left  style={{marginRight: 15, flexDirection:'row', flex:1}} >
                <Icon name='md-menu' color="white" style={{marginRight: 20}} onPress={()  => this.props.navigation.openDrawer()} />
                  <Text style={{marginRight: 0, fontSize:20,fontWeight:'bold'}}>Recherche</Text>
            </Left>
            <Body>

            </Body>
            <Right />
          </Header>




            <TouchableOpacity style={{flex:1}} onPress={this.goToSearchMovie}>

                        <Image
                        style={{flex:1, width:null, resizeMode: 'cover'}}
                         source={{uri: 'https://firebasestorage.googleapis.com/v0/b/projet-reborn-101.appspot.com/o/5A2bMlLfJrAfX9bqAibOL2gCruF.jpg?alt=media&token=0e371821-4f77-4edd-8315-40bf112ca72c'}}/>


          </TouchableOpacity>

            <TouchableOpacity style={{flex:1}} onPress={this.goToSearchShow}>

                        <Image
                        style={{flex:1,height:null, width:null, resizeMode: 'cover'}}
                         source={{uri: 'https://firebasestorage.googleapis.com/v0/b/projet-reborn-101.appspot.com/o/got.jpg?alt=media&token=5cdf24f5-007f-4c79-b036-6b5a42aed659'}}/>

            </TouchableOpacity>




      </Container>
    );
  }
}



const RootStack = createStackNavigator({



  SearchMovie:{
    screen: SearchMovie,
     headerMode: 'none',
    navigationOptions: {
       title: 'Recherche de films',
    headerVisible: false,
 header: null,

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



const Search = createAppContainer(RootStack);

export default Search;
