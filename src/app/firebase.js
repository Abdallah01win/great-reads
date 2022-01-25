/*import { initializeApp} from "firebase/app";
import { getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut} from "firebase/auth";
import {getFirestore,
    collection,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    doc} from "firebase/firestore"*/

const { default: axios } = require('axios');
const { initializeApp } = require('firebase/app');
const { getFirestore,
    collection,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    doc } = require('firebase/firestore')
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
const dataBase = getFirestore();
const collectionRef = collection(dataBase, 'users');
const auth = getAuth();

const signupForm = document.getElementById('signup');
const signUpBtn = document.getElementById('signUp');

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        const fname = signupForm.fname.value;
        const lname = signupForm.lname.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (cred) => {
                await setDoc(doc(dataBase, "users", (cred.user.uid)), {
                    userInfo:{
                        fName: fname,
                        lName: lname,
                        phoneNum: ""
                    },
                    wantToRead: [
                        "fahrenhite 451",
                        "The Lord Of the Flies",
                        "The Metamorphesis"
                    ],
                    read: [
                        "Animal Farm",
                        "Poor Folks",
                        "The Gambler"
                    ],
                    favorits: []
                }).then(async () => {
                    const docRef = doc(dataBase, 'users', `${cred.user.uid}`)
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        userData = docSnap.data();
                        active = [cred.user, userData]
                        let user = axios.post('/users', active)
                        console.log(userData)
                    } else {
                        console.log("No such document!");
                    }
                })
                window.location.href = "/profile"
            })
        signupForm.reset();
    })
}

const logOutBtn = document.getElementById('logOutBtn');
if (logOutBtn) {
    logOutBtn.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('clicked')
        signOut(auth)
            .then(() => {
                console.log('user sined out')
                window.location.href = "/"
            })
    })
}

const logInForm = document.getElementById('login');
if (logInForm) {
    logInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = logInForm.email.value
        const password = logInForm.password.value
        signInWithEmailAndPassword(auth, email, password)
            .then(async (cred) => {
                const docRef = doc(dataBase, 'users', `${cred.user.uid}`)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    userData = docSnap.data();
                    active = [cred.user, userData]
                    let user = axios.post('/users', active)
                } else {
                    console.log("No such document!");
                }
                window.location.href = "/profile"
            })
        signupForm.reset();
    })
}

const profileForm = document.getElementById('profile-form');
if(profileForm){
    profileForm.addEventListener('submit', async(e)=>{
        e.preventDefault()
        const firstName = profileForm.firstname.value
        const lastName = profileForm.lastname.value
        const phonenum = profileForm.phonenum.value

    })
}