// Cinema/CinemaItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class CinemaItem extends React.Component {
  render() {
    const {film, displayDetailForFilm}  = this.props

    return (
      <TouchableOpacity
      onPress={() => displayDetailForFilm(film.id)}
      style={styles.main_container}>
        <Image
          style={styles.image}
          resizeMode="contain"
            source={{uri: film.poster_path }}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.vote_text}>{film.city}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.title_text}>{film.name}</Text>
            <Text style={styles.description_text} numberOfLines={6}>{film.address}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>{film.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}
}

const styles = StyleSheet.create({
  main_container: {
    height: 180,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'white',
    flex:1
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 1,
    flexDirection: 'column'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 2
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default CinemaItem
