import { firebase } from './firebase'
const Swal = require('sweetalert2')

const auth = firebase.auth()
const createCredentials = async (email, password) => {
    const user = await auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            Swal.fire("Salvo!", "O usuário foi salvo com sucesso!", "success");
            return user
        })
        .catch((error) => {
            console.error("Erro ao criar Usuário", error);
            Swal.fire("Erro!", error.message, "error");
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    return user
}

function mensagemLoginSucesso() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Logado com sucesso!'
    })
}

const login = async (email, password) => {
    const user = await auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            mensagemLoginSucesso();
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