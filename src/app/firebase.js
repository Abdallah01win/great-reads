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
const { wait } = require('./getbooks')
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
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } = require('firebase/storage')

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
const signUpBtn = document.getElementById('signUpBtn');
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
newArray = "";
const searchForm = document.getElementById('navSearchForm');
if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = searchForm.searchFormInput.value;
        const dataa = await wait(searchTerm);
        const books = dataa.data.items;
        newArray = books.filter(book => {
            if (book.volumeInfo.publishedDate && book.volumeInfo.imageLinks) {
                return book.volumeInfo.imageLinks.thumbnail && parseInt(book.volumeInfo.publishedDate.substring(0, 4)) >= 1900 && book.volumeInfo.pageCount > 60 && book.volumeInfo.categories == ("Fiction");
                /*("City planning" && "Industries" && "Consumer credit" && )*/
            }
        })
        console.log(newArray)
        axios.post('/search', newArray).then(()=>{
            //window.location.href = "/search"
        })
    })
    console.log(newArray)
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        signUpBtn.innerHTML = "<div class='loader'></div>";
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
                    currentlyReading: {
                        discription: "",
                        title: "Currently Reading",
                        books: []
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
                active = ["", ""]
                let users = axios.post('/users', active)
                window.location.href = "/"
            })
    })
}

const logInForm = document.getElementById('login');
const logingInBtn = document.getElementById('logingInBtn');
if (logInForm) {
    logInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        logingInBtn.innerHTML = "<div class='loader'></div>";
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
const loadingImg = document.getElementById('loadingImg');
if (imgupload) {
    imgupload.addEventListener('change', async (e) => {
        //console.log(loadingImg)
        loadingImg.innerHTML = "<div class='loader' style='width:3.2rem; height: 3.2rem'></div>";
        const user = auth.currentUser
        const file = e.target.files[0];
        const storage = getStorage();
        const listRef = ref(storage, 'users/' + auth.currentUser.uid)
        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    if (itemRef) {
                        deleteObject(itemRef)
                            .then(() => {
                                console.log('deleted')
                            })
                    }
                });
            })
        const storageRef = ref(storage, "users/" + auth.currentUser.uid + "/" + file.name);
        await uploadBytes(storageRef, file).then(() => {
            console.log("file uploaded to storage")
        }).then(() => {
            getDownloadURL(storageRef).then(async (url) => {
                console.log(url);
                await setDoc(doc(dataBase, "users", (user.uid)), {
                    userInfo: {
                        imgUrl: url,
                    },
                }, { merge: true }).then(async () => {
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
    })
}

const profileForm = document.getElementById('profile-form');
const profileFormBtn = document.getElementById('profileFormBtn');
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        profileFormBtn.innerHTML = "<div class='loader'></div>";
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
        }, { merge: true }).then(async () => {
            const user = auth.currentUser
            const docRef = doc(dataBase, 'users', `${user.uid}`)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                userData = docSnap.data();
                active = [user, userData]
                let users = axios.post('/users', active)
            }
        })
        window.location.href = "/profile"
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
const bookShelvs = document.getElementsByClassName('shelv__book');
for (let i = 0; i < bookShelvs.length; i++) {
    bookShelvs[i].addEventListener('click', async(e)=>{
        e.preventDefault();
        bookIndex = i
        console.log(bookIndex)
        let index = axios.post('/book', [i]).then(()=>{
            //window.location.href = "/book";
        })
    })
}
const addToCol = document.getElementById("addToCol");
const addToCurentReads = document.getElementById("addToCurentReads");
if (addToCol) {
    addToCol.addEventListener("click", (e) => {
        e.preventDefault();
        // display collection list
    });
    addToCurentReads.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`clicked book id is ${newArray}`)
        // add to currenly reading and alert when doen
    })
}

