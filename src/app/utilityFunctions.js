const axios = require('axios');
const {getDoc, doc, setDoc} = require('firebase/firestore')
const apiToken = "AIzaSyDxuuNaDqsEUc9wp4Wr4lk5BEVJB6Z5Wc8";

function wait(searchTerm = "One Hundred Years of Solitude", lang = "en") {
    let data = axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiToken}&langRestrict=${lang}&maxResults=40&printType=books`)
    return data
}
function getBookById(bookId) {
    let data = axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    return data
}

function alertUser(alert, text, icon) {
    alert.firstElementChild.innerHTML = icon;
    alert.lastElementChild.innerHTML = text;
    alert.classList.add('show-alert');
    setTimeout(() => {
        alert.classList.remove('show-alert');
    }, 1600)
}

function hideColForm(formContainer) {
    formContainer.classList.remove('showColForm')
    formContainer.classList.add('hideColForm')
}
function showColForm(formContainer) {
    formContainer.classList.remove('hideColForm')
    formContainer.classList.add('showColForm')
}
async function getDocSnap(dataBase, user, postRout, redirect) {
    const docRef = doc(dataBase, 'users', `${user.uid}`)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        userData = docSnap.data();
        active = [user, userData]
        let users = await axios.post(postRout, active).then(() => {
            // redirect to Profile page
            if(redirect != null){
                window.location.href = redirect
            }
        })
    }
}
async function creatUserDatabase(dataBase, user, fName, lName){
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
    })
}
module.exports = { wait, getBookById, alertUser, hideColForm, showColForm, getDocSnap, creatUserDatabase };