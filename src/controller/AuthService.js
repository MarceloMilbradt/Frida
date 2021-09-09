import { firebase } from "./firebase";
const Swal = require("sweetalert2");

var config = {
  apiKey: "AIzaSyCD7ZDoslb0BvgZYNI-G6hxez8VSpzchI8",
  authDomain: "frida-f6343.firebaseapp.com",
  databaseURL: "https://frida-f6343-default-rtdb.firebaseio.com",
  projectId: "frida-f6343",
  storageBucket: "frida-f6343.appspot.com",
  messagingSenderId: "127916459378",
  appId: "1:127916459378:web:546f32e5936d4e7b1e09eb",
};

var secondaryApp = firebase.initializeApp(config, "Secondary");

const generatePassword = () => {
  var length = 32,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const auth = firebase.auth();
const createCredentials = async (email) => {
  const user = await secondaryApp
    .auth()
    .createUserWithEmailAndPassword(email, generatePassword())
    .then((userCredential) => {
      secondaryApp.auth().sendPasswordResetEmail(email);
      secondaryApp.auth().signOut();
      var user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.error("Erro ao criar Usuário", error);
      Swal.fire("Erro!", error.message, "error");
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  return user;
};

function mensagemLoginSucesso() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: "Logado com sucesso!",
  });
}

const login = async (email, password) => {
  const user = await auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      mensagemLoginSucesso();
      return user;
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  return user;
};

const logout = async () => {
  auth
    .signOut()
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      // An error happened.
    });
};

const getLoginState = async () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};
const setWatcher = (fn) => {
  auth.onAuthStateChanged(fn);
};
const getCurrentUser = () => {
  const user = auth.currentUser;
  return user;
};

export {
  createCredentials,
  login,
  logout,
  getLoginState,
  getCurrentUser,
  setWatcher,
};
