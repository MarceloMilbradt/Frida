import { auth } from './firebase'

const createCredentials = async (email, password) => {
    const user = await auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            return user
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
    return user
}

const login = async (email, password) => {
    const user = await auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            return user
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    console.log(user)
    return user
}

const logout = async () => {

    auth.signOut().then(() => {
        console.log('logged out')
    }).catch((error) => {
        // An error happened.
    });

}

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

}
const setWatcher = (fn) => {
    auth.onAuthStateChanged(fn);
}
const getCurrentUser = () => {
    const user = auth.currentUser;
    return user
}

export {
    createCredentials,
    login,
    logout,
    getLoginState,
    getCurrentUser,
    setWatcher
}