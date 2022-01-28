const {cons} = require('./app/firebase.js');
console.log('from bindel.js');
console.log('from compiled with live reloding devserver');
console.log(cons)
const themeSwitch = document.getElementById('darkThemeToggle');
const root = document.querySelector(':root');
let LightTheme = localStorage.getItem("LightTheme")
const enableLightTheme = () => {
    document.body.classList.add("LightTheme");
    localStorage.setItem('LightTheme', 'enabled');
}
const disableLightTheme = () => {
    document.body.classList.remove("LightTheme");
    localStorage.setItem('LightTheme', null);
}

if (LightTheme === "enabled") {
    enableLightTheme();
    themeSwitch.innerHTML = "<ion-icon name='moon-outline'></ion-icon>"
} else {
    themeSwitch.innerHTML = "<ion-icon name='sunny-outline'></ion-icon>"
}

themeSwitch.addEventListener('click', () => {
    LightTheme = localStorage.getItem("LightTheme");
    if (LightTheme !== 'enabled') {
        enableLightTheme();
        themeSwitch.innerHTML = "<ion-icon name='moon-outline'></ion-icon>"
    } else if (LightTheme !== null) {
        disableLightTheme();
        themeSwitch.innerHTML = "<ion-icon name='sunny-outline'></ion-icon>"
    }
})


const signUpBtn = document.getElementById('signUp');
const logInBtn = document.getElementById('logIn');
const signUpSwitchBtn = document.getElementById('form-swich-signup');
const logInSwitchBtn = document.getElementById('form-swich-login');
const signUpForm = document.getElementById('si-form-section');
const logInForm = document.getElementById('lo-form-section');
const closeBtn = document.getElementsByClassName('form__close');


if (signUpBtn) {
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
    signUpSwitchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signUpForm.classList.remove('show-form');
        signUpForm.classList.add('hide-form');
        logInForm.classList.remove('hide-form');
        logInForm.classList.add('show-form');
    })
    logInSwitchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logInForm.classList.add('hide-form');
        logInForm.classList.remove('show-form');
        signUpForm.classList.add('show-form');
        signUpForm.classList.remove('hide-form');
    })
}

//make dark theme the default on page load so it doesn't flash 

/// which book was clicked
// 1. loop over the books and atach click event listeners
// 2. get Id of book 
// 3. send a post request to the rout

//const books = document.querySelectorAll('.shelv');

/*if (books) {
    for (let i = 0; i < books.length; i++) {
        books[i].addEventListener('click', function(){
             
        })
        
    }
}*/