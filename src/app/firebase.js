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
    doc, updateDoc, arrayUnion, arrayRemove, query, where } = require('firebase/firestore')
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
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

// Utility Functions
const savedIcon = "<ion-icon name='cloud-done-outline'></ion-icon>";
const errorIcon = "<ion-icon name='close-circle-outline'></ion-icon>"
const alert = document.getElementById('alert');
function alertUser(text, icon) {
    alert.firstElementChild.innerHTML = icon;
    alert.lastElementChild.innerHTML = text;
    alert.classList.add('show-alert');
    setTimeout(() => {
        alert.classList.remove('show-alert');
    }, 1600)
}
// scusses Example alertUser('Book Added Succesfuly', savedIcon);
// Error Example alertUser('an Arror accured', errorIcon);

const signupForm = document.getElementById('signup');
const signUpBtn = document.getElementById('signUpBtn');
const userStatus = document.getElementById('userStatus');

const searchForm = document.getElementById('navSearchForm');
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = searchForm.searchFormInput.value;
    if (searchTerm != "") {
        const dataa = await wait(searchTerm);
        const books = dataa.data.items;
        newArray = books.filter(book => {
            if (book.volumeInfo.publishedDate && book.volumeInfo.imageLinks) {
                return book.volumeInfo.imageLinks.thumbnail && parseInt(book.volumeInfo.publishedDate.substring(0, 4)) >= 1900 && book.volumeInfo.pageCount > 60 /*&& book.volumeInfo.categories == ("Fiction");
            /*("City planning" && "Industries" && "Consumer credit" && )*/
            }
        })
        axios.post('/search', newArray).then(() => {
            window.location.href = "/search"
        })
    }

})
const googleSignIn = document.getElementById('googleSignIn');
const googleLogIn = document.getElementById('googleLogIn');
if (googleSignIn) {
    googleSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider).then(async (result) => {
            const user = result.user;
            const name = user.displayName.split(/\s+/);
            const fName = name[0];
            const lName = name[1];
            console.log(user)
            await setDoc(doc(dataBase, "users", (user.uid)), {
                userInfo: {
                    fName: fName,
                    lName: lName,
                    phoneNum: "",
                    adress: "",
                    imgUrl: "",
                },
                wantToRead: {
                    discription: "",
                    title: "Want To Read",
                    books: []
                },
                Read: {
                    discription: "",
                    title: "Read",
                    books: []
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
        }).catch((err) => {
            console.error(err)
        })
    })
}
if (googleLogIn) {
    googleLogIn.addEventListener('click', () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider).then(async () => {
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
            window.location.href = "/profile"
        })
    })
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
                    WantToRead: {
                        discription: "",
                        title: "Want To Read",
                        books: []
                    },
                    Read: {
                        discription: "",
                        title: "Read",
                        books: []
                    },
                    currentlyReading: {
                        discription: "",
                        title: "Currently Reading",
                        books: []
                    },
                    Favorits: {
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
            }).catch(() => {
                alertUser('Incorrect Email or Password', errorIcon);
                logingInBtn.innerHTML = "Login"
            })
            window.location.href = "/profile"
        signupForm.reset();
    })
}

const imgupload = document.getElementById('imgUpload');
const loadingImg = document.getElementById('loadingImg');
if (imgupload) {
    imgupload.addEventListener('change', async (e) => {
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

function hideColForm(formContainer) {
    formContainer.classList.remove('showColForm')
    formContainer.classList.add('hideColForm')
}
if (creatColBtn) {
    creatColBtn.addEventListener('click', () => {
        creatCol.classList.remove('hideColForm')
        creatCol.classList.add('showColForm')
        window.scroll({ top: 0, left: 0 });
    })
    closeColBtn.addEventListener('click', () => {
        hideColForm(creatCol)
    })
    cancelCol.addEventListener('click', () => {
        hideColForm(creatCol)
    })
}

if (newColForm) {
    newColForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const colName = newColForm.newColName.value;
        const coldiscreption = newColForm.newColDisc.value;
        await setDoc(doc(dataBase, "users", (auth.currentUser.uid)), {
            [`${colName.replace(/\s/gm, '')}`]: {
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
    bookShelvs[i].addEventListener('click', async (e) => {
        e.preventDefault();
        bookIndex = i
        let index = axios.post('/book', [i]).then(() => {
            window.location.href = "/book";
        })
    })
}

const addToCurentReads = document.getElementById('addToCurentReads');
const addToCol = document.getElementById('addToCol');

if (addToCol) {
    bookId = addToCurentReads.parentElement.parentElement.firstElementChild.textContent;
    addToCurentReads.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(bookId);
        const user = auth.currentUser;
        // adding books ids to firestore
        await updateDoc(doc(dataBase, "users", `${auth.currentUser.uid}`), {
            "currentlyReading.books": arrayUnion(bookId)

        }, { merge: true }).then(async () => {
            alertUser('Book Added Succesfuly', savedIcon);
            const docRef = doc(dataBase, 'users', `${user.uid}`)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                userData = docSnap.data();
                active = [user, userData]
                let users = axios.post('/users', active)
            } else {
                console.log("No such document!");
            }
        })
        //Hide form here
    })
}


const colForm = document.getElementById('colForm');
const addToColForm = document.getElementById('addToColForm');
const chackBoxs = document.querySelectorAll('.colCheckbox');
if (addToColForm) {
    addToColForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        // get collections from firebase
        const docSnap = await getDoc(doc(dataBase, 'users', (user.uid)));
        const collections = docSnap.data();
        console.log(collections);
        for (const checkBox of chackBoxs) {
            if (checkBox.checked === true) {
                for (const col in collections) {
                    if (col !== "userInfo" && col !== "currentlyReading") {
                        if (collections[col].title === checkBox.value) {
                            // add bookID to the collection
                            await updateDoc(doc(dataBase, "users", `${auth.currentUser.uid}`), {
                                [`${col}.books`]: arrayUnion(bookId)
                            }).then(async () => {
                                alertUser('Book Added Succesfuly', savedIcon);
                                const docRef = doc(dataBase, 'users', `${user.uid}`)
                                const docSnap = await getDoc(docRef);
                                if (docSnap.exists()) {
                                    userData = docSnap.data();
                                    active = [user, userData]
                                    let users = axios.post('/users', active)
                                } else {
                                    console.log("No such document!");
                                }

                            })
                        }
                    }
                }
            }
        }
        addToColForm.reset();
        colForm.classList.toggle('hide-form');
        colForm.classList.toggle('show-form');
    })
}

const cols = document.querySelectorAll('.cols__col');
if (cols) {
    for (const col of cols) {
        col.addEventListener('click', async (e) => {
            let colTitle = col.firstElementChild.textContent;
            const docSnap = await getDoc(doc(dataBase, "users", `${auth.currentUser.uid}`))
            if (docSnap.exists()) {
                userData = docSnap.data();
                for (const FBcol in userData) {
                    if (colTitle === userData[FBcol].title) {
                        console.log(userData[FBcol].books)
                        const requestedCol = axios.post('/collection', userData[FBcol]).then(() => {
                            window.location.href = "/collection"
                        })
                    }
                }
            } else {
                console.log("No such document!");
            }
        })
    }
}

//deleteing books from collections
const colbook = document.getElementsByClassName('collection__book');
const deleteBook = document.getElementsByClassName('deleteBook');
if (deleteBook) {
    for (let i = 0; i < deleteBook.length; i++) {
        deleteBook[i].addEventListener('click', async () => {
            const bookToDelete = deleteBook[i].parentElement.firstElementChild.textContent
            const bookCol = deleteBook[i].parentElement.parentElement.parentElement.firstElementChild.textContent
            const colName = "users";
            const arrayName = "books";
            const usersCol = collection(dataBase, colName);
            const userRef = doc(dataBase, colName, `${auth.currentUser.uid}`);
            const arrayRef = `${bookCol.replace(/\s/gm, '')}.${arrayName}`;
            const q = query(usersCol, where(arrayRef, "array-contains", `${bookToDelete}`));

            const querySnapshot = await getDocs(q)
            console.log(bookToDelete)
            console.log(bookCol)
            console.log(typeof (bookToDelete))
            console.log(typeof (bookCol))
            console.log(querySnapshot.empty)

            /*.then((querySnapshot) => {
                // Removal of object will not proceed if the querySnapshot is empty.
                if ((querySnapshot.empty)) {
                    console.log("No object found!");
                }
                else {
                    // Proceeds to removal of object.
                    updateDoc(userRef, {
                        [arrayRef]: arrayRemove(`${toString(bookToDelete)}`)
                    })
                        .then(() => {
                            // Check again if the object was deleted successfully.
                            const querySnapshot = getDocs(q)
                                .then((querySnapshot) => {
                                    if ((querySnapshot.empty)) {
                                        console.log("Book Deleted!");
                                    }
                                    else {
                                        console.log("Failed!");
                                    }
                                })
                        });
                }
            })
            // Catch if there are any Firebase errors.
            .catch(error => console.log('Failed!', error));*/
        })
    }
}