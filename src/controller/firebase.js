import firebase from "firebase/app";
import 'firebase/auth'
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCD7ZDoslb0BvgZYNI-G6hxez8VSpzchI8",
    authDomain: "frida-f6343.firebaseapp.com",
    databaseURL: "https://frida-f6343-default-rtdb.firebaseio.com",
    projectId: "frida-f6343",
    storageBucket: "frida-f6343.appspot.com",
    messagingSenderId: "127916459378",
    appId: "1:127916459378:web:546f32e5936d4e7b1e09eb",
};

firebase.initializeApp(firebaseConfig);

//utils
const db = firebase.firestore()
const auth = firebase.auth()

//collection references
const usuario = db.collection('usuario')
const avaliacao = db.collection('avaliacao')
const denuncia = db.collection('denuncia')
const ajuda = db.collection('ajuda')

export {
    firebase,
    db,
    auth,
    usuario,
    avaliacao,
    denuncia,
    ajuda
}