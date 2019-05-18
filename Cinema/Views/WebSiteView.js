import React from 'react'
import { StyleSheet, View, Text, WebView } from 'react-native'

class WebSiteView extends React.Component {
  render() {
 const film = this.props.film
    return (
      <View style={styles.main_container}>
          <WebView
          source={{uri: film.website }}
          style={{marginTop: 20}}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190
  },
  title_text: {

  }
})

export default WebSiteView
