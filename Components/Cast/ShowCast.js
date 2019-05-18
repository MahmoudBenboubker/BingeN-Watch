// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import { getShowDetailFromApi, getImageFromApi, getShowDetailFromApiCreditsFromApi } from '../../API/TMDBApi'


class FilmCast extends React.Component {
  render() {
    const show = this.props.show
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(show.profile_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.title_text}>{show.name}</Text>
            </View>
          <View style={styles.description_container}>
           <Text style={styles.vote_text}>{show.character}</Text>
         </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 100,
    flexDirection: 'row'
  },
  image: {
    width: 80,
    height: 80,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 60
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
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {

    fontSize: 15,
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

export default FilmCast
