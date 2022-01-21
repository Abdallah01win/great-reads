/*import { initializeApp} from "firebase/app";
import { getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut} from "firebase/auth";*/
const { default: axios } = require('axios');
const { initializeApp } = require('firebase/app');
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyDNrU14PpFboO3kGq8CadALxnVqLm9liz8",
    authDomain: "great-reads-73b02.firebaseapp.com",
    projectId: "great-reads-73b02",
    storageBucket: "great-reads-73b02.appspot.com",
    messagingSenderId: "145851792862",
    appId: "1:145851792862:web:77696668cfc874b846314f"
};

initializeApp(firebaseConfig);
const auth = getAuth();

const signupForm = document.getElementById('signup');
const signUpBtn = document.getElementById('signUp');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                function sendUser() {
                    let user = axios.post('/users', cred.user)
                    return user
                }
                sendUser()
                window.location.href = "/profile"
            })
        signupForm.reset();
    })
}


