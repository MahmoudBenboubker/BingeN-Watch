//API/Firebase.js
import * as firebase from 'firebase'
export const config = {
  apiKey: "AIzaSyCg6NG0t0hi3N3AIfnnWWNuwSzEC97Ny6g",
  authDomain: "projet-reborn-101.firebaseapp.com",
  databaseURL: "https://projet-reborn-101.firebaseio.com",
  projectId: "projet-reborn-101",
  storageBucket: "projet-reborn-101.appspot.com",
  messagingSenderId: "1092171511205"
};

export default class Firebase {
  static auth;
  static init(){
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
}
}

export function getWebSitefromFirebase (id) {
  return fetch('https://projet-reborn-101.firebaseio.com/cinemas/'+id+'/website.json')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getCinemaDetailfromFirebase (id) {
  return fetch('https://projet-reborn-101.firebaseio.com/cinemas/'+id+'.json')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getUserFavMovies (idUser) {
  return fetch('https://projet-reborn-101.firebaseio.com/users/'+idUser+'/FavListMovies.json')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}


export function getMessagesfromFirebase (id) {
  return fetch('https://projet-reborn-101.firebaseio.com/messages.json')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
