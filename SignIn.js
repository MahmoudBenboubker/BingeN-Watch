import React, { Component } from 'react';
import { StyleSheet, Text, View , Image, Button, AsyncStorage,Alert} from 'react-native';
import {  Container, Content, Header, Left, Right, Icon, Body, Form,ListItem,Item, Label, Input } from 'native-base'
import * as firebase from 'firebase'
import {config} from './API/Firebase'

class SignIn extends React.Component {


    constructor(props) {
      super(props)
      this.state = {
        email: " ",
        username: " ",
        password: " ",
        password2: " ",
        alreadyUsed: false

      }
    }


    signUpUser = (email,password) => {

        if(this.state.password==" " ||  this.state.password2==" " ||  this.state.email==" " ){
          Alert.alert('','Veuillez remplir tous les champs',[
         {text: 'OK'},
       ],{ cancelable: false })
        }
        else{
              if(this.state.password != this.state.password2){
                Alert.alert('','Verifier votre mot de passe',[
               {text: 'OK'},
             ],{ cancelable: false })
              }
              else{
              firebase.auth().createUserWithEmailAndPassword(email, password).then( () =>
                {

                      Alert.alert('','Inscription réussie',[
                     {text: 'OK', onPress: () => this.props.navigation.navigate("LogIn")},
                   ],{ cancelable: false })
               }
              ).catch(error => {
                switch(error.code) {
                  case 'auth/email-already-in-use':
                    Alert.alert('','Cet email est déjà utilisé. Veuillez entrer un nouveau',[
                      {text: 'OK'},
                    ],{ cancelable: false })
                    this.setState({
                      alreadyUsed : true
                    });
                break;
           // handle other codes ...
       }

    });




      }

            let username = this.state.username
            AsyncStorage.setItem('username',username)
            this.displayData



  }
    }


                displayData = async () => {
                  try{
                    let username = await AsyncStorage.getItem('username');
                  console.log(username)
                  }
                  catch(error){
                    console.log('erreur'+error)
                  }
                }


  render() {
    return (
      <Container style={styles.container} >
        <Form>
            <ListItem icon>
          <Item floatingLabel>
           <Icon style={{ color: "white"}} name='mail' />
            <Label
            style={{color:"white"}} > Email </Label>
            <Input
              autoCorrect={false}
               style={{color:"white"}}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
              />
          </Item>
            </ListItem>
            <View style={{height: 20}} />
{  /*<ListItem icon>
          <Item floatingLabel>
           <Icon style={{ color: "white"}} name='person' />
            <Label  style={{color:"white"}} > Identifiant </Label>
            <Input

              autoCorrect={false}
              autoCapitalize="none"
              style={{color:"white"}}
              onChangeText={(username) => this.setState({username})}
              />
          </Item>
            </ListItem>*/}
            <ListItem icon>
          <Item floatingLabel>
           <Icon style={{ color: "white"}} name='lock' />
            <Label  style={{color:"white"}} > Mot de Passe </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              style={{color:"white"}}
              onChangeText={(password) => this.setState({password})}
              />
          </Item>
            </ListItem>
                <View style={{height: 20}} />
          <ListItem icon>
          <Item floatingLabel>
             <Icon style={{ color: "white"}} name='lock' />
            <Label  style={{color:"white"}} >
             Confirmer Mot de Passe </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              style={{color:"white"}}
              onChangeText={(password2) => this.setState({password2})}
              />
          </Item>
          </ListItem>
                </Form>
                  <View  style={{ marginTop: 50, width: "95%", marginLeft:"2.5%" }}>
              <Button style={{marginTop:300}}
                title="S'enregistrer"
                color = "#3cb371"
                onPress={ () => this.signUpUser(this.state.email, this.state.password)}
              />
                <View  style={{ marginTop:10 }}>
              <Text style={{color: 'white'}}>
                 {"       "}En appuyant sur "S'enregistrer", vous acceptez nos Conditions générales, notre Politique d’utilisation des données
              </Text>
                </View>
                 </View>

      </Container>
    )

  }
}

export default SignIn;

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
