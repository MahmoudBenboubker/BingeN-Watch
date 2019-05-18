import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { AsyncStorage, Text, View, TextInput, StyleSheet } from 'react-native'
import * as firebase from 'firebase'
import {config} from '../API/Firebase'

class AsynchInfo extends Component {
  constructor(props) {
     super(props);
     this.state = {

         name: undefined
     }
   }

componentWillMount(){

if (firebase.auth().currentUser != null)
{  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //  console.log(username)
      this.setState({ name: username })
  }.bind(this));
  this.forceUpdate()}
}

   render() {


      return (
         <View  >

            <Text style={{marginTop:5, fontStyle: 'italic'}}>
              {this.state.name}
            </Text>
         </View>
      )
   }
}
export default AsynchInfo

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
   },
   textInput: {
      margin: 5,
      height: 100,
      borderWidth: 1,
      backgroundColor: '#7685ed'
   }
})
