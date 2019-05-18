import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity, Image,Alert, AsyncStorage } from 'react-native';
import * as firebase from 'firebase'
import {Container, Content, Header, Input, Item, Form,  Label} from 'native-base'
import AfterLogin from './AfterLogin'
import SignIn from './SignIn'
import About from './About'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import {config} from './API/Firebase'
import HomeScreen from './Home/HomeScreen'

firebase.initializeApp(config);


class LogIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: " ",
      password: " ",
      myKey: null,
      credential: " ",
    }
  }

  _signInAsyncFacebook = async () => {
  await AsyncStorage.setItem('credential', this.state.credential);


};


  async loginWithFacebook() {

    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2265724967034123', { permissions: ['public_profile'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      this._signInAsyncFacebook(credential)

      this.setState({credential: credential});
      firebase.auth().signInWithCredential(credential).then( () =>
        {
          firebase.auth().currentUser.getIdToken(true);
          console.log(firebase.auth().currentUser)
        this.props.navigation.navigate("HomeScreen") }
      ).catch((error) => {
        console.log(error)
      })
    }
  }

  async saveKey(value) {
     try {
       await AsyncStorage.setItem('@MySuperStore:key', value);
     } catch (error) {
      // console.log("Error saving data" + error);
     }
   }

   _signInAsync = async () => {
   await AsyncStorage.setItem('userEmail', this.state.email);
      await AsyncStorage.setItem('userPassword',this.state.password);

 };


  loginUser = (email,password) => {
    try{
        if(this.state.password==" " ||  this.state.email==" " ){
        Alert.alert('','Vérifier votre email et votre mot de passe',[
          {text: 'OK'},
        ],{ cancelable: false })
      }
      else{
          this._signInAsync()
            firebase.auth().signInWithEmailAndPassword(email, password).then( () =>
              {
              this.saveKey(firebase.auth().currentUser.displayName)
              this.props.navigation.navigate("AuthLoadingScreen",{user : firebase.auth().currentUser.displayName }) }
            ).catch(error => {
              if(error.code=='auth/invalid-email' || error.code=='auth/user-disabled' || error.code=='auth/user-not-found' || error.code=='auth/wrong-password'  )
                          {
                  Alert.alert('','Échec de la connexion. Vérifier votre email et mot de passe',[
                    {text: 'OK'},
                  ],{ cancelable: false })
                  }

         // handle other codes ...

  });



          }}

  catch(error){
        //    console.log("Entrez plus de 6 caractères.")
  }
}


  render() {

    return (
        <Container style={styles.container} >
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Image
          style={styles.image}
         source={require('./Images/logo.png')} />
         </View>
          <Form>
            <Item floatingLabel>
              <Label
              style={{color:"white"}} > Email </Label>
              <Input
                autoCorrect={false}
                 style={{color:"white"}}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({email})}
                />
            </Item>

            <Item floatingLabel>
              <Label  style={{color:"white"}} > Mot de Passe </Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                style={{color:"white"}}
                returnKeyType="go"
                onSubmitEditing={() => this.loginUser(this.state.email, this.state.password)}
                onChangeText={(password) => this.setState({password})}
                />
            </Item>
                  </Form>
                    <View  containerViewStyle={{borderRadius: 20}} style={{ marginTop: 50, width: "95%", marginLeft:"2.5%",borderRadius: 60}}>
                <Button  borderRadius={60}
                containerViewStyle={{borderRadius:60}}
                buttonStyle={{borderRadius:60}}
                  title="S'identifier"
                  color = "#3cb371"
                  onPress={ () => this.loginUser(this.state.email, this.state.password)}
                />
                  <View style={{height:10}} />

              <Button  borderRadius={60}
                containerViewStyle={{borderRadius:60}}
                buttonStyle={{borderRadius:60}}
                  title="Connexion avec FACEBOOK"
                  color = "#3b5998"
                  onPress={ () => this.loginWithFacebook()}
                />
                                </View>
                    <View style={styles.bottom}>
                    <View style={{width: "50%"}}>
                <Button
               style={styles.button1}
               color= '#555'
               containerViewStyle={{      alignSelf: 'stretch'    }}
                  title="S'enregistrer"
                      onPress={() => this.props.navigation.navigate('SignIn')}
                />
                  </View>
                  <View style={{width: "55%"}}>
                <Button
               style={styles.button2}
               color= '#555'

                  title="À propos"
                    onPress={ () => this.props.navigation.navigate('About')}
                />
                </View>
                  </View>
        </Container>
    );
  }
}


const RootStack = createStackNavigator({
  LogIn:{
    screen: LogIn,
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

  SignIn:{
    screen: SignIn,
    navigationOptions: {
      headerTintColor: '#3cb371',
      headerStyle: {
         backgroundColor: '#000000',
         elevation: null},

     title: "S'enregistrer",
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  },

  About:{
    screen: About,
    navigationOptions: {
      headerTintColor: '#3cb371',
      headerStyle: {
         backgroundColor: '#000000',
         elevation: null},

     title: "À propos",
      tabBarLabel: 'Séries',
      tabBarIcon : ({tintColor}) => (
        <Icon name="tv" color={tintColor} size={24} />
      )
    }
  }

})

const AuthApp = createAppContainer(RootStack);

export default AuthApp;



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
