import React, { Component } from 'react';
import { View, StyleSheet, Button, Linking, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.main_container}
       onPress={() => { Linking.openURL('https://www.youtube.com/watch?v=o1ozUcwnl5k')}} >
      <View style={styles.container}>
      <Image
      style={{flex:1}}
      source={require('./Images/venom.jpg')} />
      </View>
      </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
