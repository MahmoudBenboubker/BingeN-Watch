// API/TMDBApi.js

const API_TOKEN = "fbcb32efc51bc945160fb9a47e422024";


export function getMultipleFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/multi?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}


export function getFilmsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getShowsFromApiWithSearchedText (text, page) {
  const url = 'https://api.themoviedb.org/3/search/tv?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w154' + name
}

export function getImageHQFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

// Récupération du détail d'un film
export function getFilmDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Récupération du détail d'une série
export function getShowDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}


// Récupération du casting d'un film
export function getFilmCreditsFromApi (id) {
  return fetch('https://api.themoviedb.org/3/movie/'+ id +'/credits?api_key='+ API_TOKEN +'&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Récupération du casting d'un film
export function getShowCreditsFromApi (id) {
  return fetch('https://api.themoviedb.org/3/tv/'+ id +'/credits?api_key='+ API_TOKEN +'&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}


// Récupération des films tendances
export function getTrendingFilmsFromAPI (id) {
  return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=fbcb32efc51bc945160fb9a47e422024&language=fr&page=1')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Récupération des films tendances
export function getFilmVideosFromAPI (id) {
  return fetch('https://api.themoviedb.org/3/movie/'+ id + '/videos?api_key=fbcb32efc51bc945160fb9a47e422024&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}



// Récupération des films tendances
export function getShowVideosFromAPI (id) {
  return fetch('https://api.themoviedb.org/3/tv/'+ id + '/videos?api_key=fbcb32efc51bc945160fb9a47e422024')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}


// Récupération du détail d'une personne
export function getPersonDetailFromApi (id) {
  return fetch('https://api.themoviedb.org/3/person/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

// Récupération des crédits d'une personne
export function getPersonCreditsFromApi (id) {
  return fetch('https://api.themoviedb.org/3/person/' + id + '/combined_credits?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
