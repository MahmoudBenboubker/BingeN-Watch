// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import FilmItem from './FilmItem'
import ShowItem from './ShowItem'
import { getImageFromApi, getPersonDetailFromApi} from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class MultipleItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      person: undefined,


    }
  }





  render() {
    const {film, displayDetailForFilm}  = this.props
  //  console.log(this.props)
      if (film.media_type=="tv"){
        return (
          <TouchableOpacity style={styles.main_container}
           onPress={() => displayDetailForFilm('a'+film.id)} >
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>{film.name}</Text>
                <Text style={styles.vote_text}>{film.vote_average}</Text>
              </View>
              <View style={styles.description_container}>
              <Text style={{fontStyle: 'italic'}} > Série </Text>
                <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
              </View>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>Sortie le {moment(new Date(film.first_air_date)).format('DD/MM/YYYY')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      }
      if (film.media_type=="movie"){

        return (
          <TouchableOpacity style={styles.main_container}
           onPress={() => displayDetailForFilm('b'+film.id)} >

          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <Text style={styles.title_text}>{film.title}</Text>
                <Text style={styles.vote_text}>{film.vote_average}</Text>
              </View>
              <View style={styles.description_container}>
              <Text style={{fontStyle: 'italic'}} > Film </Text>

                <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
              </View>
              <View style={styles.date_container}>
                <Text style={styles.date_text}>Sortie le {moment(new Date(film.release_date)).format('DD/MM/YYYY')} </Text>
              </View>
            </View>
          </TouchableOpacity>
        )

      }

      if (film.media_type=="person"){



        return (
          <TouchableOpacity style={styles.main_container}
           onPress={() => displayDetailForFilm('c'+film.id)} >

          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.profile_path)}}
            />
            <View style={styles.content_container}>
              <View style={styles.header_container}>
                <View style={{flex:1, flexDirection:'column'}}>
                <Text style={styles.title_text}>{film.name}</Text>
                <Text style={{fontStyle: 'italic'}} > Personnalité </Text>
                 </View>
                <Text style={styles.vote_text}>{film.vote_average}</Text>
              </View>
              <View style={styles.description_container}>


                <Text style={styles.description_text} numberOfLines={6}> </Text>
              </View>
              <View style={styles.date_container}>

              </View>
            </View>
          </TouchableOpacity>
        )}





  }
}


const styles = StyleSheet.create({
  main_container: {
    height: 195,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 185,
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

export default MultipleItem
