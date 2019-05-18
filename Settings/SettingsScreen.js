import React, { Component } from 'react';
import { StyleSheet, Text, View,   AsyncStorage, Button, Alert } from 'react-native';
import { Container, Content, Header, Left, Right, Icon, Body, Form,ListItem,Item, Label, Input } from 'native-base'
import * as firebase from 'firebase'
import {config} from '../API/Firebase'
import AsynchInfo from '../ASynch/ASynchInfo'

class SettingsScreen extends React.Component {

      constructor(props) {
        super(props)
        this.state = {
          email: " ",
          username: " ",
          password: " ",
          password2: " ",

        }
      }



      _signOutAsync = () => {
        Alert.alert(
            '',
            'Voulez-vous vraiment vous déconnecter?',
              [
                {
                  text: 'Annuler',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'Oui', onPress: () => this._confirmSignOutAsync()},
              ],
              {cancelable: false},
            );
              };


      _confirmSignOutAsync = async () => {
          await AsyncStorage.clear();
          firebase.auth().signOut().then(function() {
            // Sign-out successful.

          }).catch(function(error) {
            // An error happened.
          });
              this.props.navigation.navigate('AuthApp');
        };


          confirmUpdate = (identifiant) => {


            const user = firebase.auth().currentUser
            const database = firebase.database();
            setTimeout(() => {
               firebase.database().ref('users/'+user.uid).update(
                   {
                       username: identifiant

                   }
               ).then(() => {
                   console.log('INSERTED !');
               }).catch((error) => {
                   console.log(error);
               });
            }, 0);

                    this.props.navigation.navigate('AuthLoadingScreen');


          }

          updateUser = (identifiant) => {
            Alert.alert(
                '',
                'Voulez-vous vraiment changer votre pseudo ?',
                  [
                    {
                      text: 'Annuler',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'Oui', onPress: () => this.confirmUpdate(identifiant)},
                  ],
                  {cancelable: false},
                );
          }


  render() {
    return (
      <Container>
          <Header style={{ marginTop: 24, backgroundColor: '#fff',   height: 50 }} >
            <Left  style={{marginRight: 15, flexDirection:'row', flex:1}} >
                <Icon name='md-menu' style={{marginRight: 20}} onPress={()  => this.props.navigation.openDrawer()} />
                  <Text style={{marginRight: 0, fontSize:20,fontWeight:'bold'}}>Paramètres</Text>
            </Left>
            <Body>

            </Body>
            <Right />
          </Header>
              <View style={{height: 20}} />
          <Form>
          <ListItem icon>
                  <Item floatingLabel>
                   <Icon style={{ color: "black"}} name='person' />
                    <Label  style={{color:"gray"}} > Pseudonyme </Label>
                    <Input

                      autoCorrect={false}
                      autoCapitalize="none"
                      style={{color:"black"}}
                      onChangeText={(username) => this.setState({username})}
                      />
                  </Item>
                    </ListItem>
                    </Form>

                        <View style={{height: 20}} />

                    <View  style={{width: "95%", marginLeft:"2.5%" }}>
                    <Button style={{marginTop:300}}
                      title="Confirmer changements"
                      color = "#3cb371"
                      onPress={ () => this.updateUser(this.state.username)}
                    />
                    </View>
                          <View style={{height: 20}} />

                            <View  style={{width: "95%", marginLeft:"2.5%" }}>
                    <Button style={{marginTop:300}}
                      title="Deconnection"
                      color = "#D11B1B"
                      onPress={ () => this._signOutAsync()}
                    />
                    </View>

      </Container>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    justifyContent: 'center',
  },

  button1: {
  borderTopWidth:0,
  position: 'absolute',
  bottom:0,
  shadowColor: 'transparent'
  },
  button2: {
  position: 'absolute',
  bottom:0,
  shadowColor: 'transparent'

  },
  bottom: {
  position: 'absolute',
  flex: 1,
    bottom:0,
  flexDirection : 'row'

  },image: {
    marginTop: 50,
    width: 120,
    height: 120,

  }
});
