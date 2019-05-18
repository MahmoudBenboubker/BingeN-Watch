import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {config} from './API/Firebase'
import * as firebase from 'firebase'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
      const userPassword = await AsyncStorage.getItem('userPassword');
  /*    const accessToken = 'AEu4IL0DK2jCEzJWmemJEBJOE51H05iAdytVrDcgaeV9EswWHMcU23DFTV8E8Z2T0f_WzHi88_MTo4RxZFBt0w6XyVW177eofwJnqCtq5HR1zRSXUAvke-vXLglGkNPLQpGSeyCp1Foc62P3yb1-tV-KkprPP6jEcKXD8b961JoccRi0f4HrbVNqeGI9rf4sScmhw87tkBsM9uGOAbRL-Dhrhuy9EGuVAuU0OxU2kQo03qC0IJ5vC0mUJ5nawTY0Pwll4YaxIJZROFhHIe00_kardGNJS4kKXH4aGF4sSVHLHqKKq_wvfv8'
      const credential = firebase.auth.FacebookAuthProvider.credential(accessToken);*/
      //const credential = await AsyncStorage.getItem('credential')

    //  console.log("Apres "+credential)

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if(userEmail){

      firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then( () =>
        {

        this.props.navigation.navigate("HomeScreen") }
      )


    } else{

        this.props.navigation.navigate('AuthApp');}

  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.loading_container}>
        <ActivityIndicator color="red" size='large'  />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen

const styles = {

loading_container: {
  backgroundColor: '#555',
   position: 'absolute',
   left: 0,
   right: 0,
   top: "0%",
   bottom: 0,
   alignItems: 'center',
   justifyContent: 'center'
 }
}
