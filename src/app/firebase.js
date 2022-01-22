/*import { initializeApp} from "firebase/app";
import { getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut} from "firebase/auth";*/
const { default: axios } = require('axios');
const { initializeApp } = require('firebase/app');
const { getFirestore,
    collection,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    doc} = require('firebase/firestore')
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
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (cred) => {
                await setDoc(doc(dataBase, "users", (cred.user.uid)), {
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
                }).then( async()=>{

                    const docRef = doc(dataBase, 'users', `${cred.user.uid}`)
                    const docSnap = await getDoc(docRef);
                    
                    if (docSnap.exists()) {
                       return userData = docSnap.data();
                      } else {
                        console.log("No such document!");
                      }

                })
                
                
                function sendUser() {
                    let user = axios.post('/users', cred.user)
                    let userD = axios.post('/users', userData)
                    return user && userD
                }
                sendUser()
                window.location.href = "/profile"
            })
        signupForm.reset();
    })
}


