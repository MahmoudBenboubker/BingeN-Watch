// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { getImageFromApi, getFilmVideosFromAPI } from '../../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'


class FilmVideo extends React.Component {
  render() {
    const {film, displayDetailForFilm}  = this.props

    return (
      <View>
      <TouchableOpacity style={styles.main_container}
       onPress={() =>  { Linking.openURL('https://www.youtube.com/watch?v='+film.key)}} >

      <Image
        style={styles.image}
        source={{uri: 'https://i.ytimg.com/vi/' + film.key + '/hqdefault.jpg'}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.vote_text}>{film.type}</Text>
            <Text style={styles.title_text}>{film.name}</Text>

          </View>
        </View>
      </TouchableOpacity>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  main_container: {
    height: 130,
    flexDirection: 'row'
  },
  image: {
    width: 180,
    height: 120,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'column'

  },
  title_text: {
    fontWeight: 'bold',
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
    flex: 7
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

export default FilmVideo
