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
    doc, } = require('firebase/firestore')
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} = require("firebase/auth");
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage')

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
const userStatus = document.getElementById('userStatus');

onAuthStateChanged(auth, (user) => {
    if (user) {
        userStatus.classList.toggle('activeStatus');
        // ...
    } else {
        // User is signed out
        // ...
    }
});

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
                    userInfo: {
                        fName: fname,
                        lName: lname,
                        phoneNum: "",
                        adress: "",
                        imgUrl: "",
                    },
                    wantToRead: {
                        discription: "",
                        title: "Want To Read",
                        books: ["fahrenhite 451",
                            "The Lord Of the Flies",
                            "The Metamorphesis"]
                    },
                    Read: {
                        discription: "",
                        title: "Read",
                        books: ["Animal Farm",
                            "Poor Folks",
                            "The Gambler"]
                    },
                    favorits: {
                        discription: "",
                        title: "Favorits",
                        books: []
                    }
                }).then(async () => {
                    const user = auth.currentUser
                    const docRef = doc(dataBase, 'users', `${user.uid}`)
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        userData = docSnap.data();
                        active = [user, userData]
                        let users = axios.post('/users', active)
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

window.onunload = function () {
    if (auth.user) {
        signOut(auth)
            .then(() => {
                userStatus.classList.toggle('activeStatus')
            })
    }
}
const imgupload = document.getElementById('imgUpload');
if (imgupload) {
    imgupload.addEventListener('change', (e) => {
        const user = auth.currentUser
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, "users/" + auth.currentUser.uid + "/" + file.name);
        uploadBytes(storageRef, file).then(() => {
            console.log("file uploaded to storage")
        })

        getDownloadURL(storageRef).then(async (url) => {
            console.log(url);
            await setDoc(doc(dataBase, "users", (user.uid)), {
                userInfo: {
                    imgUrl: url,
                },
            }, { merge: true }).then(async() => {
                const docRef = doc(dataBase, 'users', `${user.uid}`)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    userData = docSnap.data();
                    active = [user, userData]
                    let users = axios.post('/users', active)
                } else {
                    console.log("No such document!");
                }
                window.location.href = "/profile"
            })

        })
    })
}

const profileForm = document.getElementById('profile-form');
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const user = auth.currentUser
        const firstName = profileForm.firstname.value
        const lastName = profileForm.lastname.value
        const phonenum = profileForm.phonenum.value
        const adress = profileForm.adress.value

        await setDoc(doc(dataBase, "users", (user.uid)), {
            userInfo: {
                fName: firstName,
                lName: lastName,
                phoneNum: phonenum,
                adress: adress
            },
        }, { merge: true })

    })
}

const creatColBtn = document.getElementById('newCol');
const creatCol = document.getElementById('creatCol');
const cancelCol = document.getElementById('cancelCol');
const closeColBtn = document.getElementById('closeColBtn');
const newColForm = document.getElementById('newColForm');

function hideColForm() {
    creatCol.classList.remove('showColForm')
    creatCol.classList.add('hideColForm')
}
if (creatColBtn) {
    creatColBtn.addEventListener('click', () => {
        creatCol.classList.remove('hideColForm')
        creatCol.classList.add('showColForm')
    })
    closeColBtn.addEventListener('click', () => {
        hideColForm()
    })
    cancelCol.addEventListener('click', () => {
        hideColForm()
    })
}

if (newColForm) {
    newColForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const colName = newColForm.newColName.value;
        const coldiscreption = newColForm.newColDisc.value;
        await setDoc(doc(dataBase, "users", (auth.currentUser.uid)), {
            colName: {
                discription: coldiscreption,
                title: colName,
                books: []
            },
        }, { merge: true })
            .then(async (cred) => {
                const user = auth.currentUser
                const docRef = doc(dataBase, 'users', `${user.uid}`)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    userData = docSnap.data();
                    active = [user, userData]
                    let users = axios.post('/users', active)
                } else {
                    console.log("No such document!");
                }
                window.location.href = "/collections"
            })
        signupForm.reset();
    })
}
