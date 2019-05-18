// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {getImageFromApi} from '../../API/TMDBApi'
import moment from 'moment'

class ShowSaison extends React.Component {
  render() {
      const show = this.props.show
      return (
        <View style={styles.main_container}>
          <Image
            style={styles.image}
              source={{uri: getImageFromApi(show.poster_path)}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>{show.name}</Text>
              <Text style={styles.vote_text}>{show.episode_count} Episodes</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={6}>{show.overview}</Text>
            </View>
            <View style={styles.date_container}>
                <Text style={styles.date_text}>Sorti le {moment(new Date(show.air_date)).format('DD/MM/YYYY')} </Text>
            </View>
          </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
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
    fontSize: 20,
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

export default ShowSaison
