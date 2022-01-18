//import e from "express";
import { cons } from "./app/firebase";
//import { button } from "./app/getbooks" 
console.log('from bindel.js');
console.log('from compiled with live reloding devserver');

const themeSwitch = document.getElementById('darkThemeToggle');
const root = document.querySelector(':root');
let darkTheme = localStorage.getItem("darkTheme")
const enableDarkTheme = () => {
    document.body.classList.add("darkTheme");
    localStorage.setItem('darkTheme', 'enabled');
}
const disableDarkTheme = () => {
    document.body.classList.remove("darkTheme");
    localStorage.setItem('darkTheme', null);
}

if (darkTheme === "enabled") {
    enableDarkTheme();
    themeSwitch.innerHTML = "<ion-icon name='sunny-outline'></ion-icon>"
} else {
    themeSwitch.innerHTML = "<ion-icon name='moon-outline'></ion-icon>"
}

themeSwitch.addEventListener('click', () => {
    darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme !== 'enabled') {
        enableDarkTheme();
        themeSwitch.innerHTML = "<ion-icon name='sunny-outline'></ion-icon>"
    } else if (darkTheme !== null) {
        disableDarkTheme();
        themeSwitch.innerHTML = "<ion-icon name='moon-outline'></ion-icon>"
    }
})


const signUpBtn = document.getElementById('signUp');
const logInBtn = document.getElementById('logIn');
const signUpForm = document.getElementById('si-form-section');
const logInForm = document.getElementById('lo-form-section');
const closeBtn = document.getElementsByClassName('form__close');

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpForm.classList.remove('hide-form');
    signUpForm.classList.add('show-form');
})

logInBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logInForm.classList.remove('hide-form');
    logInForm.classList.add('show-form');
})

for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', () => {
        logInForm.classList.remove('show-form');
        logInForm.classList.add('hide-form');
        signUpForm.classList.remove('show-form');
        signUpForm.classList.add('hide-form');
    })
}