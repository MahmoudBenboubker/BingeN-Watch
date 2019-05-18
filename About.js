import React from 'react';
import {View,Text} from 'react-native';


class About extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.loading_container}>
        <View style={{left:'2.5%',right:'2.5%', top:'-20%'}}>
          <Text style={{color:'#ffffff'}}> {"   "} Binge&Watch est une application contenant des informations en matière de films, séries TV et célébrité.{"\n"} {"   "} Regardez des vidéos, des bandes-annonces, des clips en coulisse, et bien plus.{"\n"} {"   "} Consultez les horaires des séances des cinémas du Maroc.  </Text>
          <Text style={{color:'#ffffff'}}>  {"\n"} {"   "}Application réalisée sous React Native. Gestion des utilisateurs et de leurs données sous Google Firebase. D'après les informations de l'API "The Movie Database". </Text>
          <Text style={{color:'#ffffff'}}>  {"\n"} {"   "}Developpeur : BENBOUBKER Mahmoud {'\n'}  {"   "} Version : 1.0.0</Text>
      </View>
      </View>
    );
  }
}

export default About

const styles = {

loading_container: {
  backgroundColor: '#555',
   position: 'absolute',
   left: '0%',
   right: '0%',
   top: "0%",
   bottom: 0,
   alignItems: 'center',
   justifyContent: 'center'
 }
}
